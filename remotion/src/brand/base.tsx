import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import {COLORS, FONTS, FRAME, ILL, SUB, VIDEO} from './tokens';

export const FontFaces: React.FC = () => (
  <style>{`
@font-face{font-family:'ZSerif';src:url('${staticFile('fonts/NotoSerifSC-Bold.otf')}') format('opentype');font-display:block;}
@font-face{font-family:'ZSans';src:url('${staticFile('fonts/NotoSansSC-Bold.otf')}') format('opentype');font-display:block;}
@font-face{font-family:'ZSansBlack';src:url('${staticFile('fonts/NotoSansSC-Black.otf')}') format('opentype');font-display:block;}
@font-face{font-family:'ZSansMedium';src:url('${staticFile('fonts/NotoSansSC-Medium.otf')}') format('opentype');font-display:block;}
@font-face{font-family:'ZDMSerif';src:url('${staticFile('fonts/DMSerifDisplay-Italic.ttf')}') format('truetype');font-display:block;}
`}</style>
);

// 暖白纸纹底（程序生成，全片统一）
export const Paper: React.FC = () => (
  <AbsoluteFill style={{background: ILL.paper}}>
    <Img src={staticFile('brand/paper_cream.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </AbsoluteFill>
);

// 主画框：圆角 + 柔和投影，内容裁在框内
export const MainFrame: React.FC<{children: React.ReactNode; bg?: string}> = ({children, bg = ILL.card}) => (
  <div
    style={{
      position: 'absolute',
      left: FRAME.x,
      top: FRAME.y,
      width: FRAME.w,
      height: FRAME.h,
      borderRadius: FRAME.radius,
      overflow: 'hidden',
      background: bg,
      boxShadow: '0 18px 50px rgba(90,60,30,0.18), 0 2px 8px rgba(90,60,30,0.10)',
    }}
  >
    {children}
  </div>
);

export type Cue = {text: string; start: number; end: number};

// hideFrom：从这个时间点起不显示字幕（结尾卡期间不放字幕）
export const Subtitles: React.FC<{cues: Cue[]; hideFrom?: number}> = ({cues, hideFrom = Infinity}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  if (t >= hideFrom) return null;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  if (!cue) return null;
  const clean = cue.text.replace(/[，。？！、,.?!；;：:]/g, ' ').trim();
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        width: VIDEO.width,
        top: SUB.centerY - SUB.fontSize * 0.75,
        height: SUB.fontSize * 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: SUB.fontFamily,
          fontSize: SUB.fontSize,
          lineHeight: 1,
          color: SUB.color,
          letterSpacing: 2,
          whiteSpace: 'nowrap',
          textShadow: '0 2px 0 rgba(255,255,255,0.9), 0 3px 10px rgba(120,90,50,0.18)',
        }}
      >
        {clean}
      </span>
    </div>
  );
};

// ---------- 动画小工具 ----------
export const useSec = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return frame / fps;
};

export const usePop = (delaySec = 0, damping = 12) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delaySec * fps, fps, config: {damping, stiffness: 160, mass: 0.7}});
};

export const ease = (t: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(t, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.33, 0, 0.2, 1),
  });

// 镜头入场：0.18 秒轻推近 + 淡入（转场节奏统一）
export const ShotIn: React.FC<{children: React.ReactNode}> = ({children}) => {
  const t = useSec();
  const s = ease(t, 0, 0.22, 1.06, 1);
  const o = ease(t, 0, 0.12, 0.2, 1);
  return <AbsoluteFill style={{transform: `scale(${s})`, opacity: o}}>{children}</AbsoluteFill>;
};

// 小标签（硬投影贴纸风）：≤34px，不重复字幕大字
// 小标签英文点缀（参考「压力炸锅 Pressure cooker」那种双语标签）
export const EN: Record<string, string> = {
  醉蟹: 'Drunken crab', 生的: 'Raw', 淡水蟹: 'Freshwater', 肺吸虫: 'Lung fluke', 调味: 'Seasoning', 加热: 'Heat',
  蒸熟: 'Steamed', 腿会动: 'Alive', 尽快下锅: 'Cook soon', 包装完好: 'Sealed', 没化软: 'Still frozen', '+ 几分钟': 'More minutes',
  熟蟹: 'Cooked', 熟: 'Cooked', 生: 'Raw', 冷藏: 'Chill', 室温: 'Room temp', 热透: 'Piping hot', 一整夜: 'Overnight',
  再蒸一遍: 'Re-steam', 孕妇: 'Pregnant', 老人: 'Elderly', 孩子: 'Kids', 免疫力弱: 'Low immunity', 腹痛: 'Stomach ache',
  发热: 'Fever', 白酒: 'Liquor', 醋: 'Vinegar', 酱油: 'Soy sauce', 变白: 'White', 紧实: 'Firm', 不透亮: 'Opaque', 闻着正常: 'Smells fine',
  // 糖炒板栗
  零食: 'Snack', 主食: 'Staple', 去壳栗仁: 'Kernels', 袋子大小: 'Bag size', 核桃: 'Walnut', 杏仁: 'Almond', 腰果: 'Cashew', 榛子: 'Hazelnut',
  开心果: 'Pistachio', 板栗: 'Chestnut', 油脂多: 'More fat', 淀粉多: 'More starch', 早餐: 'Breakfast', 午餐: 'Lunch', 晚餐: 'Dinner', 加餐: 'Snack time',
  都是淀粉: 'All starch', 估算: 'Estimate', '烤 · 炒': 'Roasted', '蒸 · 煮': 'Steamed', 热量: 'Calories', 热量不变: 'Same calories', 糖: 'Sugar', 油: 'Oil',
  另算: 'Count extra', 锅里的糖: 'In the pan', 吃进去的糖: 'Eaten', 最佳时间: 'Best time', 主食的一部分: 'Part of staple', 一小份: 'Small portion',
  吃了不少: 'Ate a lot', 少盛一点: 'Less rice', 蔬菜: 'Veggies', 肉: 'Meat', 蛋: 'Eggs', 豆腐: 'Tofu', 控糖: 'Blood sugar', 血糖: 'Glucose', 用药: 'Medication',
  一律不吃: 'Never', 适量: 'Moderate', 不限量: 'Unlimited', 吃了几颗: 'How many', 盛多少: 'How much rice', 两餐之间: 'Between meals',
};

export const Chip: React.FC<{
  text: string;
  x: number;
  y: number;
  delay?: number;
  bg?: string;
  color?: string;
  size?: number;
  rotate?: number;
  icon?: React.ReactNode;
}> = ({text, x, y, delay = 0, bg = ILL.yellow, color = COLORS.ink, size = 32, rotate = -2, icon}) => {
  const p = usePop(delay);
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%,-50%) scale(${p}) rotate(${rotate}deg)`,
        background: bg,
        color,
        fontFamily: FONTS.sans,
        fontSize: size,
        lineHeight: 1,
        padding: `${size * 0.42}px ${size * 0.62}px`,
        borderRadius: size * 0.5,
        border: `2.5px solid ${ILL.line}`,
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.3,
      }}
    >
      {icon}
      <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: size * 0.12}}>
        <span>{text}</span>
        {EN[text] && <span style={{fontFamily: FONTS.en, fontSize: size * 0.5, color: bg === '#fff' || bg === ILL.yellow ? ILL.coral : 'rgba(255,255,255,0.92)', lineHeight: 1}}>{EN[text]}</span>}
      </span>
    </div>
  );
};
