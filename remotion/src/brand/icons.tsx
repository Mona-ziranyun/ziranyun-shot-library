import React from 'react';
import {COLORS, ILL} from './tokens';

// 统一风格：扁平色块 + 墨色描边（5px）+ 右下硬投影，和封面「硬投影贴纸」一致
const INK = ILL.line;
const SW = 3.2;

type P = {size?: number; style?: React.CSSProperties};

const Svg: React.FC<P & {children: React.ReactNode; vb?: string; shadow?: boolean}> = ({
  size = 200,
  style,
  children,
  vb = '0 0 200 200',
  shadow = false,
}) => (
  <svg
    width={size}
    height={size}
    viewBox={vb}
    style={{overflow: 'visible', filter: shadow ? `drop-shadow(0 6px 10px rgba(43,36,32,0.18))` : undefined, ...style}}
  >
    {children}
  </svg>
);

export const Crab: React.FC<P & {color?: string; dead?: boolean; legPhase?: number}> = ({
  color = ILL.coral,
  dead = false,
  legPhase = 0,
  ...p
}) => {
  const lp = Math.sin(legPhase) * 6;
  const leg = (side: 1 | -1, i: number) => {
    const x0 = 100 + side * 48;
    const y0 = 112 + i * 14;
    const x1 = 100 + side * (82 + i * 4);
    const y1 = 100 + i * 18 + (i % 2 ? lp : -lp) * side;
    const x2 = 100 + side * (96 + i * 2);
    const y2 = 140 + i * 16;
    return <polyline key={`${side}${i}`} points={`${x0},${y0} ${x1},${y1} ${x2},${y2}`} fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />;
  };
  return (
    <Svg {...p}>
      {[0, 1, 2].map((i) => leg(1, i))}
      {[0, 1, 2].map((i) => leg(-1, i))}
      {/* 钳子手臂 */}
      <path d="M58 100 Q36 82 40 58" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
      <path d="M142 100 Q164 82 160 58" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
      {/* 钳子 */}
      <path d="M40 60 C18 52 18 26 36 20 L44 40 L52 24 C64 34 60 56 40 60Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d="M160 60 C182 52 182 26 164 20 L156 40 L148 24 C136 34 140 56 160 60Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      {/* 眼柄 */}
      <line x1="84" y1="80" x2="80" y2="60" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
      <line x1="116" y1="80" x2="120" y2="60" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
      {/* 身体 */}
      <ellipse cx="100" cy="112" rx="60" ry="40" fill={color} stroke={INK} strokeWidth={SW} />
      <ellipse cx="86" cy="100" rx="22" ry="9" fill="rgba(255,255,255,0.35)" />
      {dead ? (
        <>
          <path d="M72 50 l14 14 M86 50 l-14 14" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
          <path d="M114 50 l14 14 M128 50 l-14 14" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="80" cy="56" r="10" fill="#fff" stroke={INK} strokeWidth={SW - 1} />
          <circle cx="120" cy="56" r="10" fill="#fff" stroke={INK} strokeWidth={SW - 1} />
          <circle cx="82" cy="57" r="4.5" fill={INK} />
          <circle cx="122" cy="57" r="4.5" fill={INK} />
        </>
      )}
      <path d={dead ? 'M88 124 Q100 116 112 124' : 'M88 118 Q100 128 112 118'} fill="none" stroke={INK} strokeWidth={SW - 1} strokeLinecap="round" />
    </Svg>
  );
};

export const Bottle: React.FC<P & {color?: string; label?: string; liquid?: string}> = ({
  color = '#EAF3F7',
  liquid = '#F8E7B0',
  ...p
}) => (
  <Svg {...p}>
    <rect x="84" y="14" width="32" height="22" rx="4" fill={ILL.coral} stroke={INK} strokeWidth={SW} />
    <path d="M88 36 L88 62 Q60 76 60 104 L60 176 Q60 188 72 188 L128 188 Q140 188 140 176 L140 104 Q140 76 112 62 L112 36 Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M64 120 L136 120 L136 176 Q136 184 128 184 L72 184 Q64 184 64 176Z" fill={liquid} />
    <rect x="70" y="128" width="60" height="38" rx="6" fill="#fff" stroke={INK} strokeWidth={SW - 1} />
    <path d="M70 92 Q72 80 86 74" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" opacity={0.8} />
  </Svg>
);

