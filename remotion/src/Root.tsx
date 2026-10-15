// 镜头库预览入口：每个镜头一个 Composition，npm run studio 打开后在左侧列表里挑着看
import React from 'react';
import {Composition, registerRoot, staticFile} from 'remotion';
import {AvatarOutro} from './library/AvatarOutro';
import {DriftPattern} from './library/DriftPattern';
import {StoreInFridge} from './library/StoreInFridge';
import {TocList} from './library/TocList';
import {SummaryCards} from './library/SummaryCards';

const HD = {width: 1920, height: 1080, fps: 30};

const Root: React.FC = () => (
  <>
    <Composition id="SH-013-AvatarOutro" component={() => <AvatarOutro avatar={staticFile('brand/xiaoyun_avatar.png')} title="我是小云" line="陪你一起恢复健康" bye="我们下期见" byeAt={2.5} />} {...HD} durationInFrames={160} />
    <Composition id="SH-014-DriftPattern" component={() => <DriftPattern icon={<div style={{fontSize: 90}}>🦀</div>} />} {...HD} durationInFrames={120} />
    <Composition id="SH-015-StoreInFridge" component={() => <StoreInFridge food={<div style={{width: 200, height: 140, borderRadius: 60, background: '#F2735A', border: '4px solid #1F1B18'}} />} />} {...HD} durationInFrames={125} />
    <Composition id="SH-016-TocList" component={() => <TocList items={[{text: '说成指责', at: 1.6}, {text: '担心不同', at: 2.2}, {text: '谁来做', at: 2.8}]} />} {...HD} durationInFrames={120} />
    <Composition id="SH-017-SummaryCards" component={() => <SummaryCards cards={[{icon: <div style={{fontSize: 80}}>📖</div>, label: '建议合适', color: '#A8E0B8', at: 1.0}, {icon: <div style={{fontSize: 80}}>🥄</div>, label: '想改什么', color: '#FBEA7E', at: 2.0}]} />} {...HD} durationInFrames={120} />
  </>
);

registerRoot(Root);
