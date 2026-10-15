import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

type Move = 'in' | 'out' | 'left' | 'right' | 'up' | 'none';

const kb = (move: Move, p: number, amt: number) => {
  switch (move) {
    case 'in':
      return `scale(${1 + amt * p})`;
    case 'out':
      return `scale(${1 + amt * (1 - p)})`;
    case 'left':
      return `scale(${1 + amt}) translateX(${(0.5 - p) * amt * 100}%)`;
    case 'right':
      return `scale(${1 + amt}) translateX(${(p - 0.5) * amt * 100}%)`;
    case 'up':
      return `scale(${1 + amt}) translateY(${(0.5 - p) * amt * 100}%)`;
    default:
      return 'none';
  }
};

// 实拍照片：铺满容器 + 5–8% 缓推/缓拉，避免静止 PPT 感
export const Photo: React.FC<{
  src: string;
  move?: Move;
  amt?: number;
  pos?: string;
  style?: React.CSSProperties;
  filter?: string;
}> = ({src, move = 'in', amt = 0.07, pos = 'center', style, filter}) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const p = frame / Math.max(1, durationInFrames);
  return (
    <AbsoluteFill style={{overflow: 'hidden', ...style}}>
      <Img
        src={staticFile(src)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: pos,
          transform: kb(move, p, amt),
          filter,
        }}
      />
    </AbsoluteFill>
  );
};

export const Clip: React.FC<{
  src: string;
  from?: number; // 源视频入点（秒）
  move?: Move;
  amt?: number;
  pos?: string;
  rate?: number;
  style?: React.CSSProperties;
  filter?: string;
}> = ({src, from = 0, move = 'in', amt = 0.05, pos = 'center', rate = 1, style, filter}) => {
  const frame = useCurrentFrame();
  const {durationInFrames, fps} = useVideoConfig();
  const p = frame / Math.max(1, durationInFrames);
  return (
    <AbsoluteFill style={{overflow: 'hidden', ...style}}>
      <OffthreadVideo
        src={staticFile(src)}
        startFrom={Math.round(from * fps)}
        playbackRate={rate}
        muted
        style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: kb(move, p, amt), filter}}
      />
    </AbsoluteFill>
  );
};

// 蒸汽：黑底烟雾素材用 screen 叠加，只留下白色蒸汽
export const Steam: React.FC<{opacity?: number; from?: number}> = ({opacity = 0.75, from = 1}) => (
  <AbsoluteFill style={{mixBlendMode: 'screen', opacity}}>
    <Clip src="crab/broll/mx_32101.mp4" from={from} move="up" amt={0.08} />
  </AbsoluteFill>
);