export const Flame: React.FC<P & {flicker?: number}> = ({flicker = 0, ...p}) => {
  const f = Math.sin(flicker) * 4;
  return (
    <Svg {...p}>
      <path d={`M100 ${18 + f} C140 60 162 92 156 132 C150 170 124 190 100 190 C76 190 50 170 44 132 C40 100 60 84 72 62 C78 84 86 92 94 96 C90 66 96 40 100 ${18 + f}Z`} fill={ILL.coral} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d={`M100 ${92 - f} C122 116 128 136 124 154 C120 172 110 180 100 180 C88 180 76 170 76 152 C76 132 92 120 100 ${92 - f}Z`} fill={ILL.yellow} stroke={INK} strokeWidth={SW - 1} strokeLinejoin="round" />
    </Svg>
  );
};

export const Snowflake: React.FC<P & {color?: string}> = ({color = '#6FB7E0', ...p}) => (
  <Svg {...p}>
    <circle cx="100" cy="100" r="84" fill="#E6F3FB" stroke={INK} strokeWidth={SW} />
    {[0, 60, 120].map((a) => (
      <g key={a} transform={`rotate(${a} 100 100)`}>
        <line x1="100" y1="36" x2="100" y2="164" stroke={color} strokeWidth={10} strokeLinecap="round" />
        <polyline points="86,52 100,64 114,52" fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="86,148 100,136 114,148" fill="none" stroke={color} strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    ))}
  </Svg>
);

export const Fridge: React.FC<P & {open?: number; crabBox?: boolean}> = ({open = 0, crabBox = false, ...p}) => (
  <Svg {...p}>
    <rect x="46" y="14" width="108" height="176" rx="14" fill="#F4F8FA" stroke={INK} strokeWidth={SW} />
    {/* 里面 */}
    <rect x="54" y="72" width="92" height="110" rx="6" fill="#DDEFF7" />
    <line x1="54" y1="112" x2="146" y2="112" stroke="#9CCBE0" strokeWidth={4} />
    <line x1="54" y1="148" x2="146" y2="148" stroke="#9CCBE0" strokeWidth={4} />
    <rect x="62" y="86" width="36" height="24" rx="5" fill={ILL.coral} stroke={INK} strokeWidth={3} />
    <rect x="104" y="122" width="34" height="24" rx="5" fill={ILL.green} stroke={INK} strokeWidth={3} />
    {crabBox && (
      <g>
        <g transform="translate(80 136) scale(0.16) translate(-100 -110)">
          <Crab size={200} color={ILL.coral} style={{filter: 'none'}} />
        </g>
        <rect x="60" y="124" width="40" height="22" rx="4" fill="rgba(220,240,248,0.45)" stroke={INK} strokeWidth={3} />
        <rect x="58" y="119" width="44" height="7" rx="3" fill={ILL.green} stroke={INK} strokeWidth={2.5} />
      </g>
    )}
    {/* 冷冻门 */}
    <rect x="46" y="14" width="108" height="52" rx="14" fill="#F4F8FA" stroke={INK} strokeWidth={SW} />
    <rect x="62" y="30" width="8" height="22" rx="4" fill={INK} />
    {/* 冷藏门（可开） */}
    <g style={{transformOrigin: '154px 128px', transform: `perspective(400px) rotateY(${-open * 75}deg)`}}>
      <rect x="46" y="66" width="108" height="124" rx="12" fill="#FFFFFF" stroke={INK} strokeWidth={SW} />
      <rect x="62" y="80" width="8" height="34" rx="4" fill={INK} />
    </g>
  </Svg>
);

