const ENTITY_MAP: { [key: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
  "`": "&#x60;",
  "=": "&#x3D;",
};

function escapeHtml(string: string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return ENTITY_MAP[s];
  });
}

export default escapeHtml;
