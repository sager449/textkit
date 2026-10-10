/* ============================================
   TextKit — Tools Logic
   All text manipulation functions
   ============================================ */

/* ===== Helpers ===== */
function getInput() {
  const el = document.getElementById("input");
  return el ? el.value : "";
}

function setOutput(text) {
  const el = document.getElementById("input");
  if (el) el.value = text;
}

function copyOutput() {
  const el = document.getElementById("input");
  if (!el) return;
  el.select();
  document.execCommand("copy");
  const fb = document.getElementById("copy-feedback");
  if (fb) {
    fb.classList.add("show");
    setTimeout(() => fb.classList.remove("show"), 1500);
  }
}

function clearAll() {
  const el = document.getElementById("input");
  if (el) el.value = "";
  updateStats();
}

/* ===== Stats ===== */
function updateStats() {
  const text = getInput();
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const lines = text ? text.split("\n").length : 0;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  set("stat-words", words);
  set("stat-chars", chars);
  set("stat-chars-ns", charsNoSpaces);
  set("stat-lines", lines);
}

/* ===== Tool Functions ===== */

// 1. Remove extra spaces
function removeSpaces() {
  const text = getInput();
  setOutput(text.replace(/[ \t]+/g, " ").trim());
  updateStats();
}

// 2. Remove line breaks
function removeLineBreaks() {
  const text = getInput();
  setOutput(text.replace(/\n+/g, " ").replace(/[ \t]+/g, " ").trim());
  updateStats();
}

// 3. Case converter
function convertCase(type) {
  const text = getInput();
  let result = text;
  switch (type) {
    case "upper": result = text.toUpperCase(); break;
    case "lower": result = text.toLowerCase(); break;
    case "title":
      result = text.replace(/\w\S*/g, (w) =>
        w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()
      );
      break;
    case "sentence":
      result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) =>
        c.toUpperCase()
      );
      break;
  }
  setOutput(result);
  updateStats();
}

// 4. Remove Arabic diacritics
function removeDiacritics() {
  const text = getInput();
  setOutput(text.replace(/[\u064B-\u065F\u0670\u06D6-\u06ED]/g, ""));
  updateStats();
}

// 5. Remove punctuation
function removePunctuation() {
  const text = getInput();
  setOutput(text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'\[\]<>?،؛؟«»]/g, ""));
  updateStats();
}

// 6. Reverse text
function reverseText() {
  const text = getInput();
  setOutput(text.split("").reverse().join(""));
  updateStats();
}

// 7. Remove duplicate lines
function removeDuplicates() {
  const text = getInput();
  const lines = text.split("\n");
  const unique = [...new Set(lines)];
  setOutput(unique.join("\n"));
  updateStats();
}

// 8. Sort lines
function sortLines(dir) {
  const text = getInput();
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  lines.sort((a, b) => a.localeCompare(b, "ar"));
  if (dir === "desc") lines.reverse();
  setOutput(lines.join("\n"));
  updateStats();
}

// 9. Text to slug
function textToSlug() {
  const text = getInput();
  const slug = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  setOutput(slug);
  updateStats();
}

/* ===== Init ===== */
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("input");
  if (input) {
    input.addEventListener("input", updateStats);
    updateStats();
  }
});
