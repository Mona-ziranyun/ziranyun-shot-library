// 目录卡 · 编号胶囊依次点亮（镜头库 SH-016）· 独立组件：只依赖 react + remotion
// 用法：<TocList items={[{text: '说成指责', at: 1.6}, {text: '担心不同', at: 2.2}, {text: '谁来做', at: 2.8}]} />
// 效果：开场 0.05 秒起几行胶囊依次弹出（半透明，表示还没讲到），口播讲到哪一条，那一条变实、带硬投影并轻轻跳一下
// 画布 1920×1080；放在主画框（1440×810）里时传 width={1440} height={810}
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const INK = '#1F1B18';
const DOTS = ['#EA562D', '#8FD3F4', '#5DB86E', '#FED23F', '#F7B8D3'];

type Item = {text: string; at: number}; // at：这一条点亮的秒数，对齐口播
type Props = {
  items: Item[];
  width?: number; // 画面宽度，用来居中
  height?: number;
  rowW?: number; // 胶囊宽度
  rowH?: number; // 胶囊高度
  gap?: number; // 行距（中心到中心）
  font?: string;
  numFont?: string; // 编号字体（衬线斜体更好看）
  dim?: number; // 没讲到时的透明度
};

export const TocList: React.FC<Props> = ({
  items,
  width = 1920,
  height = 1080,
  rowW = 660,
  rowH = 104,
  gap = 160,
  font = '"Noto Sans SC", "PingFang SC", sans-serif',
  numFont = '"DM Serif Display", Georgia, serif',
  dim = 0.38,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const top0 = height / 2 - ((items.length - 1) * gap) / 2;
  return (
    <AbsoluteFill>
      {items.map((it, i) => {
        const n = i + 1;
        const on = t >= it.at;
        const p = spring({frame: frame - (0.05 + n * 0.08) * fps, fps, config: {damping: 13, stiffness: 160, mass: 0.7}});
        const bump = on ? 1 + 0.06 * Math.max(0, 1 - (t - it.at) / 0.3) : 1;
        return (
          <div
            key={i}
            style={{
              position: 'absolute', left: width / 2 - rowW / 2, top: top0 + i * gap - rowH / 2, width: rowW, height: rowH,
              display: 'flex', alignItems: 'center', gap: 28, background: '#fff', border: `3px solid ${INK}`, borderRadius: rowH / 2,
              transform: `scale(${p * bump})`, boxShadow: on ? `5px 6px 0 ${INK}` : 'none', opacity: on ? 1 : dim,
            }}
          >
            <div style={{marginLeft: 14, width: rowH * 0.73, height: rowH * 0.73, borderRadius: '50%', background: DOTS[i % DOTS.length], border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: numFont, fontStyle: 'italic', fontSize: rowH * 0.46, color: '#fff'}}>{n}</div>
            <div style={{fontFamily: font, fontWeight: 900, fontSize: rowH * 0.48, color: INK, letterSpacing: 4}}>{it.text}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
