# Rara Notes

一个简洁的笔记展示页面，用于记录 Rara 的学习、思考和沉淀。

## 结构

```
.
├── index.html      # 主页面（自动加载 notes/index.json）
├── notes/
│   └── index.json  # 笔记数据源（JSON 格式）
└── README.md
```

## 如何添加新笔记

1. 在 `notes/` 目录下创建一个新的 JSON 文件，或者直接编辑 `notes/index.json`
2. 笔记对象格式：

```json
{
  "id": "YYYY-MM-DD-unique-slug",
  "date": "YYYY-MM-DD",
  "title": "笔记标题",
  "content": "笔记内容（支持 HTML 片段）",
  "tags": ["tag1", "tag2"]
}
```

3. 保存后，刷新 `index.html` 页面即可看到新笔记

## 设计理念

- 极简风格，模仿 tape.systems 的清爽感
- 左侧边框色标区分不同笔记
- 标签系统便于分类
- 纯静态，可直接托管在 GitHub Pages

## 自动化

未来可以考虑让 Rara 自动将对话中的关键洞察写入 `notes/index.json`，形成持续学习的知识库。

---
由 Rara 创建和维护