// 自然云 · 全片共用固定参数（每条视频自动套用）
// 改这里 = 改所有视频，改之前先和自然云确认。

export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
};

// 竖直中心线：画布、主画框、字幕容器共用
export const CENTER_X = VIDEO.width / 2;

// 主画框（16:9）：固定排版，自然云 2026-10-07 确认。所有视频、图片、动画都放在这里面
export const FRAME = {
  w: 1440,
  h: 810,
  x: (VIDEO.width - 1440) / 2, // 240
  y: 52,
  radius: 28,
};

// 安全区：内容不出这个范围
export const SAFE = {x: 180, y: 40, w: 1560, h: 1000};

// 字幕：底部居中，字幕中心离底边约 9.5%
export const SUB = {
  centerY: 970,
  fontSize: 54, // 剪映字号 5 的换算值，待自然云确认后固定
  fontFamily: 'ZSerif',
  color: '#4A3226', // 黑咖色：固定参数，自然云 2026-10-07 确认，所有视频通用
  maxWidth: 1400,
};

export const COLORS = {
  orange: '#EA562D', // 橘红
  cream: '#F3E7CF', // 米白
  green: '#509140', // 草绿
  yellow: '#FED23F', // 明黄
  brown: '#7A5236', // 咖啡棕
  ink: '#2B2420', // 墨色（近黑深棕）
  paper: '#F7F1E6', // 纸纹底
  white: '#FFFFFF',
  red: '#D9442B',
  mute: '#9A8F80',
};

export const FONTS = {
  serif: 'ZSerif', // 思源宋体 Bold：字幕
  sans: 'ZSans', // 思源黑体 Bold：小标签
  sansBlack: 'ZSansBlack', // 思源黑体 Heavy
  sansMedium: 'ZSansMedium',
  en: 'ZDMSerif', // DM Serif Display Italic：英文点缀
};

// 线描漫画风色板（2026-10-07 自然云指定的插画风格：细黑描边 + 马卡龙平涂）
export const ILL = {
  line: '#1F1B18', // 描边
  coral: '#F2735A', // 熟蟹 / 强调
  red: '#E8473B',
  pink: '#F7B8D3',
  blue: '#8FD3F4',
  yellow: '#FBEA7E',
  mint: '#A8E0B8',
  green: '#5DB86E',
  orange: '#F7A15E',
  rawCrab: '#A9C3C6', // 生蟹
  chestnut: '#B8693F', // 糖炒板栗外壳（马卡龙化的栗色）
  chestnutBase: '#F3DDB0', // 板栗底座
  paper: '#F6F4EF',
  card: '#FFFDF8',
};
