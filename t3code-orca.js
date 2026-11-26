/**
 * 四页系列共用：主题、交接/过期回报步进，以及页内目录高亮。
 * 旧的 t3code-orca.html#t3 等锚点在总览页头部跳转，不在这里处理。
 */
(function () {
  "use strict";

  var themeButton = document.getElementById("theme");
  function setTheme(night) {
    document.documentElement.dataset.theme = night ? "night" : "day";
    themeButton.setAttribute("aria-pressed", String(night));
    themeButton.setAttribute("aria-label", night ? "切换日间主题" : "切换夜间主题");
    themeButton.textContent = night ? "☀ 日间" : "☾ 夜间";
    try { localStorage.setItem("transformer-notebook-theme", night ? "night" : "day"); } catch (error) {}
  }
  setTheme(document.documentElement.dataset.theme === "night");
  themeButton.addEventListener("click", function () {
    setTheme(document.documentElement.dataset.theme !== "night");
  });

  function bindFocus(root) {
    var buttons = root.querySelectorAll(".stepper button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        root.dataset.focus = button.dataset.focus;
        buttons.forEach(function (item) {
          item.setAttribute("aria-pressed", item === button ? "true" : "false");
        });
      });
    });
  }
  document.querySelectorAll(".handoff, .story").forEach(bindFocus);

  var links = Array.prototype.slice.call(document.querySelectorAll("#toc a"));
  var sections = links.map(function (link) {
    var href = link.getAttribute("href") || "";
    if (href.charAt(0) !== "#") return null;
    return document.querySelector(href);
  }).filter(Boolean);

  function markToc() {
    var line = 96;
    var current = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= line) current = section;
    });
    links.forEach(function (link) {
      if (current && link.getAttribute("href") === "#" + current.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  if (sections.length) {
    markToc();
    document.addEventListener("scroll", markToc, { passive: true });
  }
})();
