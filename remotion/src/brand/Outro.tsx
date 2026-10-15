import React from 'react';
import {AbsoluteFill, Img, staticFile, useVideoConfig} from 'remotion';
import {COLORS, FONTS, VIDEO} from './tokens';
import {ease, usePop, useSec} from './base';

// 小云结尾卡（固定模板，复刻「熬夜喝咖啡」结尾）
// 从口播「我是小云」到片尾是一个镜头：整体缓慢推近；头像 → 外圈 → 我是小云 → 小字依次出现，
// 说到「我们下期见」时再浮出一行小字。
export const Outro: React.FC<{line?: string; byeAt?: number; bye?: string}> = ({line = '陪你一起恢复健康', byeAt = 2.5, bye = '我们下期见'}) => {
  const t = useSec();
  const {durationInFrames, fps} = useVideoConfig();
  const push = 1 + 0.08 * Math.min(1, t / (durationInFrames / fps));
  const byeIn = ease(t, byeAt, byeAt + 0.35);
  const av = usePop(0.05, 14);
  const ring = ease(t, 0.2, 1.4);
  const title = usePop(0.45, 14);
  const sub = ease(t, 0.8, 1.2);
  const cx = VIDEO.width / 2;
  return (
    <AbsoluteFill
      style={{
        background: 'radial-gradient(ellipse at 50% 42%, #DCCBA6 0%, #D1BF98 45%, #C6B086 100%)',
        opacity: ease(t, 0, 0.25),
      }}
    >
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 45%'}}>
      {/* 外圈 */}
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: 330,
          width: 460,
          height: 460,
          borderRadius: '50%',
          border: `6px solid rgba(122,82,54,${0.55 * (1 - ring * 0.6)})`,
          transform: `translate(-50%,-50%) scale(${0.7 + ring * 0.35})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: cx,
          top: 330,
          width: 300,
          height: 300,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '8px solid #fff',
          boxShadow: '0 14px 36px rgba(90,60,30,0.28)',
          transform: `translate(-50%,-50%) scale(${av})`,
        }}
      >
        <Img src={staticFile('brand/xiaoyun_avatar.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: VIDEO.width,
          top: 560,
          textAlign: 'center',
          fontFamily: FONTS.sansBlack,
          fontSize: 116,
          color: COLORS.ink,
          letterSpacing: 6,
          transform: `scale(${title})`,
        }}
      >
        我是小云
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: VIDEO.width,
          top: 724,
          textAlign: 'center',
          fontFamily: FONTS.sansMedium,
          fontSize: 46,
          color: '#3E3128',
          letterSpacing: 4,
          opacity: sub,
          transform: `translateY(${(1 - sub) * 16}px)`,
        }}
      >
        {line}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: VIDEO.width,
          top: 800,
          textAlign: 'center',
          fontFamily: FONTS.sans,
          fontSize: 32,
          color: '#8A5A2B',
          letterSpacing: 6,
          opacity: byeIn,
          transform: `translateY(${(1 - byeIn) * 12}px)`,
        }}
      >
        {bye}
      </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
