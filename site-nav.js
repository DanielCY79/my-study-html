/**
 * 笔记页顶栏的「切换笔记」。
 * 只有 pages.js 里登记了两篇及以上时才会出现；单独一篇时顶栏只保留「首页」。
 * 需要页面里已有 <nav id="study-nav">。
 */
(function () {
  "use strict";

  var nav = document.getElementById("study-nav");
  if (!nav || nav.querySelector(".page-switch") || typeof window.studyPages !== "function") return;

  var pages;
  try {
    pages = window.studyPages();
  } catch (error) {
    return;
  }
  if (!Array.isArray(pages) || pages.length < 2) return;

  function samePage(href) {
    try {
      return new URL(href, window.location.href).pathname === window.location.pathname;
    } catch (error) {
      return false;
    }
  }

  if (!document.getElementById("study-nav-style")) {
    var style = document.createElement("style");
    style.id = "study-nav-style";
    style.textContent = [
      ".page-switch{position:relative}",
      ".page-switch>summary{list-style:none;cursor:pointer}",
      ".page-switch>summary::-webkit-details-marker{display:none}",
      ".page-switch ul{position:absolute;z-index:30;right:0;top:calc(100% + 6px);min-width:min(17rem,72vw);margin:0;padding:6px;list-style:none;",
      "background:var(--sheet,#fff9f1);color:var(--ink,#342820);border:1px solid var(--border,#dacabc);border-radius:10px;",
      "box-shadow:var(--shadow,0 5px 18px #64432b0b)}",
      ".page-switch a{display:block;padding:8px 10px;border-radius:7px;color:inherit;text-decoration:none;font-size:.875rem;line-height:1.35}",
      ".page-switch a:hover{background:var(--quiet,#efe4d7);color:var(--accent,#983e2b)}",
      ".page-switch a[aria-current=page]{background:var(--tint,#f3ded3);color:var(--accent,#983e2b);font-weight:700}"
    ].join("");
    document.head.appendChild(style);
  }

  var details = document.createElement("details");
  details.className = "page-switch";
  var summary = document.createElement("summary");
  summary.className = "control";
  summary.textContent = "切换笔记";
  details.appendChild(summary);

  var list = document.createElement("ul");
  pages.forEach(function (page) {
    var item = document.createElement("li");
    var link = document.createElement("a");
    link.href = page.href;
    link.textContent = page.title;
    if (samePage(page.href)) link.setAttribute("aria-current", "page");
    item.appendChild(link);
    list.appendChild(item);
  });
  details.appendChild(list);

  var themeButton = document.getElementById("theme");
  if (themeButton && themeButton.parentNode === nav) nav.insertBefore(details, themeButton);
  else nav.appendChild(details);
})();