export const Clock: React.FC<P & {progress?: number; color?: string; hand?: number}> = ({progress = 0, color = ILL.coral, hand, ...p}) => {
  const a = progress * 2 * Math.PI;
  const r = 70;
  const x = 100 + r * Math.sin(a);
  const y = 104 - r * Math.cos(a);
  const large = progress > 0.5 ? 1 : 0;
  const ha = (hand ?? progress) * 360;
  return (
    <Svg {...p}>
      <circle cx="100" cy="104" r="84" fill="#fff" stroke={INK} strokeWidth={SW} />
      {progress > 0.001 && progress < 0.999 && <path d={`M100 104 L100 34 A70 70 0 ${large} 1 ${x} ${y} Z`} fill={color} opacity={0.9} />}
      {progress >= 0.999 && <circle cx="100" cy="104" r="70" fill={color} opacity={0.9} />}
      {Array.from({length: 12}).map((_, i) => (
        <line key={i} x1="100" y1="26" x2="100" y2={i % 3 === 0 ? 40 : 34} stroke={INK} strokeWidth={i % 3 === 0 ? 5 : 3} transform={`rotate(${i * 30} 100 104)`} strokeLinecap="round" />
      ))}
      <line x1="100" y1="104" x2="100" y2="50" stroke={INK} strokeWidth={6} strokeLinecap="round" transform={`rotate(${ha} 100 104)`} />
      <line x1="100" y1="104" x2="100" y2="70" stroke={INK} strokeWidth={7} strokeLinecap="round" transform={`rotate(${ha / 12} 100 104)`} />
      <circle cx="100" cy="104" r="8" fill={INK} />
    </Svg>
  );
};

export const Thermo: React.FC<P & {level?: number; color?: string}> = ({level = 0.5, color = ILL.coral, ...p}) => {
  const top = 150 - level * 120;
  return (
    <Svg {...p}>
      <rect x="80" y="14" width="40" height="150" rx="20" fill="#fff" stroke={INK} strokeWidth={SW} />
      <rect x="90" y={top} width="20" height={166 - top} rx="8" fill={color} />
      <circle cx="100" cy="166" r="26" fill={color} stroke={INK} strokeWidth={SW} />
      {[40, 70, 100, 130].map((y) => (
        <line key={y} x1="120" y1={y} x2="134" y2={y} stroke={INK} strokeWidth={4} strokeLinecap="round" />
      ))}
    </Svg>
  );
};

export const Check: React.FC<P & {color?: string}> = ({color = ILL.green, ...p}) => (
  <Svg {...p}>
    <circle cx="100" cy="100" r="84" fill={color} stroke={INK} strokeWidth={SW} />
    <polyline points="58,104 88,134 144,74" fill="none" stroke="#fff" strokeWidth={18} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const Cross: React.FC<P & {color?: string}> = ({color = ILL.coral, ...p}) => (
  <Svg {...p}>
    <circle cx="100" cy="100" r="84" fill={color} stroke={INK} strokeWidth={SW} />
    <path d="M66 66 L134 134 M134 66 L66 134" stroke="#fff" strokeWidth={18} strokeLinecap="round" />
  </Svg>
);

export const Warn: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M100 18 L186 172 L14 172 Z" fill={ILL.yellow} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <rect x="92" y="70" width="16" height="56" rx="8" fill={INK} />
    <circle cx="100" cy="146" r="10" fill={INK} />
  </Svg>
);

export const Magnifier: React.FC<P & {children?: React.ReactNode}> = ({children, ...p}) => (
  <Svg {...p}>
    <defs>
      <clipPath id="lens">
        <circle cx="86" cy="86" r="62" />
      </clipPath>
    </defs>
    <line x1="132" y1="132" x2="182" y2="182" stroke={INK} strokeWidth={15} strokeLinecap="round" />
    <line x1="132" y1="132" x2="182" y2="182" stroke={ILL.pink} strokeWidth={9} strokeLinecap="round" />
    <circle cx="86" cy="86" r="62" fill="#F1FAFD" />
    <g clipPath="url(#lens)">{children}</g>
    <circle cx="86" cy="86" r="62" fill="none" stroke={INK} strokeWidth={SW + 1} />
    <path d="M50 62 Q60 42 82 38" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" />
  </Svg>
);

// 肺吸虫（卡通化示意，不做写实，避免不适）
export const Fluke: React.FC<{x?: number; y?: number; s?: number; wiggle?: number}> = ({x = 86, y = 86, s = 1, wiggle = 0}) => (
  <g transform={`translate(${x} ${y}) scale(${s}) rotate(${Math.sin(wiggle) * 8})`}>
    <ellipse cx="0" cy="0" rx="30" ry="20" fill="#F2A7A0" stroke={INK} strokeWidth={4} />
    <circle cx="-14" cy="-2" r="4" fill={INK} />
    <circle cx="-2" cy="-2" r="4" fill={INK} />
    <circle cx="14" cy="4" r="3" fill="#D97B70" />
    <circle cx="6" cy="10" r="2.5" fill="#D97B70" />
  </g>
);

