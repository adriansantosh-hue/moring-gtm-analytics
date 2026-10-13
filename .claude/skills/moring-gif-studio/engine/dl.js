// Download official logo/icon files from each company's own live site. Images only; SVGs are rejected if they contain scripts / event handlers / foreignObject.
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const dir = path.join(__dirname, "live"); fs.mkdirSync(dir, { recursive: true });
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";
const cand = {
  okta: ["https://www.okta.com/content/dam/okta---digital/en_us/images/header/logos/okta.svg"],
  opa: ["https://www.openpolicyagent.org/img/nav/logo.png"],
  splunk: ["https://www.splunk.com/content/dam/splunk-logo-dark.svg", "https://www.splunk.com/content/dam/splunk2/images/icons/favicons/apple-touch-icon-144x144.png"],
  salesforce: ["https://a.sfdcstatic.com/shared/images/c360-nav/salesforce-no-type-logo.svg"],
  servicenow: ["https://www.servicenow.com/content/dam/servicenow-assets/images/naas/servicenow-logo-icon.svg", "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/images/apple-touch-icon/180x180.png"],
  snowflake: ["https://www.snowflake.com/etc.clientlibs/snowflake-site/clientlibs/clientlib-react/resources/apple-touch-icon.png?v=3"],
  workday: ["https://www.workday.com/favicon.ico", "https://www.workday.com/apple-touch-icon.png", "https://www.workday.com/etc.clientlibs/workday/clientlibs/clientlib-site/resources/images/favicon.ico"],
  guidewire: ["https://www.guidewire.com/favicon/apple-touch-icon.png"],
  aws: ["https://a0.awsstatic.com/libra-css/images/site/touch-icon-ipad-144-smile.png"],
  azure: ["https://azure.microsoft.com/favicon.ico?v2"],
  gcp: ["https://www.gstatic.com/cgc/super_cloud_gradient.png", "https://www.gstatic.com/cgc/supercloud_favicon.ico"],
  github: ["https://github.githubassets.com/favicons/favicon.svg"],
  databricks: ["https://www.databricks.com/favicon.ico", "https://www.databricks.com/apple-touch-icon.png"],
  anthropic: ["https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/67d31dd7aa394792257596c5_webclip.png"],
  openai: ["https://openai.com/favicon.ico", "https://openai.com/apple-touch-icon.png", "https://cdn.openai.com/API/logo-assets/openai-logomark.png"],
  sap: ["https://www.sap.com/dam/application/shared/logos/sap-logo-svg.svg"],
  datadog: ["https://corp.dd-static.net/img/dd_logo_n_70x75.png"],
  microsoft: ["https://www.microsoft.com/favicon.ico?v2"],
  mcp: ["https://modelcontextprotocol.io/mintlify-assets/_mintlify/favicons/mcp/ebiVJzri-bsiCfVZ/_generated/favicon/apple-touch-icon.png"],
};
(async () => {
  const report = {};
  for (const [k, urls] of Object.entries(cand)) {
    for (const u of urls) {
      try {
        const r = await fetch(u, { headers: { "user-agent": UA, accept: "image/*,*/*" }, redirect: "follow", signal: AbortSignal.timeout(20000) });
        if (!r.ok) { console.log(k, r.status, u); continue; }
        const buf = Buffer.from(await r.arrayBuffer());
        const head = buf.slice(0, 16).toString("latin1");
        let ext = null, bytes = buf;
        if (head.startsWith("\x89PNG")) ext = "png";
        else if (buf.slice(0, 4).toString("hex") === "00000100") ext = "ico";
        else if (/^\s*(<\?xml|<svg)/i.test(buf.slice(0, 200).toString("utf8"))) {
          const t = buf.toString("utf8");
          if (/<script|\son[a-z]+\s*=|foreignObject|javascript:/i.test(t)) { console.log(k, "REJECT svg (unsafe markup)", u); continue; }
          ext = "svg";
        } else if (head.startsWith("\xff\xd8")) ext = "jpg";
        if (!ext) { console.log(k, "not an image", u, head.replace(/[^\x20-\x7e]/g, "?")); continue; }
        let file = path.join(dir, k + "." + ext);
        fs.writeFileSync(file, bytes);
        if (ext === "ico") { const png = path.join(dir, k + ".png"); execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", file, "-frames:v", "1", png]); file = png; ext = "png"; }
        report[k] = { src: u, file: path.basename(file), bytes: buf.length };
        console.log(k, "OK", ext, buf.length, u);
        break;
      } catch (e) { console.log(k, "ERR", e.message, u); }
    }
    if (!report[k]) console.log(k, "-- no logo found");
  }
  fs.writeFileSync(path.join(dir, "sources.json"), JSON.stringify(report, null, 1));
})();
