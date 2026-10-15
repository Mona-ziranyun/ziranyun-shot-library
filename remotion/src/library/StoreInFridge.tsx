// 食物装盒放进冰箱（镜头库 SH-015）· 独立组件：只依赖 react + remotion
// 用法：<StoreInFridge food={<img src={staticFile('food.png')} style={{width: 200}} />} />，建议时长 4 秒
// 节奏：0.2s 食物掉进保鲜盒 → 0.9s 盖盖 → 1.1s 冰箱开门 → 1.7s 盒子飞进冰箱 → 3.0s 关门 → 3.5s 雪花
import React from 'react';
import {AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const LINE = '#1F1B18';

const Box: React.FC<{lid: number}> = ({lid}) => (
  <svg width={380} height={380} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
    <path d="M30 90 L170 90 L162 176 Q160 186 150 186 L50 186 Q40 186 38 176 Z" fill="rgba(220,240,248,0.45)" stroke={LINE} strokeWidth={3.2} strokeLinejoin="round" />
    <g transform={`translate(0 ${-lid * 40}) rotate(${-lid * 12} 30 80)`}>
      <rect x="22" y="70" width="156" height="24" rx="8" fill="#5DB86E" stroke={LINE} strokeWidth={3.2} />
    </g>
  </svg>
);

const Fridge: React.FC<{open: number; stored: boolean}> = ({open, stored}) => (
  <svg width={600} height={600} viewBox="0 0 200 200" style={{overflow: 'visible'}}>
    <rect x="46" y="14" width="108" height="176" rx="14" fill="#F4F8FA" stroke={LINE} strokeWidth={3.2} />
    <rect x="54" y="72" width="92" height="110" rx="6" fill="#DDEFF7" />
    <line x1="54" y1="112" x2="146" y2="112" stroke="#9CCBE0" strokeWidth={4} />
    <line x1="54" y1="148" x2="146" y2="148" stroke="#9CCBE0" strokeWidth={4} />
    <rect x="62" y="86" width="36" height="24" rx="5" fill="#F2735A" stroke={LINE} strokeWidth={3} />
    <rect x="104" y="122" width="34" height="24" rx="5" fill="#5DB86E" stroke={LINE} strokeWidth={3} />
    {stored && (
      <g>
        <rect x="60" y="124" width="40" height="22" rx="4" fill="rgba(220,240,248,0.6)" stroke={LINE} strokeWidth={3} />
        <rect x="58" y="119" width="44" height="7" rx="3" fill="#5DB86E" stroke={LINE} strokeWidth={2.5} />
      </g>
    )}
    <rect x="46" y="14" width="108" height="52" rx="14" fill="#F4F8FA" stroke={LINE} strokeWidth={3.2} />
    <rect x="62" y="30" width="8" height="22" rx="4" fill={LINE} />
    <g style={{transformOrigin: '154px 128px', transform: `perspective(400px) rotateY(${-open * 75}deg)`}}>
      <rect x="46" y="66" width="108" height="124" rx="12" fill="#FFFFFF" stroke={LINE} strokeWidth={3.2} />
      <rect x="62" y="80" width="8" height="34" rx="4" fill={LINE} />
    </g>
  </svg>
);

const Snow: React.FC = () => (
  <svg width={130} height={130} viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="84" fill="#E6F3FB" stroke={LINE} strokeWidth={3.2} />
    {[0, 60, 120].map((a) => (
      <g key={a} transform={`rotate(${a} 100 100)`}>
        <line x1="100" y1="36" x2="100" y2="164" stroke="#6FB7E0" strokeWidth={10} strokeLinecap="round" />
        <polyline points="86,52 100,64 114,52" fill="none" stroke="#6FB7E0" strokeWidth={8} strokeLinecap="round" />
        <polyline points="86,148 100,136 114,148" fill="none" stroke="#6FB7E0" strokeWidth={8} strokeLinecap="round" />
      </g>
    ))}
  </svg>
);

export const StoreInFridge: React.FC<{food: React.ReactNode; background?: string}> = ({food, background = '#FFFDF8'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const ease = (a: number, b: number) =>
    interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 0, 0.2, 1)});
  const pop = (d: number) => spring({frame: frame - d * fps, fps, config: {damping: 12, stiffness: 160, mass: 0.7}});
  const drop = ease(0.2, 0.7);
  const lid = 1 - ease(0.9, 1.3);
  const fly = ease(1.7, 2.7);
  const stored = t >= 2.7;
  const door = t < 1.5 ? ease(1.1, 1.5) : 1 - ease(3.0, 3.5);
  // 坐标按 1920×1080 画布：盒子从左侧飞向冰箱
  const bx = interpolate(fly, [0, 1], [640, 1240]);
  const by = interpolate(fly, [0, 1], [580, 560]);
  const bs = interpolate(fly, [0, 1], [1, 0.25]);
  return (
    <AbsoluteFill style={{background}}>
      <div style={{position: 'absolute', left: 1240, top: 510, transform: `translate(-50%,-50%) scale(${pop(0.05)})`}}>
        <Fridge open={door} stored={stored} />
      </div>
      {!stored && (
        <div style={{position: 'absolute', left: bx, top: by, transform: `translate(-50%,-50%) scale(${bs})`}}>
          <div style={{position: 'relative', width: 380, height: 380}}>
            <div style={{position: 'absolute', left: 190, top: interpolate(drop, [0, 1], [-160, 150]), transform: 'translateX(-50%)'}}>{food}</div>
            <div style={{position: 'absolute', left: 0, top: 0}}>
              <Box lid={lid} />
            </div>
          </div>
        </div>
      )}
      <div style={{position: 'absolute', left: 1420, top: 250, transform: `translate(-50%,-50%) scale(${pop(3.5)})`}}>
        <Snow />
      </div>
    </AbsoluteFill>
  );
};