export const Wave: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="100" cy="100" r="84" fill="#DDF0F7" stroke={INK} strokeWidth={SW} />
    {[78, 108, 138].map((y) => (
      <path key={y} d={`M40 ${y} q15 -14 30 0 t30 0 t30 0 t30 0`} fill="none" stroke="#3C9AC8" strokeWidth={8} strokeLinecap="round" />
    ))}
  </Svg>
);

export const Scissors: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M100 100 L170 26" stroke={INK} strokeWidth={10} strokeLinecap="round" />
    <path d="M100 100 L170 26" stroke="#C9D3D8" strokeWidth={6} strokeLinecap="round" />
    <path d="M100 100 L176 150" stroke={INK} strokeWidth={10} strokeLinecap="round" />
    <path d="M100 100 L176 150" stroke="#C9D3D8" strokeWidth={6} strokeLinecap="round" />
    <path d="M100 100 L66 132" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <path d="M100 100 L60 76" stroke={INK} strokeWidth={7} strokeLinecap="round" />
    <circle cx="48" cy="150" r="26" fill={ILL.coral} stroke={INK} strokeWidth={SW} />
    <circle cx="48" cy="150" r="11" fill={'#FFF8EC'} stroke={INK} strokeWidth={3} />
    <circle cx="40" cy="64" r="26" fill={ILL.coral} stroke={INK} strokeWidth={SW} />
    <circle cx="40" cy="64" r="11" fill={'#FFF8EC'} stroke={INK} strokeWidth={3} />
    <circle cx="100" cy="100" r="7" fill={INK} />
  </Svg>
);

export const Plate: React.FC<P & {children?: React.ReactNode}> = ({children, ...p}) => (
  <Svg {...p}>
    <ellipse cx="100" cy="120" rx="94" ry="58" fill="#fff" stroke={INK} strokeWidth={SW} />
    <ellipse cx="100" cy="116" rx="66" ry="38" fill="#F5EFE4" stroke="#D8CDBB" strokeWidth={3} />
    {children}
  </Svg>
);

export const Bubbles: React.FC<P & {t?: number}> = ({t = 0, ...p}) => (
  <Svg {...p} shadow={false}>
    {[
      [50, 140, 22],
      [96, 120, 30],
      [140, 150, 18],
      [120, 70, 16],
      [64, 80, 14],
    ].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y - ((t * 60 + i * 23) % 90)} r={r} fill="rgba(255,255,255,0.75)" stroke="#7CC3E3" strokeWidth={4} />
    ))}
  </Svg>
);

export const Drop: React.FC<P & {color?: string}> = ({color = '#B9A27A', ...p}) => (
  <Svg {...p}>
    <path d="M100 20 C130 70 150 100 150 130 C150 160 128 182 100 182 C72 182 50 160 50 130 C50 100 70 70 100 20Z" fill={color} stroke={INK} strokeWidth={SW} />
    <path d="M76 128 Q78 108 92 98" fill="none" stroke="#fff" strokeWidth={7} strokeLinecap="round" opacity={0.7} />
  </Svg>
);

export const Shield: React.FC<P & {color?: string}> = ({color = ILL.green, ...p}) => (
  <Svg {...p}>
    <path d="M100 16 L170 42 L166 104 Q160 160 100 188 Q40 160 34 104 L30 42 Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <path d="M100 40 L146 58 L143 104 Q138 144 100 164Z" fill="rgba(255,255,255,0.25)" />
  </Svg>
);

export const Jar: React.FC<P & {children?: React.ReactNode; liquid?: number}> = ({children, liquid = 0.6, ...p}) => {
  const top = 180 - liquid * 120;
  return (
    <Svg {...p}>
      <rect x="44" y="20" width="112" height="26" rx="6" fill={ILL.coral} stroke={INK} strokeWidth={SW} />
      <path d="M40 46 L160 46 L166 172 Q166 188 150 188 L50 188 Q34 188 34 172 Z" fill="#EAF5F8" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
      <path d={`M38 ${top} L162 ${top} L166 172 Q166 186 150 186 L50 186 Q36 186 36 172 Z`} fill="#D9A55A" opacity={0.75} />
      {children}
      <path d="M52 70 Q54 60 64 56" fill="none" stroke="#fff" strokeWidth={6} strokeLinecap="round" />
    </Svg>
  );
};

