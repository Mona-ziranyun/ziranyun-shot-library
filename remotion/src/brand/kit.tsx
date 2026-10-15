// 线描漫画风镜头的共用布局组件（从「秋天吃螃蟹」镜头里抽出来，后面每期直接调用）
import React from 'react';
import {AbsoluteFill, Img, Loop, OffthreadVideo, staticFile} from 'remotion';
import {COLORS, ILL} from './tokens';
import {ease, usePop, useSec} from './base';
import {Clip, Photo} from './media';
import {Check, Cross, DriftPattern} from './icons';

export const FW = 1440;
export const FH = 810;

// ---------- 通用布局 ----------
export const Sparkle: React.FC<{x: number; y: number; s: number; c: string; r?: number}> = ({x, y, s, c, r = 0}) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{position: 'absolute', left: x - s / 2, top: y - s / 2, transform: `rotate(${r}deg)`, overflow: 'visible'}}>
    <path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" fill={c} stroke={ILL.line} strokeWidth={4} />
  </svg>
);
export const Burst: React.FC<{x: number; y: number; s: number; c: string; r?: number}> = ({x, y, s, c, r = 0}) => {
  const pts = Array.from({length: 24}, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    const rr = i % 2 ? 30 : 48;
    return `${50 + rr * Math.cos(a)},${50 + rr * Math.sin(a)}`;
  }).join(' ');
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" style={{position: 'absolute', left: x - s / 2, top: y - s / 2, transform: `rotate(${r}deg)`, overflow: 'visible'}}>
      <polygon points={pts} fill={c} stroke={ILL.line} strokeWidth={3} strokeLinejoin="round" />
    </svg>
  );
};
export const Grass: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <svg width={s} height={s * 0.7} viewBox="0 0 100 70" style={{position: 'absolute', left: x - s / 2, top: y - s * 0.35, overflow: 'visible'}}>
    <path d="M10 70 L22 18 L34 70 L46 4 L58 70 L70 24 L82 70 Z" fill={ILL.green} stroke={ILL.line} strokeWidth={4} strokeLinejoin="round" />
  </svg>
);
export const Dot: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <div style={{position: 'absolute', left: x - s / 2, top: y - s / 2, width: s, height: s, borderRadius: '50%', border: `2.5px solid ${ILL.line}`, background: '#fff'}} />
);

// 角落小点缀（2026-10-08 自然云指定）：小云朵、小月亮、小柯基，替换原来的爆炸星和小草
export const Cloud: React.FC<{x: number; y: number; s: number; c?: string; r?: number}> = ({x, y, s, c = '#fff', r = 0}) => (
  <svg width={s} height={s * 0.62} viewBox="0 0 120 74" style={{position: 'absolute', left: x - s / 2, top: y - s * 0.31, transform: `rotate(${r}deg)`, overflow: 'visible'}}>
    <path d="M24 66 C8 66 4 48 18 42 C14 24 36 16 46 26 C52 8 82 8 86 28 C102 22 116 36 106 50 C118 56 112 68 100 66 Z" fill={c} stroke={ILL.line} strokeWidth={3.5} strokeLinejoin="round" />
    <circle cx="48" cy="48" r="3" fill={ILL.line} />
    <circle cx="72" cy="48" r="3" fill={ILL.line} />
    <path d="M56 54 Q60 58 64 54" fill="none" stroke={ILL.line} strokeWidth={2.5} strokeLinecap="round" />
    <circle cx="40" cy="55" r="4" fill={ILL.pink} opacity={0.8} />
    <circle cx="80" cy="55" r="4" fill={ILL.pink} opacity={0.8} />
  </svg>
);

export const MiniMoon: React.FC<{x: number; y: number; s: number; r?: number}> = ({x, y, s, r = 0}) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{position: 'absolute', left: x - s / 2, top: y - s / 2, transform: `rotate(${r}deg)`, overflow: 'visible'}}>
    <path d="M62 10 A42 42 0 1 0 90 66 A34 34 0 1 1 62 10Z" fill={ILL.yellow} stroke={ILL.line} strokeWidth={4} strokeLinejoin="round" />
    <circle cx="44" cy="58" r="3" fill={ILL.line} />
    <path d="M30 66 Q36 70 42 66" fill="none" stroke={ILL.line} strokeWidth={2.5} strokeLinecap="round" />
  </svg>
);

// 小柯基闻爱心（自然云给的 Pinterest 动图，抠掉米黄底后的透明 WebM，4 秒循环）：放在矢量画面右下角
export const CorgiLoop: React.FC<{src?: string; x?: number; y?: number; w?: number}> = ({src = 'chestnut/broll/corgi_heart.webm', x = 1140, y = 600, w = 250}) => (
  <div style={{position: 'absolute', left: x, top: y, width: w, height: (w * 300) / 420}}>
    <Loop durationInFrames={120}>
      <OffthreadVideo src={staticFile(src)} transparent muted style={{width: '100%', height: '100%'}} />
    </Loop>
  </div>
);

