# 模型学习手账

静态学习笔记，用浏览器打开 `index.html` 即可。站点由 nginx 这类静态服务器直接托管，不需要构建，也没有后端。

首页是笔记目录。点一篇进入对应的 HTML，页顶的「首页」回到目录。

## 现有笔记

- [Transformer 拆解手账](transformer.html)：用九章互动实验拆开 Transformer，从分词一路算到下一个 token。
- [T3 Code 与 Orca：底层有何不同](t3-orca-diff.html)：T3 Code 和 Orca 都在编码 Agent 之上加了一层编排层，目标相同，路线不同。T3 Code 走 MCP 委派、事件流和会话交接；Orca 走 CLI、收件箱和任务派工。两者都用 Git Worktree 隔离并行任务。这一页是自带导航的 Archify 图解，两张图和一张对照表在同一页。旧地址 `t3code-orca.html`、`t3code-orchestration.html`、`orca-orchestration.html`、`t3code-orca-compare.html` 会跳到这一页。

## 新增一篇笔记

1. 把新的 `.html` 放在与 `index.html` 同一目录。
2. 打开 `pages.js`，在 `STUDY_PAGES` 末尾追加一项。字段说明写在该文件顶部。只登记已经写好的页面。
3. 在新页面放回首页的入口，方便读者返回目录。复制 `transformer.html` 顶栏这段即可：

```html
<nav class="masthead__tools" id="study-nav" aria-label="笔记切换">
  <a class="control" href="index.html">首页</a>
</nav>
```

并在页面底部引入：

```html
<script src="pages.js"></script>
<script src="site-nav.js"></script>
```

`site-nav.js` 只在目录里有两篇及以上时，才往这个导航里加上「切换笔记」。一篇的时候不会多出空菜单。

改完 `pages.js` 后刷新首页就能看到新条目，不用改 `index.html` 的版式。
