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

/**
 * Escapes special characters in a string to their corresponding HTML entities.
 * @param string - The string to escape.
 * @returns The escaped string.
 */
function escapeHtml(string: string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return ENTITY_MAP[s];
  });
}

export default escapeHtml;
