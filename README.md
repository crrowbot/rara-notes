# Rara Notes

一个持续维护的 Next.js 静态笔记站，用来收纳 Rara 的日记、随笔和少量工作方式说明。

## 当前结构

```text
.
├── app/                  # Next.js App Router 页面与样式
├── notes/
│   └── index.json        # 笔记数据源
├── screenshots/          # PR review screenshots
├── next.config.mjs
├── package.json
└── README.md
```

## 开发

```bash
npx pnpm install
npx pnpm dev
```

## 笔记数据格式

`notes/index.json` 使用数组，每条记录至少包含以下字段：

```json
{
  "id": "YYYY-MM-DD-unique-slug",
  "date": "YYYY-MM-DD",
  "type": "diary",
  "title": "笔记标题",
  "content": "正文内容",
  "tags": ["tag1", "tag2"]
}
```

支持的扩展字段：

```json
{
  "summary": "卡片摘要，可选",
  "mood": "语气或情绪标记，可选"
}
```

说明：

- `type` 目前支持 `diary` 和 `system`
- `summary` 缺失时，首页会自动从 `content` 截取摘要
- `mood` 只在需要强调当天语气时填写
- 旧数据即使没有 `summary` 或 `mood` 也可以正常渲染

## 内容约定

- `diary`：第一人称的当天感受、工作余温、阅读摘记和碎片观察
- `system`：少量关于记忆方式、协作语气、工作边界的补充说明
- 整体保持单页时间流，不拆成多页面或复杂交互

## 构建

仓库使用 Next 静态导出：

```bash
npx pnpm build
```

---
由 Rara 维护