export const Steamer: React.FC<P> = (p) => (
  <Svg {...p}>
    <ellipse cx="100" cy="70" rx="84" ry="22" fill="#E9C98C" stroke={INK} strokeWidth={SW} />
    <path d="M16 70 L16 150 Q16 174 100 174 Q184 174 184 150 L184 70" fill="#E3B970" stroke={INK} strokeWidth={SW} />
    {[92, 118, 144].map((y) => (
      <path key={y} d={`M18 ${y} Q100 ${y + 22} 182 ${y}`} fill="none" stroke="#B88A44" strokeWidth={4} />
    ))}
    <ellipse cx="100" cy="70" rx="64" ry="14" fill="#F2DDB0" />
    <circle cx="100" cy="46" r="10" fill="#C99A54" stroke={INK} strokeWidth={4} />
    <path d="M100 56 L100 62" stroke={INK} strokeWidth={4} />
  </Svg>
);

export const Calendar: React.FC<P & {day?: string; tag?: string}> = ({day = '明天', ...p}) => (
  <Svg {...p}>
    <rect x="22" y="34" width="156" height="148" rx="16" fill="#fff" stroke={INK} strokeWidth={SW} />
    <path d="M22 50 Q22 34 38 34 L162 34 Q178 34 178 50 L178 76 L22 76 Z" fill={ILL.coral} stroke={INK} strokeWidth={SW} />
    <rect x="56" y="18" width="12" height="32" rx="6" fill={INK} />
    <rect x="132" y="18" width="12" height="32" rx="6" fill={INK} />
    <text x="100" y={day.length > 1 ? 146 : 152} textAnchor="middle" fontFamily="ZSansBlack" fontSize={day.length > 1 ? 54 : 72} fill={INK}>
      {day}
    </text>
  </Svg>
);

export const Moon: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M128 24 A80 80 0 1 0 176 132 A64 64 0 1 1 128 24Z" fill={ILL.yellow} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <circle cx="160" cy="40" r="6" fill={ILL.yellow} stroke={INK} strokeWidth={3} />
    <circle cx="180" cy="78" r="4" fill={ILL.yellow} stroke={INK} strokeWidth={3} />
  </Svg>
);

export const Nose: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M86 30 Q80 96 54 128 Q44 146 64 154 Q80 160 90 150 Q100 160 116 156 Q134 150 124 132" fill="#F6D3B5" stroke={INK} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
    {[0, 1, 2].map((i) => (
      <path key={i} d={`M140 ${70 + i * 26} q12 -8 24 0 t24 0`} fill="none" stroke={ILL.green} strokeWidth={6} strokeLinecap="round" />
    ))}
  </Svg>
);

export const Dice: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="30" y="30" width="140" height="140" rx="28" fill="#fff" stroke={INK} strokeWidth={SW} />
    {[
      [66, 66],
      [134, 66],
      [100, 100],
      [66, 134],
      [134, 134],
    ].map(([x, y], i) => (
      <circle key={i} cx={x} cy={y} r="12" fill={ILL.coral} />
    ))}
  </Svg>
);

