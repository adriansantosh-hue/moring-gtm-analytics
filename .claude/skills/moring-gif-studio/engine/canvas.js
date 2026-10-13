const fs = require("fs");
const path = require("path");
const { specs } = require("./specs.js");
const blob = {"T1-P1":"38b1a067ecd07a9dffc3e8deb2070dfa","T1-P2":"beaf43ff1b42f2eac45ab6c86cc1e427","T2-P1":"72414ddbbb02de700d7866824f48a78c","T2-P2":"9f3b037314ac21731d654d794dec7608","T3-P1":"caef13eeb146122f70df214338db436e","T3-P2":"6d5930b133d38da12ee71a64cbeca981","T4-P1":"43195889c24fb64b6d1965701d2e4dbd","T4-P2":"b7482279dcd62a65c935b3283136f6e6","T5-P1":"687cf81a644db0a40dc03d44d0e67bb7","T5-P2":"f62d6609d1ae542dafb1324dc3731345","T6-P1":"f8592fd89babdb373f09365bcf66280f","T6-P2":"a7d190ca8a55c02f724a649a35701273","T6-P3":"74f42e800c4db4e2ad52c34baa00387e","T7":"51498be8dbec8b68ec28407c78cb2541","T8":"13a14e891c4da135799c8c6ffca057a6","T9":"28cf27e62bdf2d869677d9e5bce3cdd1"};
const root = path.join(__dirname, "canvas", "project");
fs.mkdirSync(root, { recursive: true });
const boards = {}, order = [];
specs.forEach((s, i) => {
  const key = s.id.split("_")[0];
  const file = i === 0 ? "Main.dc.html" : key + ".dc.html";
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${key} GIF</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<style>body{margin:0;background:#FFFFFF}</style>
</helmet>
<img src="/_blob/${blob[key]}" alt="${s.alt}" style="display:block;width:1080px;height:1080px">
</x-dc>
<script type="text/x-dc" data-dc-script data-props='{"$preview":{"width":1080,"height":1080}}'>
class Component extends DCLogic {
  renderVals() { return {}; }
}
</script>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, file), html);
  boards[file] = { x: (i % 4) * 1160, y: Math.floor(i / 4) * 1200, w: 1080, h: 1080, title: key + " · " + s.alt.split(" ").slice(0, 7).join(" ") };
  order.push(file);
});
const notes = {
  r1: { x: 0, y: -240, text: "T1 Balaji (VP Eng) · T2 Nikhil (VP Sales)", kind: "title1", maxW: 4600 },
  r2: { x: 0, y: 960, text: "T3 Vignesh (MCP) · T4 Ashvath (cost + architecture)", kind: "title1", maxW: 4600 },
  r3: { x: 0, y: 2160, text: "T5 Ellakkia (audit + approvals) · T6 Arya (SR 26-2, NAIC)", kind: "title1", maxW: 4600 },
  r4: { x: 0, y: 3360, text: "T6-P3 comparison · T7 Ravi (RAG) · T8 Rohit (evals) · T9 Dhananjay (build vs buy)", kind: "title1", maxW: 4600 },
};
fs.writeFileSync(path.join(root, "canvas.json"), JSON.stringify({ v: 3, createdOnFiles: { v: 1, at: "2026-10-01T09:00:00Z" }, title: "Moring GIF Concept", launch: { view: "canvas" }, pages: [], boards, order, notes, designSystems: [] }, null, 1));
console.log(Object.keys(boards).join(" "));
