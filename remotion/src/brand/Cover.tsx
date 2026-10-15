import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {FontFaces} from './base';

// 固定封面模板（配色、字体、版式不动；每条只换抠图和文案）
const C = {
  orange: '#EA562D',
  cream: '#F3E7CF',
  green: '#509140',
  yellow: '#FED23F',
  white: '#FFFFFF',
  brown: '#3A2418',
};

const hardShadow = (n: number, color = C.brown) =>
  Array.from({length: n}, (_, i) => `${i + 1}px ${i + 1}px 0 ${color}`).join(',');

export type CoverProps = {
  title: string[]; // 主标题，3:4 用一行或两行；4:3 用两行
  tag: string; // 副标题问句
  hookA: string; // 钩子句前半（白）
  hookB: string; // 钩子句后半（黄）
  en: string; // 英文点缀
  cutout: string; // 抠图（public 下路径）
  shift34?: [number, number]; // 抠图偏移（像素）：抠图外框比例不同的期数用来微调落点，默认不动
  shift43?: [number, number];
  titleSize43?: number; // 4:3 主标题字号：默认 196（每行 ≤4 字）；标题更长的期数调小，版式不动
};

const Star: React.FC<{x: number; y: number; s: number; color: string}> = ({x, y, s, color}) => (
  <svg width={s} height={s} viewBox="0 0 100 100" style={{position: 'absolute', left: x - s / 2, top: y - s / 2}}>
    <path d="M50 0 C54 36 64 46 100 50 C64 54 54 64 50 100 C46 64 36 54 0 50 C36 46 46 36 50 0Z" fill={color} />
  </svg>
);

const Tag: React.FC<{text: string; size: number; rot: number; style?: React.CSSProperties}> = ({text, size, rot, style}) => (
  <div
    style={{
      display: 'inline-block',
      background: C.yellow,
      color: C.brown,
      fontFamily: 'ZSans',
      fontSize: size,
      lineHeight: 1,
      padding: `${size * 0.36}px ${size * 0.55}px`,
      borderRadius: size * 0.22,
      boxShadow: `7px 8px 0 ${C.brown}`,
      transform: `rotate(${rot}deg)`,
      whiteSpace: 'nowrap',
      ...style,
    }}
  >
    {text}
  </div>
);

export const Cover34: React.FC<CoverProps> = ({title, tag, hookA, hookB, en, cutout, shift34 = [0, 0]}) => {
  const W = 1080;
  return (
    <AbsoluteFill style={{background: C.cream, overflow: 'hidden'}}>
      <FontFaces />
      {/* 橘红上块：斜切，左右各多出 (宽×tan角 + 50px) */}
      <div style={{position: 'absolute', left: -200, top: -300, width: W + 400, height: 900, background: C.orange, transform: 'rotate(-3deg)', transformOrigin: 'center'}} />
      {/* 草绿下块 */}
      <div style={{position: 'absolute', left: -200, top: 1040, width: W + 400, height: 900, background: C.green, transform: 'rotate(-3deg)', transformOrigin: 'center'}} />
      {/* 主标题 */}
      <div style={{position: 'absolute', left: 110, width: W - 220, top: 70, textAlign: 'center'}}>
        {title.map((l) => (
          <div key={l} style={{fontFamily: 'ZSansBlack', fontSize: title.length > 1 ? 160 : 156, lineHeight: 1.1, color: C.white, textShadow: hardShadow(10), whiteSpace: 'nowrap'}}>
            {l}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 0, width: W, top: title.length > 1 ? 470 : 315, textAlign: 'center'}}>
        <Tag text={tag} size={56} rot={-2} />
      </div>
      {/* 抠图：跨色带交界 */}
      <Img
        src={staticFile(cutout)}
        style={{position: 'absolute', left: 70 + shift34[0], top: 470 + shift34[1], width: 760, filter: 'drop-shadow(0 22px 26px rgba(40,25,15,0.35))'}}
      />
      <div style={{position: 'absolute', right: 46, top: 700, fontFamily: 'ZDMSerif', fontSize: 64, color: C.orange, transform: 'rotate(-8deg)', width: 230, lineHeight: 1, textAlign: 'center'}}>{en}</div>
      {/* 钩子句 */}
      <div style={{position: 'absolute', left: 120, top: 1150, fontFamily: 'ZSansBlack', fontSize: 112, lineHeight: 1.15, color: C.white, textShadow: hardShadow(7)}}>{hookA}</div>
      <div style={{position: 'absolute', left: 300, top: 1280, fontFamily: 'ZSansBlack', fontSize: 112, lineHeight: 1.15, color: C.yellow, textShadow: hardShadow(7)}}>{hookB}</div>
      <Star x={950} y={1190} s={70} color={C.yellow} />
      <Star x={90} y={1340} s={56} color={C.yellow} />
      <Star x={980} y={420} s={50} color={C.white} />
    </AbsoluteFill>
  );
};

export const Cover43: React.FC<CoverProps> = ({title, tag, hookA, hookB, en, cutout, shift43 = [0, 0], titleSize43 = 196}) => {
  const W = 1440;
  const H = 1080;
  return (
    <AbsoluteFill style={{background: C.cream, overflow: 'hidden'}}>
      <FontFaces />
      {/* 橘红左块：右边斜切 */}
      <div style={{position: 'absolute', left: -400, top: -200, width: 1240, height: H + 400, background: C.orange, transform: 'rotate(5deg)', transformOrigin: 'center'}} />
      {/* 草绿底块 */}
      <div style={{position: 'absolute', left: -300, top: 820, width: W + 600, height: 600, background: C.green, transform: 'rotate(-3deg)', transformOrigin: 'center'}} />
      <div style={{position: 'absolute', left: 110, top: 70}}>
        {title.map((l) => (
          <div key={l} style={{fontFamily: 'ZSansBlack', fontSize: titleSize43, lineHeight: 1.08, color: C.white, textShadow: hardShadow(11), whiteSpace: 'nowrap'}}>
            {l}
          </div>
        ))}
      </div>
      <div style={{position: 'absolute', left: 110, top: 560}}>
        <Tag text={tag} size={48} rot={-2} />
      </div>
      <Img src={staticFile(cutout)} style={{position: 'absolute', left: 700 + shift43[0], top: 230 + shift43[1], width: 720, filter: 'drop-shadow(0 22px 26px rgba(40,25,15,0.35))'}} />
      <div style={{position: 'absolute', right: 90, top: 70, fontFamily: 'ZDMSerif', fontSize: 72, color: C.orange, transform: 'rotate(-6deg)'}}>{en}</div>
      <div style={{position: 'absolute', left: 110, top: 880, whiteSpace: 'nowrap', fontFamily: 'ZSansBlack', fontSize: 104, lineHeight: 1, textShadow: hardShadow(7)}}>
        <span style={{color: C.white}}>{hookA}</span>
        <span style={{color: C.yellow, marginLeft: 36}}>{hookB}</span>
      </div>
      <Star x={760} y={140} s={64} color={C.yellow} />
      <Star x={70} y={740} s={52} color={C.white} />
      <Star x={1360} y={770} s={46} color={C.yellow} />
    </AbsoluteFill>
  );
};