export const Package: React.FC<P & {torn?: boolean}> = ({torn = false, ...p}) => (
  <Svg {...p}>
    <path d="M20 54 L180 54 L172 170 Q170 182 158 182 L42 182 Q30 182 28 170 Z" fill="#DDEFF7" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <rect x="14" y="36" width="172" height="26" rx="8" fill="#3C9AC8" stroke={INK} strokeWidth={SW} />
    <g transform="translate(100 120) scale(0.42) translate(-100 -110)">
      <Crab size={200} color={ILL.coral} style={{filter: 'none'}} />
    </g>
    {torn && <path d="M150 56 L138 82 L156 96 L140 120" fill="none" stroke={ILL.red} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" />}
  </Svg>
);

export const Hand: React.FC<P & {color?: string}> = ({color = '#F6D3B5', ...p}) => (
  <Svg {...p}>
    <path d="M60 186 L56 108 Q54 94 66 92 Q76 92 78 104 L80 60 Q80 46 92 46 Q104 46 104 60 L104 40 Q104 26 116 26 Q128 26 128 40 L128 58 Q130 46 142 46 Q154 48 152 62 L150 130 Q172 108 182 116 Q190 124 176 140 L144 186 Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
  </Svg>
);

// 人物图标（极简扁平）
export const Person: React.FC<P & {kind: 'pregnant' | 'elder' | 'child' | 'adult'; color?: string}> = ({kind, color = ILL.green, ...p}) => {
  const child = kind === 'child';
  const headY = child ? 78 : 50;
  const headR = child ? 26 : 28;
  return (
    <Svg {...p}>
      <circle cx="100" cy={headY} r={headR} fill="#F6D3B5" stroke={INK} strokeWidth={SW} />
      {kind === 'elder' && <path d={`M74 ${headY - 6} Q100 ${headY - 46} 126 ${headY - 6}`} fill="#E8E2D8" stroke={INK} strokeWidth={SW} />}
      {kind === 'pregnant' && <path d={`M70 ${headY - 2} Q72 ${headY - 40} 100 ${headY - 34} Q130 ${headY - 40} 132 ${headY + 10}`} fill="#4A3426" stroke={INK} strokeWidth={4} />}
      {child && <path d={`M78 ${headY - 12} Q100 ${headY - 40} 122 ${headY - 12}`} fill="#4A3426" stroke={INK} strokeWidth={4} />}
      <path
        d={
          child
            ? 'M70 186 L74 120 Q76 106 100 106 Q124 106 126 120 L130 186 Z'
            : 'M58 188 L64 104 Q66 84 100 84 Q134 84 136 104 L142 188 Z'
        }
        fill={color}
        stroke={INK}
        strokeWidth={SW}
        strokeLinejoin="round"
      />
      {kind === 'pregnant' && <ellipse cx="128" cy="142" rx="26" ry="32" fill={color} stroke={INK} strokeWidth={SW} />}
      {kind === 'elder' && (
        <>
          <path d="M156 110 L160 190" stroke={'#C98B5A'} strokeWidth={9} strokeLinecap="round" />
          <path d="M156 110 Q156 98 146 98" fill="none" stroke={'#C98B5A'} strokeWidth={9} strokeLinecap="round" />
        </>
      )}
    </Svg>
  );
};

export const Doctor: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="34" y="20" width="132" height="168" rx="14" fill="#fff" stroke={INK} strokeWidth={SW} />
    <rect x="70" y="10" width="60" height="26" rx="8" fill={'#C98B5A'} stroke={INK} strokeWidth={SW} />
    <path d="M92 56 h16 v16 h16 v16 h-16 v16 h-16 v-16 h-16 v-16 h16z" fill={ILL.coral} stroke={INK} strokeWidth={3} />
    {[128, 148, 168].map((y) => (
      <line key={y} x1="56" y1={y} x2={y === 168 ? 120 : 144} y2={y} stroke="#C9BFAF" strokeWidth={7} strokeLinecap="round" />
    ))}
  </Svg>
);

export const Box: React.FC<P & {lid?: number}> = ({lid = 0, ...p}) => (
  <Svg {...p}>
    <path d="M30 90 L170 90 L162 176 Q160 186 150 186 L50 186 Q40 186 38 176 Z" fill="rgba(220,240,248,0.45)" stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    <g transform={`translate(0 ${-lid * 40}) rotate(${-lid * 12} 30 80)`}>
      <rect x="22" y="70" width="156" height="24" rx="8" fill={ILL.green} stroke={INK} strokeWidth={SW} />
    </g>
  </Svg>
);

// 表情脸：happy 开心 / sick 难受（冒汗、皱眉）
export const Face: React.FC<P & {mood: 'happy' | 'sick'}> = ({mood, ...p}) => {
  const happy = mood === 'happy';
  return (
    <Svg {...p}>
      <circle cx="100" cy="100" r="84" fill={happy ? ILL.yellow : '#BFD9A8'} stroke={INK} strokeWidth={SW} />
      {happy ? (
        <>
          <path d="M58 86 Q70 70 82 86" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <path d="M118 86 Q130 70 142 86" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <path d="M60 112 Q100 160 140 112 Z" fill="#fff" stroke={INK} strokeWidth={6} strokeLinejoin="round" />
          <circle cx="50" cy="112" r="11" fill={ILL.coral} opacity={0.45} />
          <circle cx="150" cy="112" r="11" fill={ILL.coral} opacity={0.45} />
        </>
      ) : (
        <>
          <path d="M56 76 L82 86" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <path d="M144 76 L118 86" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <circle cx="72" cy="100" r="7" fill={INK} />
          <circle cx="128" cy="100" r="7" fill={INK} />
          <path d="M66 146 Q100 118 134 146" fill="none" stroke={INK} strokeWidth={7} strokeLinecap="round" />
          <path d="M156 56 C166 72 168 82 158 88 C148 84 148 72 156 56Z" fill="#7CC3E3" stroke={INK} strokeWidth={4} />
        </>
      )}
    </Svg>
  );
};

