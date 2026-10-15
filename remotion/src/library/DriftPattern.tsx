// 小图标纹样背景（镜头库 SH-014）· 独立组件：只依赖 react + remotion
// 用法：<DriftPattern icon={<img src={staticFile('icon.png')} style={{width: 110}} />} />，可以把其他内容叠在上面
// 效果：很淡（9%）的小图标错位平铺、略微倾斜，整体每秒 14 像素向右平移
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  icon: React.ReactNode; // 主题小图标（换成当期主题，例如螃蟹、咖啡杯）
  opacity?: number; // 纹样浓度
  speed?: number; // 平移速度：像素 / 秒
  cell?: number; // 图标间距
  background?: string; // 底色或纸纹
};

export const DriftPattern: React.FC<Props> = ({icon, opacity = 0.09, speed = 14, cell = 180, background = '#F6F1E7'}) => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const t = frame / fps;
  const cols = Math.ceil(width / cell) + 2;
  const rows = Math.ceil(height / (cell * 0.83)) + 2;
  return (
    <AbsoluteFill style={{background, overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          left: -cell + ((t * speed) % cell),
          top: -cell / 3,
          opacity,
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
          gridAutoRows: `${cell * 0.83}px`,
        }}
      >
        {Array.from({length: cols * rows}).map((_, i) => (
          <div key={i} style={{transform: `translateX(${Math.floor(i / cols) % 2 ? cell / 2 : 0}px) rotate(${i % 3 ? -12 : 10}deg)`}}>
            {icon}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
