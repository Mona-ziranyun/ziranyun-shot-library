# 自然云镜头库

「自然云聊健康」视频的镜头与动效库。

- **网页预览**：`index.html`，可以按框架、颜色、风格、B-roll 类型筛选，每个镜头都附预览视频、组件名和用法。
- **预览视频**：`clips/`
- **Remotion 组件**：`remotion/`

## 使用组件

```bash
cd remotion
npm install
npm run studio
```

打开 Remotion Studio 后，左侧列表里每个镜头一个预览。

| 编号 | 组件 | 文件 |
|---|---|---|
| SH-013 | 头像结尾卡 | `src/library/AvatarOutro.tsx` |
| SH-014 | 小图标纹样背景 | `src/library/DriftPattern.tsx` |
| SH-015 | 食物装盒放进冰箱 | `src/library/StoreInFridge.tsx` |
| SH-016 | 目录卡 · 编号胶囊依次点亮 | `src/library/TocList.tsx` |
| SH-017 | 要点卡依次点亮 | `src/library/SummaryCards.tsx` |

- `src/library/` 里的组件都是独立的，只依赖 react 和 remotion，复制单个文件就能用。每个文件开头写了用法。
- `src/brand/` 是自然云的品牌参数和通用组件，包括配色、字体、主画框、封面模板、结尾卡。
- `public/brand/`：纸纹背景、小云头像。头像是自然云本人的形象，请勿用在其他账号上。
- `public/fonts/`：思源黑体、思源宋体（Noto Sans/Serif SC）、DM Serif Display，都是 SIL Open Font License 授权，可以免费使用和再分发。

画布 1920×1080，30 帧。
