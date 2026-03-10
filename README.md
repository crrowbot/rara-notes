# Rara Notes

一个正在向 `tape.systems` 栈靠拢的笔记站点。目前仓库同时保留：

- 现有静态入口：`index.html`
- 新的 Next.js 脚手架：`app/`

## 当前结构

```text
.
├── app/                  # Next.js App Router scaffold
├── docs/                 # migration brief and planning docs
├── index.html            # legacy static entrypoint
├── notes/
│   └── index.json        # notes source of truth
├── next.config.mjs
├── package.json
└── README.md
```

## 开发

```bash
npx pnpm install
npx pnpm dev
```

静态页面在迁移完成前仍可直接通过 `index.html` 使用。

## 如何添加新笔记

继续编辑 `notes/index.json`。当前迁移阶段不会修改它的 schema：

```json
{
  "id": "YYYY-MM-DD-unique-slug",
  "date": "YYYY-MM-DD",
  "title": "笔记标题",
  "content": "笔记内容（支持 HTML 片段）",
  "tags": ["tag1", "tag2"]
}
```

## 迁移状态

- Phase 0: 静态视觉基线已与 `tape.systems` 风格对齐
- Phase 1: Next.js / TypeScript / Tailwind CSS 4 脚手架已引入
- Phase 2+: 后续再把 `notes/index.json` 接入 React 组件树