// 线描漫画风背景：浅纸底 + 角落点缀（星星 / 爆炸星 / 小圆点 / 小草），随镜头轻微转动
export const VBg: React.FC<{tint?: string; tint2?: string; icon?: (size: number) => React.ReactNode}> = ({tint = ILL.yellow, tint2 = ILL.pink, icon}) => {
  const t = useSec();
  const wob = Math.sin(t * 2) * 6;
  return (
    <AbsoluteFill style={{background: ILL.card}}>
      <Img src={staticFile('brand/paper_cream.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
      <AbsoluteFill style={{background: 'rgba(255,253,248,0.35)'}} />
      <DriftPattern t={t} icon={icon} />
      <Cloud x={100} y={90} s={130} r={wob * 0.5} />
      <Sparkle x={210} y={60} s={46} c={tint2} r={-wob} />
      <Sparkle x={1350} y={110} s={58} c={tint} r={wob} />
      <CorgiLoop />
      <MiniMoon x={90} y={735} s={80} r={wob} />
      <Dot x={1270} y={60} s={18} />
      <Dot x={60} y={420} s={14} />
      <Dot x={1400} y={420} s={16} />
      <Dot x={230} y={770} s={12} />
    </AbsoluteFill>
  );
};

// 以中心点放置并弹出的元素
export const At: React.FC<{x: number; y: number; delay?: number; children: React.ReactNode; rot?: number; s?: number; style?: React.CSSProperties}> = ({
  x,
  y,
  delay = 0,
  children,
  rot = 0,
  s = 1,
  style,
}) => {
  const p = usePop(delay);
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${p * s}) rotate(${rot}deg)`, ...style}}>{children}</div>
  );
};

export const Stamp: React.FC<{x: number; y: number; delay: number; size?: number; ok?: boolean}> = ({x, y, delay, size = 150, ok = false}) => {
  const t = useSec();
  const k = ease(t, delay, delay + 0.18, 1.8, 1);
  const o = t >= delay ? 1 : 0;
  return (
    <div style={{position: 'absolute', left: x, top: y, transform: `translate(-50%,-50%) scale(${k}) rotate(-8deg)`, opacity: o}}>
      {ok ? <Check size={size} /> : <Cross size={size} />}
    </div>
  );
};

export const Arrow: React.FC<{x1: number; y1: number; x2: number; y2: number; p: number; color?: string; dash?: boolean}> = ({x1, y1, x2, y2, p, color = COLORS.ink, dash}) => {
  const x = x1 + (x2 - x1) * p;
  const y = y1 + (y2 - y1) * p;
  const a = Math.atan2(y2 - y1, x2 - x1);
  if (p <= 0.02) return null;
  return (
    <svg width={FW} height={FH} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible'}}>
      <line x1={x1} y1={y1} x2={x} y2={y} stroke={color} strokeWidth={9} strokeLinecap="round" strokeDasharray={dash ? '4 22' : undefined} />
      {p > 0.05 && (
        <polygon
          points={`${x + 26 * Math.cos(a)},${y + 26 * Math.sin(a)} ${x + 20 * Math.cos(a + 2.4)},${y + 20 * Math.sin(a + 2.4)} ${x + 20 * Math.cos(a - 2.4)},${y + 20 * Math.sin(a - 2.4)}`}
          fill={color}
        />
      )}
    </svg>
  );
};

// 圆角照片卡片（用于分屏）
// 取景框角标（参考视频里卡片四角的小方块）
export const Corners: React.FC<{w: number; h: number}> = ({w, h}) => (
  <>
    {[
      [-9, -9],
      [w - 9, -9],
      [-9, h - 9],
      [w - 9, h - 9],
    ].map(([x, y], i) => (
      <div key={i} style={{position: 'absolute', left: x, top: y, width: 18, height: 18, background: '#fff', border: `2.5px solid ${ILL.line}`}} />
    ))}
  </>
);

export const PhotoCard: React.FC<{src: string; x: number; y: number; w: number; h: number; delay?: number; rot?: number; move?: 'in' | 'out' | 'left' | 'right'; pos?: string; filter?: string}> = ({
  src,
  x,
  y,
  w,
  h,
  delay = 0,
  rot = 0,
  move = 'in',
  pos,
  filter,
}) => {
  const p = usePop(delay, 14);
  return (
    <>
    <div
      style={{
        position: 'absolute',
        left: x - w / 2,
        top: y - h / 2,
        width: w,
        height: h,
        borderRadius: 6,
        overflow: 'hidden',
        border: `3.5px solid ${ILL.line}`,
        boxShadow: 'none',
        transform: `scale(${p}) rotate(${rot}deg)`,
      }}
    >
      <Photo src={src} move={move} amt={0.08} pos={pos} filter={filter} />
    </div>
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `scale(${p}) rotate(${rot}deg)`, pointerEvents: 'none'}}>
      <Corners w={w} h={h} />
    </div>
    </>
  );
};

// 圆角视频卡片（多格并排）
export const VideoCard: React.FC<{src: string; from: number; x: number; y: number; w: number; h: number; delay?: number; pos?: string}> = ({src, from, x, y, w, h, delay = 0, pos}) => {
  const p = usePop(delay, 14);
  return (
    <>
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, borderRadius: 6, overflow: 'hidden', border: `3.5px solid ${ILL.line}`, boxShadow: 'none', transform: `scale(${p})`}}>
      <Clip src={src} from={from} move="in" amt={0.05} pos={pos} />
    </div>
    <div style={{position: 'absolute', left: x - w / 2, top: y - h / 2, width: w, height: h, transform: `scale(${p})`, pointerEvents: 'none'}}>
      <Corners w={w} h={h} />
    </div>
    </>
  );
};

