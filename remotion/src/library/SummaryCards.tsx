// 要点卡依次点亮（镜头库 SH-017）· 独立组件：只依赖 react + remotion
// 用法：
//   <SummaryCards cards={[
//     {icon: <BookIcon />, label: '建议合适', color: '#A8E0B8', at: 2.0},
//     {icon: <SpoonIcon />, label: '想改什么', color: '#FBEA7E', at: 3.8},
//   ]} />
// 效果：0.2 秒整组卡片弹出，开场是灰色、半透明（还没讲到）；口播讲到哪一条，那张卡换上颜色、带硬投影、轻轻跳一下，下面弹出标签
// 画布 1920×1080；放在主画框（1440×810）里时传 width={1440} height={810}
import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const INK = '#1F1B18';

type Card = {icon: React.ReactNode; label: string; color: string; at: number}; // at：点亮的秒数，对齐口播
type Props = {
  cards: Card[];
  width?: number;
  height?: number;
  cardW?: number;
  cardH?: number;
  step?: number; // 卡片中心间距
  font?: string;
};

export const SummaryCards: React.FC<Props> = ({cards, width = 1920, height = 1080, cardW = 260, cardH = 300, step = 300, font = '"Noto Sans SC", "PingFang SC", sans-serif'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const pop = (d: number, damping = 14) => spring({frame: frame - d * fps, fps, config: {damping, stiffness: 160, mass: 0.7}});
  const group = pop(0.2);
  const cy = height / 2 - 25;
  const x0 = width / 2 - ((cards.length - 1) * step) / 2;
  return (
    <AbsoluteFill style={{transform: `scale(${group})`}}>
      {cards.map((c, i) => {
        const x = x0 + i * step;
        const on = t >= c.at;
        const bump = on ? 1 + 0.08 * Math.max(0, 1 - (t - c.at) / 0.35) : 1;
        const lp = pop(c.at + 0.1, 12);
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute', left: x - cardW / 2, top: cy - cardH / 2, width: cardW, height: cardH, borderRadius: 30,
                background: on ? c.color : '#F1ECE2', border: `3px solid ${INK}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: `scale(${bump})`, filter: on ? undefined : 'grayscale(0.9) opacity(0.55)', boxShadow: on ? `5px 6px 0 ${INK}` : 'none',
              }}
            >
              {c.icon}
            </div>
            {on && (
              <div
                style={{
                  position: 'absolute', left: x, top: cy + cardH / 2 + 60, transform: `translate(-50%,-50%) scale(${lp}) rotate(-2deg)`,
                  background: '#fff', border: `2.5px solid ${INK}`, borderRadius: 16, padding: '12px 20px', fontFamily: font, fontWeight: 700, fontSize: 30, color: INK, whiteSpace: 'nowrap',
                }}
              >
                {c.label}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </AbsoluteFill>
  );
};
