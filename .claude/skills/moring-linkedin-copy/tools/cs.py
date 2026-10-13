"""ConnectSafely (LinkedIn) client used for Moring posting and engagement.

Key: user env var CONNECTSAFELY_API_KEY (read from the Windows registry if the shell
started before it was set). Never write the key into a file.

CLI:   python -I cs.py <tool> '<json args>'          # prints the tool result text
       python -I cs.py upload-gif <file> <accountId> [companyUrn]   # prints assetUrn
       python -I cs.py upload-video <file> <accountId> [companyUrn] # prints assetUrn + recipes
Lib:   exec this file or import it, then use call(), safe(), upload_image(), upload_video().

Every write here is public. A person approves each post, comment, reply, like batch,
repost and connection request before it runs (AGENTS.md). Never enable `boost`.
"""
import json, os, sys, time, urllib.request

ACCOUNTS = {  # verified 2026-10-13
    "Nikhil": "6ac66144f0b6f95e37728071",    # also posts as the company page via COMPANY
    "Ashvath": "6ac7eded75d0406571b6e6b3",   # default account (get-organizations only checks this one)
    "Ellakkia": "6acc9efa379b1881831d2937",  # shows on LinkedIn as "Ellakkiaa S"
    "Balaji": "6acd264336c4c486288dbf6e",
}
COMPANY = "urn:li:fsd_company:107261887"     # Moring AI page, Nikhil has content-admin


def key():
    k = os.environ.get("CONNECTSAFELY_API_KEY")
    if k:
        return k
    import winreg
    with winreg.OpenKey(winreg.HKEY_CURRENT_USER, "Environment") as h:
        return winreg.QueryValueEx(h, "CONNECTSAFELY_API_KEY")[0]


def call(tool, args, timeout=300):
    """One MCP tools/call over HTTP. Returns the parsed JSON result (or {'raw': text})."""
    body = {"jsonrpc": "2.0", "id": 1, "method": "tools/call", "params": {"name": tool, "arguments": args}}
    req = urllib.request.Request("https://mcp.connectsafely.ai/?apiKey=" + key(), data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json", "Accept": "application/json, text/event-stream"})
    raw = urllib.request.urlopen(req, timeout=timeout).read().decode("utf8")
    data = [l[6:] for l in raw.splitlines() if l.startswith("data: ")]
    d = json.loads(data[-1] if data else raw)
    r = d.get("result", d)
    txt = r["content"][0]["text"] if isinstance(r, dict) and r.get("content") else json.dumps(r)
    try:
        return json.loads(txt)
    except Exception:
        return {"raw": txt}


def safe(tool, args, tries=3, wait=20):
    """Retry on network errors / 502 proxy errors. For WRITE tools, recheck the post before
    retrying (a 502 can still have posted) - see reference/connectsafely-playbook.md."""
    r = {"success": False}
    for i in range(tries):
        try:
            r = call(tool, args)
            if isinstance(r, dict) and (r.get("success") or r.get("comments") is not None or r.get("profile")):
                return r
        except Exception as ex:
            r = {"success": False, "error": str(ex)}
        time.sleep(wait * (i + 1))
    return r


def _put(url, data, headers=None, timeout=300):
    req = urllib.request.Request(url, data=data, method="PUT", headers=headers or {"Content-Type": "application/octet-stream"})
    return urllib.request.urlopen(req, timeout=timeout)


def upload_image(path, account, company=None):
    """GIF/PNG/JPG -> assetUrn (single PUT). Pass company for company-page posts, or the post silently fails."""
    blob = open(path, "rb").read()
    a = {"accountId": account, "mediaType": "image", "fileSize": len(blob), "filename": os.path.basename(path)}
    if company:
        a["companyUrn"] = company
    d = call("upload-init", a)
    _put(d["uploadUrl"], blob)
    return d["assetUrn"]


def upload_video(path, account, company=None):
    """Video -> (assetUrn, recipes). Large files come back MULTIPART (4 MB parts).
    LinkedIn returns no ETag on part PUTs; ConnectSafely's validator needs one, so send the
    part's full response headers with ETag = Location. Then upload-complete must succeed."""
    blob = open(path, "rb").read()
    a = {"accountId": account, "mediaType": "video", "fileSize": len(blob), "filename": os.path.basename(path)}
    if company:
        a["companyUrn"] = company
    d = call("upload-init", a)
    parts = d.get("partUploadRequests")
    if parts:
        resps = []
        for p in parts:
            r = _put(p["uploadUrl"], blob[p["firstByte"]: p["lastByte"] + 1], p.get("headers"))
            h = {k: v for k, v in r.headers.items() if k.lower() != "set-cookie"}
            h["ETag"] = r.headers.get("ETag") or r.headers.get("Location")
            resps.append({"httpStatusCode": r.status, "headers": h})
        done = call("upload-complete", {"accountId": account, "mediaArtifactUrn": d["mediaArtifactUrn"],
                                        "multipartMetadata": d.get("multipartMetadata"), "partUploadResponses": resps})
        if not done.get("success"):
            raise RuntimeError("upload-complete failed: " + json.dumps(done)[:400])
    else:
        _put(d["uploadUrl"], blob)
    return d["assetUrn"], d.get("recipes")


if __name__ == "__main__":
    if sys.argv[1] == "upload-gif":
        print(upload_image(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None))
    elif sys.argv[1] == "upload-video":
        print(json.dumps(upload_video(sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None)))
    else:
        out = call(sys.argv[1], json.loads(sys.argv[2] if len(sys.argv) > 2 else "{}"))
        sys.stdout.reconfigure(encoding="utf-8")
        print(json.dumps(out, ensure_ascii=False, indent=1)[: int(os.environ.get("CS_MAX", "6000"))])
