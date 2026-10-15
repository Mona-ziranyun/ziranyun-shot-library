import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {ILL} from './tokens';
import {DriftPattern} from './icons';
import {useSec} from './base';

// 镜头库 SH-014 演示：只有纸纹 + 主题小图标纹样平移，不带任何前景元素和装饰
export const DriftDemo: React.FC<{icon?: (size: number) => React.ReactNode}> = ({icon}) => {
  const t = useSec();
  return (
    <AbsoluteFill style={{background: ILL.card, overflow: 'hidden'}}>
      <Img src={staticFile('brand/paper_cream.jpg')} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'cover'}} />
      <AbsoluteFill style={{background: 'rgba(255,253,248,0.35)'}} />
      <AbsoluteFill style={{transform: 'scale(1.35)', transformOrigin: '0 0'}}>
        <DriftPattern t={t} icon={icon} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
