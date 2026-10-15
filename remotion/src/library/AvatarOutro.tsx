// 头像结尾卡（镜头库 SH-013）· 独立组件：只依赖 react + remotion
// 用法：<AvatarOutro avatar={staticFile('avatar.png')} title="我是XX" line="一句话介绍" bye="我们下期见" byeAt={2.5} />
// 画布 1920×1080，30fps，建议时长 5 秒（从说出名字到片尾，一个镜头）
import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  avatar: string; // 头像图片地址
  title?: string; // 大字，例如「我是小云」
  line?: string; // 第二行小字
  bye?: string; // 结束语，byeAt 秒时浮出
  byeAt?: number;
  bg?: string; // 背景
  ink?: string; // 文字颜色
  font?: string; // 字体
};

export const AvatarOutro: React.FC<Props> = ({
  avatar,
  title = '我是XX',
  line = '一句话介绍自己',
  bye = '我们下期见',
  byeAt = 2.5,
  bg = 'radial-gradient(ellipse at 50% 42%, #DCCBA6 0%, #D1BF98 45%, #C6B086 100%)',
  ink = '#2B2420',
  font = '"Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif',
}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames, width} = useVideoConfig();
  const t = frame / fps;
  const ease = (a: number, b: number) =>
    interpolate(t, [a, b], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.bezier(0.33, 0, 0.2, 1)});
  const pop = (d: number) => spring({frame: frame - d * fps, fps, config: {damping: 14, stiffness: 160, mass: 0.7}});
  const push = 1 + 0.08 * (frame / durationInFrames); // 整个镜头缓慢推近 1 → 1.08
  const ring = ease(0.2, 1.4);
  const sub = ease(0.8, 1.2);
  const byeIn = ease(byeAt, byeAt + 0.35);
  const cx = width / 2;
  return (
    <AbsoluteFill style={{background: bg, opacity: ease(0, 0.25), fontFamily: font}}>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 45%'}}>
        <div style={{position: 'absolute', left: cx, top: 330, width: 460, height: 460, borderRadius: '50%', border: `6px solid rgba(122,82,54,${0.55 * (1 - ring * 0.6)})`, transform: `translate(-50%,-50%) scale(${0.7 + ring * 0.35})`}} />
        <div style={{position: 'absolute', left: cx, top: 330, width: 300, height: 300, borderRadius: '50%', overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 14px 36px rgba(90,60,30,0.28)', transform: `translate(-50%,-50%) scale(${pop(0.05)})`}}>
          <Img src={avatar} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
        </div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontSize: 116, fontWeight: 900, color: ink, letterSpacing: 6, transform: `scale(${pop(0.45)})`}}>{title}</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 724, textAlign: 'center', fontSize: 46, fontWeight: 500, color: ink, opacity: sub, letterSpacing: 4, transform: `translateY(${(1 - sub) * 16}px)`}}>{line}</div>
        <div style={{position: 'absolute', left: 0, right: 0, top: 800, textAlign: 'center', fontSize: 32, fontWeight: 700, color: '#8A5A2B', opacity: byeIn, letterSpacing: 6, transform: `translateY(${(1 - byeIn) * 12}px)`}}>{bye}</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
