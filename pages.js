/**
 * 学习笔记目录。新增一篇 HTML 时，只改这个文件里的 STUDY_PAGES。
 *
 * 步骤：
 * 1. 把新的 .html 放在与 index.html 同一目录（站点根目录）。
 * 2. 在下面的数组末尾追加一项。只登记已经写好的真实页面，不要写占位条目。
 * 3. 在新页面放一个回到首页的链接，这样读者能返回目录。
 *    可复制 transformer.html 顶栏里 id="study-nav" 的那段 nav，
 *    并在页面底部引入 pages.js 与 site-nav.js。
 *    笔记多于一篇时，site-nav.js 会在这个 nav 里自动加上「切换笔记」。
 *
 * 字段：
 * - href        相对路径，例如 "transformer.html"。不要写 http(s) 外链，也不要以 / 开头。
 * - title       卡片标题，与页面 <title> 保持一致。
 * - description 一两句简介，建议与页面的 meta description 一致。
 * - eyebrow     可选。卡片上的短标签，例如页面里的眉题。
 *
 * index.html 用 studyPages() 渲染目录；各笔记页的「切换笔记」也读同一份清单。
 */
(function (global) {
  "use strict";

  global.STUDY_PAGES = [
    {
      href: "transformer.html",
      title: "Transformer 拆解手账",
      description: "用九章互动实验拆开 Transformer，从分词一路算到下一个 token。",
      eyebrow: "交互式学习手账"
    }
  ];

  function normalizeHref(href) {
    var parts = [];
    String(href).trim().split("#")[0].split("?")[0].split("/").forEach(function (part) {
      if (!part || part === ".") return;
      if (part === "..") {
        parts.pop();
        return;
      }
      parts.push(part);
    });
    return parts.join("/");
  }

  global.studyPages = function () {
    var source = Array.isArray(global.STUDY_PAGES) ? global.STUDY_PAGES : [];
    var seen = Object.create(null);
    var pages = [];
    source.forEach(function (page) {
      if (!page || typeof page.href !== "string") return;
      var raw = page.href.trim();
      if (!raw || raw.charAt(0) === "/" || /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(raw)) return;
      var href = normalizeHref(raw);
      if (!href || seen[href] || !/\.html?$/i.test(href)) return;
      if (href === "index.html" || href.endsWith("/index.html")) return;
      seen[href] = true;
      var title = String(page.title || "").trim();
      pages.push({
        href: href,
        title: title || href,
        description: String(page.description || "").trim(),
        eyebrow: String(page.eyebrow || "").trim()
      });
    });
    return pages;
  };
})(window);