// 飘落的秋叶（叠加层）
export const FallingLeaves: React.FC<{t: number; w: number; h: number; n?: number; seed?: number}> = ({t, w, h, n = 14, seed = 3}) => {
  const rnd = (i: number) => {
    const x = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const cols = ['#EA562D', '#F28C38', '#FED23F', '#C9622B'];
  return (
    <svg width={w} height={h} style={{position: 'absolute', left: 0, top: 0, pointerEvents: 'none'}}>
      {Array.from({length: n}).map((_, i) => {
        const sp = 90 + rnd(i) * 120;
        const y = ((rnd(i + 50) * h + t * sp) % (h + 120)) - 60;
        const x = rnd(i + 99) * w + Math.sin(t * 1.6 + i) * 40;
        const r = t * (60 + rnd(i + 7) * 120) + i * 30;
        const s = 0.6 + rnd(i + 3) * 0.7;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={0.92}>
            <path d="M0 -26 L7 -10 L22 -14 L14 0 L24 10 L8 10 L0 26 L-8 10 L-24 10 L-14 0 L-22 -14 L-7 -10 Z" fill={cols[i % 4]} />
            <line x1="0" y1="-18" x2="0" y2="22" stroke="rgba(90,40,10,0.45)" strokeWidth={2} />
          </g>
        );
      })}
    </svg>
  );
};

// 糖炒板栗（线描漫画风）：宽圆的栗色外壳 + 顶部小尖簇毛 + 浅色粗糙底座 + 壳纹和高光
export const Chestnut: React.FC<P & {color?: string}> = ({color = ILL.chestnut, ...p}) => (
  <Svg {...p}>
    {/* 外壳：上方收成小尖、两肩宽圆 */}
    <path d="M100 38 C122 42 170 66 172 114 C174 150 142 168 100 168 C58 168 26 150 28 114 C30 66 78 42 100 38Z" fill={color} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    {/* 浅色底座 */}
    <path d="M30 124 Q100 142 170 124 C166 154 138 168 100 168 C62 168 34 154 30 124Z" fill={ILL.chestnutBase} stroke={INK} strokeWidth={SW} strokeLinejoin="round" />
    {[52, 76, 100, 124, 148].map((x, i) => (
      <circle key={i} cx={x} cy={148 + (i % 2) * 6} r={2.6} fill={INK} opacity={0.5} />
    ))}
    {/* 壳纹 */}
    <path d="M100 40 Q80 80 76 126" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.45} />
    <path d="M100 40 Q122 80 126 126" fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" opacity={0.45} />
    {/* 顶部小簇毛 */}
    <path d="M100 38 L100 24 M100 38 L91 27 M100 38 L109 27" fill="none" stroke={INK} strokeWidth={SW} strokeLinecap="round" />
    {/* 油亮高光 */}
    <path d="M50 104 Q54 78 74 62" fill="none" stroke="#FFFFFF" strokeWidth={7} strokeLinecap="round" opacity={0.8} />
  </Svg>
);

// 主题小图标纹样背景（镜头库 SH-014）：复用的是动效和透明度，icon 每期换成当期主题元素
// 很淡的一层主题图标（本期是小螃蟹）错位平铺、轻微旋转，整体缓慢向右平移
export const DriftPattern: React.FC<{t: number; icon?: (size: number) => React.ReactNode; opacity?: number; speed?: number}> = ({
  t,
  icon = (size) => <Crab size={size} color={ILL.coral} />,
  opacity = 0.09,
  speed = 14,
}) => (
  <div style={{position: 'absolute', left: -120 + ((t * speed) % 180), top: -60, opacity, display: 'grid', gridTemplateColumns: 'repeat(10, 180px)', gridAutoRows: '150px'}}>
    {Array.from({length: 70}).map((_, i) => (
      <div key={i} style={{transform: `translateX(${Math.floor(i / 10) % 2 ? 90 : 0}px) rotate(${i % 3 ? -12 : 10}deg)`}}>{icon(110)}</div>
    ))}
  </div>
);
