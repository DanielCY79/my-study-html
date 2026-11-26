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
    },
    {
      href: "t3code-orca.html",
      title: "T3 Code 与 Orca：协作为什么难",
      description: "同时拉起多个 Coding Agent 并不难。难的是让它们顺畅地委派任务、互相通信、交接上下文，并在出错后可靠恢复。",
      eyebrow: "源码对照图解 · 1/4"
    },
    {
      href: "t3code-orchestration.html",
      title: "T3 Code：MCP 委派，加上事件驱动",
      description: "T3 Code 偏向统一运行协议与状态管理。核心是三件事：把协作包成工具调用、用事件把状态留下、把应用会话和原生会话分开交接。",
      eyebrow: "源码对照图解 · 2/4"
    },
    {
      href: "orca-orchestration.html",
      title: "Orca：CLI 协议，加上收件箱",
      description: "Orca 把重心放在任务调度和 Agent 之间的通信：用一套 CLI 让 Agent 自己发起调度，用 Mailbox 传递结构化消息，再用 Task 和 Dispatch 的分离挡住过期完成信号。",
      eyebrow: "源码对照图解 · 3/4"
    },
    {
      href: "t3code-orca-compare.html",
      title: "T3 Code 与 Orca：差异、趋同与操作系统",
      description: "T3 Code 侧重统一运行协议、会话管理、上下文交接和事件流。Orca 侧重任务依赖、派工隔离、结构化通信和 Worker 生命周期。两边的能力也在互相靠拢。",
      eyebrow: "源码对照图解 · 4/4"
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
