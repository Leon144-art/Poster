import React from 'react';
import { Settings, Cpu } from 'lucide-react';
import vehicleImage from '../assets/test3.png';

// 切换主题：
// 1 = 原始版本 (浅灰系 + 蓝黄双光晕，就是最开始的样子)
// 2 = 高对比极简版本 (你刚才提的要求：纯白底 + 深空灰字 + 亮橙色强调)
// 3 = 【我独立构思的版本】深色科技/深海赛博版 (极暗夜色底 + 荧光紫/青双色霓虹光晕 + 亮青点缀，适合高智能探路车)
// 4 = 【最新版】极致纯净大疆/苹果风 (微磨砂 + 极简纯白底 + 珍珠质感微蓝/微粉光晕 + 科技蓝强调)
// 5 = 【新增】原图同款配色优化版 (深邃青蓝底 + 亮青色点缀 + 优化后的质感暗色玻璃卡片)
// 6 = 【新增】原图配色的浅色版 (清透白底 + 冰蓝色高光 + 透亮白玻璃质感卡片)
const THEME_VARIANT = 6;

// 切换轨迹 / ROI 视图：
// 1 = 当前版本：中段下探后向右下延展
// 2 = 更平缓的 S 型路线
// 3 = 更激进的斜切路线
// 4 = 右下起步，先垂直上行，再圆角转为水平左移 (已优化直角平滑弧度并修复坐标)
const TRAIL_VARIANT = 4;
const SHOW_TRAIL_ARROWS = true;
const SHOW_VEHICLE_IMAGE = true;
const SHOW_NIGHWAN_BLUR = false;

export default function App() {
  const THEMES: Record<number, any> = {
    1: {
      pageBg: 'bg-neutral-200',
      posterBg: 'bg-zinc-50',
      posterRing: 'ring-neutral-300',
      posterText: 'text-slate-800',
      gridOpacity: 'opacity-[0.35]',
      gridPattern: 'bg-[linear-gradient(to_right,#d4d4d8_1px,transparent_1px),linear-gradient(to_bottom,#d4d4d8_1px,transparent_1px)]',
      glowWarm: 'bg-amber-200/40',
      glowCool: 'bg-sky-300/40',
      glowAmbient: 'bg-blue-300/30',
      title: 'text-slate-900',
      accent: 'text-blue-500',
      accentBg: 'bg-blue-500',
      accentBgSoft: 'bg-blue-400/10',
      accentBgSofter: 'bg-blue-500/10',
      accentBorder: 'border-blue-200/50',
      accentShadow: 'shadow-[0_0_12px_rgba(59,130,246,0.6)]',
      mutedStrong: 'text-slate-800',
      mutedStrongBg: 'bg-slate-800',
      muted: 'text-slate-500',
      mutedSoft: 'text-slate-400',
      lineStrong: 'bg-slate-300/80',
      lineSoft: 'bg-slate-200/90',
      marker: 'bg-slate-600',
    },
    2: {
      pageBg: 'bg-[#F5F5F7]',
      posterBg: 'bg-[#FFFFFF]',
      posterRing: 'ring-[rgba(0,0,0,0.10)]',
      posterText: 'text-[#334155]',
      gridOpacity: 'opacity-[0.85]',
      gridPattern: 'bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]',
      glowWarm: 'bg-[rgba(255,102,0,0.14)]',
      glowCool: 'bg-[rgba(0,208,132,0.10)]',
      glowAmbient: 'bg-[rgba(0,208,132,0.07)]',
      title: 'text-[#1D1D1F]',
      accent: 'text-[#FF6600]',
      accentBg: 'bg-[#FF6600]',
      accentBgSoft: 'bg-[#FF6600]/10',
      accentBgSofter: 'bg-[#FF6600]/06',
      accentBorder: 'border-[#FF6600]/20',
      accentShadow: 'shadow-[0_0_12px_rgba(255,102,0,0.42)]',
      mutedStrong: 'text-slate-800',
      mutedStrongBg: 'bg-slate-800',
      muted: 'text-slate-500',
      mutedSoft: 'text-slate-400',
      lineStrong: 'bg-slate-300/80',
      lineSoft: 'bg-slate-200/90',
      marker: 'bg-slate-600',
    },
    3: {
      pageBg: 'bg-[#0a0d14]',
      posterBg: 'bg-[#12151e]',
      posterRing: 'ring-[#262a35]',
      posterText: 'text-[#a3aaba]',
      gridOpacity: 'opacity-[0.06]',
      gridPattern: 'bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]',
      glowWarm: 'bg-[#a855f7]/25', // 左上角神秘霓虹紫
      glowCool: 'bg-[#06b6d4]/15', // 右上角深邃青
      glowAmbient: 'bg-[#3b82f6]/10', // 底部深蓝微光
      title: 'text-[#f8fafc]',
      accent: 'text-[#00ffff]', // 亮青色点缀
      accentBg: 'bg-[#00ffff]',
      accentBgSoft: 'bg-[#00ffff]/10',
      accentBgSofter: 'bg-[#00ffff]/5',
      accentBorder: 'border-[#00ffff]/20',
      accentShadow: 'shadow-[0_0_15px_rgba(0,255,255,0.4)]',
      mutedStrong: 'text-[#e2e8f0]', // 白色或极亮灰
      mutedStrongBg: 'bg-[#64748b]',
      muted: 'text-[#94a3b8]',
      mutedSoft: 'text-[#475569]',
      lineStrong: 'bg-[#334155]',
      lineSoft: 'bg-[#1e293b]',
      marker: 'bg-[#475569]',
    },
    4: {
      pageBg: 'bg-[#f5f5f7]', // Apple产品页经典外灰底色
      posterBg: 'bg-[#ffffff]', // 极致纯白内底
      posterRing: 'ring-black/[0.04]', // 极弱边框，去线化
      posterText: 'text-[#1d1d1f]', // Apple纯正深空灰，不瞎眼黑
      gridOpacity: 'opacity-[0.4]', // 存在感极微弱的透气网格
      gridPattern: 'bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)]',
      glowWarm: 'bg-amber-200/50', // 左上：稍微加浓的樱花粉，透出更多血色感
      glowCool: 'bg-[#bae6fd]/60', // 右上：加浓的冰蓝色 (Sky-200 级别)
      glowAmbient: 'bg-[#e2e8f0]/70', // 底部：稍微加深一点点的银灰底光，增加整体质感厚度
      title: 'text-[#1d1d1f]',
      accent: 'text-[#0066cc]', // Accent：经典的“科技苹果蓝”
      accentBg: 'bg-[#0066cc]',
      accentBgSoft: 'bg-[#0066cc]/10',
      accentBgSofter: 'bg-[#0066cc]/5',
      accentBorder: 'border-[#0066cc]/15',
      accentShadow: 'shadow-[0_0_16px_rgba(0,102,204,0.25)]',
      mutedStrong: 'text-[#424245]', 
      mutedStrongBg: 'bg-[#86868b]', // 精密仪表感灰色
      muted: 'text-[#86868b]', // 经典次级文字灰
      mutedSoft: 'text-[#a1a1a6]',
      lineStrong: 'bg-[#d2d2d7]', // Apple UI组件分隔线
      lineSoft: 'bg-[#e5e5ea]',
      marker: 'bg-[#c7c7cc]',
    },
    5: {
      pageBg: 'bg-[#060810]',
      posterBg: 'bg-[#0f1725]', // 原图深沉底色
      posterRing: 'ring-cyan-900/40',
      posterText: 'text-[#94a3b8]',
      gridOpacity: 'opacity-[0.06]',
      gridPattern: 'bg-[linear-gradient(to_right,#06b6d4_1px,transparent_1px),linear-gradient(to_bottom,#06b6d4_1px,transparent_1px)]',
      glowWarm: 'bg-[#06b6d4]/15', // 左上亮青辉光
      glowCool: 'bg-[#3b82f6]/10', // 右上深蓝柔光
      glowAmbient: 'bg-[#0891b2]/10',
      title: 'text-[#f8fafc]',
      accent: 'text-[#06b6d4]', // 青色强调点
      accentBg: 'bg-[#06b6d4]',
      accentBgSoft: 'bg-[#06b6d4]/20',
      accentBgSofter: 'bg-[#06b6d4]/10',
      accentBorder: 'border-[#06b6d4]/30',
      accentShadow: 'shadow-[0_0_20px_rgba(6,182,212,0.6)]',
      mutedStrong: 'text-[#e2e8f0]',
      mutedStrongBg: 'bg-[#475569]',
      muted: 'text-[#94a3b8]',
      mutedSoft: 'text-[#64748b]',
      lineStrong: 'bg-[#334155]',
      lineSoft: 'bg-[#1e293b]',
      marker: 'bg-[#475569]',
      // 优化后的玻璃质感卡片参数
      panelBase: 'bg-[#162133]/90 border-[#334155]/60 shadow-[0_12px_40px_rgba(0,0,0,0.5)]',
      panelInner: 'bg-[#1e293b]/50 border-[#475569]/40',
      panelText: 'text-slate-300'
    },
    6: {
      pageBg: 'bg-[#e2e8f0]', // 更深的底，衬托出海报 #e2e8f0
      posterBg: 'bg-[#eff3f7]', // 稍微带点冷灰调，不再刺眼 #f1f5f9 #caced1 #eff3f7
      posterRing: 'ring-slate-300',
      posterText: 'text-slate-700', // 柔和深灰
      gridOpacity: 'opacity-[0.25]', // 让网格稍微明显一点点增加细节
      gridPattern: 'bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)]',
      glowWarm: 'bg-[#38bdf8]/15', // 柔和的浅海蓝光晕
      glowCool: 'bg-[#818cf8]/10', // 柔和浅青光晕
      glowAmbient: 'bg-[#cbd5e1]/30', // 环境底灰光
      title: 'text-[#1e293b]', // 不那么黑的极深蓝灰
      accent: 'text-[#0ea5e9]', // 明亮而不刺眼的蓝青色点缀
      accentBg: 'bg-[#0ea5e9]',
      accentBgSoft: 'bg-[#0ea5e9]/15',
      accentBgSofter: 'bg-[#0ea5e9]/5',
      accentBorder: 'border-[#0ea5e9]/30',
      accentShadow: 'shadow-[0_0_15px_rgba(14,165,233,0.3)]',
      mutedStrong: 'text-slate-600',
      mutedStrongBg: 'bg-slate-400',
      muted: 'text-slate-500',
      mutedSoft: 'text-slate-400',
      lineStrong: 'bg-slate-300',
      lineSoft: 'bg-slate-200',
      // linedivider: 'bg-slate-300/100',
      marker: 'bg-slate-400',
      // 清透白玻璃卡片，边缘采用冷灰光
      panelBase: 'bg-white/70 border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.1)] backdrop-blur-lg',
      panelBase_line: 'bg-white/30 border-white/0 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-sm',
      panelInner: 'bg-gradient-to-br from-white/90 to-white/40 border-white/60',
      panelInner_line: 'bg-gradient-to-br from-white/40 to-white/25 border-white/60 ',
      panelText: 'text-slate-600',
      trailStroke: '#7dd3fc',
      trailGlow: 'rgba(125,211,252,0.18)',
      trailDash: 'rgba(148,163,184,0.18)'
    }
  };

  const theme = THEMES[THEME_VARIANT];
  const TRAILS: Record<number, any> = {
    1: {
      trailPath:
        'M-48 200' +
        'C62 150, 150 160, 232 176' +
        'S360 214, 390 270' +
        'S480 346, 465 468' +
        'S438 690, 675 900',
      lineAngle: 'rotate-[35deg]',
      linePosition: 'left-1/4 top-1/2',
      normalAngle: 'rotate-[55deg]',
      normalPosition: 'left-1/2 top-1/2',
      centerDotBorder: 'border-blue-500/80',
      fitLineColor: 'bg-green-500',
      fitLineGlow: 'shadow-[0_0_10px_#22c55e]',
      fitLinePointMain: 'border-green-600',
      fitLinePointMinor: 'bg-green-400',
      normalLineColor: 'bg-red-400/80',
      normalLineGlow: 'shadow-[0_0_5px_#f87171]',
      normalArrowColor: 'border-l-red-400',
      normalLabelColor: 'text-red-500',
      powerReadoutColor: 'text-green-600',
      dashWidth: 2,
      glowWidth: 32,
      strokeWidth: 24,
      arrowStartOffset: '8%',
      arrowEndOffset: '84%',
      arrowFontSize: 18,
      arrowLetterSpacing: 2,
    },
    2: {
      trailPath:
        'M-60 238' +
        'C30 210, 140 170, 242 188' +
        'S392 252, 402 334' +
        'S394 484, 468 586' +
        'S592 760, 642 860',
      lineAngle: 'rotate-[18deg]',
      linePosition: 'left-[34%] top-[48%]',
      normalAngle: 'rotate-[108deg]',
      normalPosition: 'left-[53%] top-[49%]',
      centerDotBorder: 'border-cyan-500/80',
      fitLineColor: 'bg-emerald-500',
      fitLineGlow: 'shadow-[0_0_10px_#10b981]',
      fitLinePointMain: 'border-emerald-600',
      fitLinePointMinor: 'bg-emerald-400',
      normalLineColor: 'bg-amber-400/80',
      normalLineGlow: 'shadow-[0_0_5px_#fbbf24]',
      normalArrowColor: 'border-l-amber-400',
      normalLabelColor: 'text-amber-500',
      powerReadoutColor: 'text-emerald-600',
      dashWidth: 2,
      glowWidth: 28,
      strokeWidth: 20,
      arrowStartOffset: '8%',
      arrowEndOffset: '84%',
      arrowFontSize: 18,
      arrowLetterSpacing: 2,
    },
    3: {
      trailPath:
        'M-72 132' +
        'C54 126, 154 164, 250 244' +
        'S362 362, 404 438' +
        'S474 548, 560 640' +
        'S664 778, 720 914',
      lineAngle: 'rotate-[52deg]',
      linePosition: 'left-[18%] top-[54%]',
      normalAngle: 'rotate-[142deg]',
      normalPosition: 'left-[47%] top-[50%]',
      centerDotBorder: 'border-sky-500/80',
      fitLineColor: 'bg-lime-500',
      fitLineGlow: 'shadow-[0_0_10px_#84cc16]',
      fitLinePointMain: 'border-lime-600',
      fitLinePointMinor: 'bg-lime-400',
      normalLineColor: 'bg-rose-400/80',
      normalLineGlow: 'shadow-[0_0_5px_#fb7185]',
      normalArrowColor: 'border-l-rose-400',
      normalLabelColor: 'text-rose-500',
      powerReadoutColor: 'text-lime-600',
      dashWidth: 2,
      glowWidth: 34,
      strokeWidth: 26,
      arrowStartOffset: '8%',
      arrowEndOffset: '84%',
      arrowFontSize: 18,
      arrowLetterSpacing: 2,
    },
    4: {
      trailPath:
        'M 460 900 ' +          // 从右下角出发（x=460靠近中心偏右，y=900在屏幕外）
        'L 460 320 ' +          // 笔直向上直到 y=320
        'Q 460 200, 340 200 ' + // 使用二次贝塞尔曲线做90度平滑转角（半径120）
        'L -50 200',            // 水平向左直接穿出画面屏幕 (原左上起点是y=200附近)
      lineAngle: 'rotate-[33deg]', // y = 0.570x + 13.901 对应的图像坐标系角度
      linePosition: '-left-[15%] top-[71%]', // 取 x=250 时的中点，y≈156.4，再按 500 宽基准等比映射
      normalAngle: 'rotate-[119.68deg]', // 与绿线垂直的法向量方向
      normalPosition: 'left-[50%] top-[70%]',
      centerDotBorder: 'border-blue-500/80',
      fitLineColor: 'bg-green-500',
      fitLineGlow: 'shadow-[0_0_10px_#22c55e]',
      fitLinePointMain: 'border-green-600',
      fitLinePointMinor: 'bg-green-400',
      normalLineColor: 'bg-red-400/80',
      normalLineGlow: 'shadow-[0_0_5px_#f87171]',
      normalArrowColor: 'border-l-red-400',
      normalLabelColor: 'text-red-500',
      powerReadoutColor: 'text-green-600',
      // 取消原本单独覆盖的 trail 相关配置，让它回退/共享原主题或1的一致效果
      dashWidth: 2,
      glowWidth: 26,
      strokeWidth: 27,
      arrowStartOffset: '35%',
      arrowEndOffset: '88%',
      arrowFontSize: 23,
      arrowLetterSpacing: 4,
    },
  };
  const trail = TRAILS[TRAIL_VARIANT] || TRAILS[1];
  const trailPath = trail.trailPath;
  const trailGuideRef = React.useRef<SVGPathElement | null>(null);
  const [trailArrowTransforms, setTrailArrowTransforms] = React.useState<{ start: string[]; end: string[] }>({
    start: [],
    end: [],
  });

  React.useLayoutEffect(() => {
    if (!SHOW_TRAIL_ARROWS || !trailGuideRef.current) {
      setTrailArrowTransforms({ start: [], end: [] });
      return;
    }

    const path = trailGuideRef.current;
    const totalLength = path.getTotalLength();
    const arrowSize = trail.arrowFontSize || 18;
    const arrowGap = (trail.arrowLetterSpacing || 8) + arrowSize * 0.75;
    const scale = arrowSize / 1024;

    const parseOffset = (offset: string | number | undefined, fallbackRatio: number) => {
      if (typeof offset === 'number') return Math.max(0, Math.min(totalLength, offset));
      if (typeof offset === 'string' && offset.trim().endsWith('%')) {
        const ratio = Number.parseFloat(offset);
        if (Number.isFinite(ratio)) {
          return (Math.max(0, Math.min(100, ratio)) / 100) * totalLength;
        }
      }
      return fallbackRatio * totalLength;
    };

    const buildTransforms = (baseLength: number) => {
      return [0, 1, 2].map((index) => {
        const currentLength = Math.max(0, Math.min(totalLength, baseLength + index * arrowGap));
        const sampleAhead = Math.min(totalLength, currentLength + 1);
        const sampleBehind = Math.max(0, currentLength - 1);
        const point = path.getPointAtLength(currentLength);
        const ahead = path.getPointAtLength(sampleAhead);
        const behind = path.getPointAtLength(sampleBehind);
        const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

        return `translate(${point.x} ${point.y}) rotate(${angle}) scale(${scale}) translate(-512 -512)`;
      });
    };

    setTrailArrowTransforms({
      start: buildTransforms(parseOffset(trail.arrowStartOffset, 0.08)),
      end: buildTransforms(parseOffset(trail.arrowEndOffset, 0.88)),
    });
  }, [
    trailPath,
    trail.arrowStartOffset,
    trail.arrowEndOffset,
    trail.arrowFontSize,
    trail.arrowLetterSpacing,
  ]);

  return (
    <div className={`min-h-screen ${theme.pageBg} flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden`}>
      {/* Poster Container */}
      <div className={`relative isolate w-full max-w-[640px] aspect-[594/841] ${theme.posterBg} shadow-[0_32px_80px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ${theme.posterRing} ${theme.posterText} rounded-sm`}>
        
        {/* 1. Base Background Grid */}
        <div className={`absolute inset-0 z-0 ${theme.gridOpacity}`}>
          <div className={`w-full h-full ${theme.gridPattern} bg-[size:32px_32px]`} />
        </div>

        {/* 2. Light Leaks & Ambient Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Top-left warm glow */}
          <div className={`absolute -top-[22%] -left-[10%] w-[54%] h-[54%] ${theme.glowWarm} rounded-full filter blur-[100px]`} />
          
          {/* Top-right cool glow */}
          <div className={`absolute -top-[18%] -right-[12%] w-[36%] h-[36%] ${theme.glowCool} rounded-full filter blur-[120px]`} />
          
          {/* Bottom ambient wash */}
          <div className={`absolute -bottom-[24%] left-1/2 -translate-x-1/2 w-[110%] h-[38%] ${theme.glowAmbient} rounded-[100%] filter blur-[140px]`} />
        </div>

        {/* 2.4 Background Decorative Panels (BELOW LINE) */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {/* Panel 2: Bottom Left */}
          <div className={`absolute bottom-[23%] left-[5%] w-56 h-36 ${theme.panelBase || 'bg-gradient-to-tr from-white/80 to-white/30 border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'} backdrop-blur-lg border rounded-2xl blur-[2.5px] p-4 flex flex-col gap-4 transform -rotate-2`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${theme.panelInner || 'bg-gradient-to-tr from-white to-white border-white/90'} border shadow-sm flex items-center justify-center`}>
                 <Cpu className={`w-5 h-5 ${theme.accent}`} />
              </div>
              <div className="flex flex-col gap-2">
                <div className={`w-16 h-1.5 ${theme.lineStrong} rounded-full`} />
                <div className={`w-10 h-1.5 ${theme.lineSoft} rounded-full`} />
              </div>
            </div>
            <div className="flex gap-2 mt-auto h-10">
              <div className={`flex-1 ${theme.panelInner || 'bg-white/60 border-white/70'} rounded-lg border relative overflow-hidden`}>
                 <div className={`absolute left-0 top-0 bottom-0 w-2/3 ${theme.accentBgSoft} border-r ${theme.accentBorder}`} />
              </div>
              <div className={`w-10 ${theme.accentBgSofter} rounded-lg border ${theme.accentBorder}`} />
            </div>
          </div>

          {/* Panel 3: Mid Left (partially clipped) */}
          <div className={`absolute top-[39%] -left-8 w-32 h-44 ${theme.panelBase || 'bg-white/40 border-white/60 shadow-sm'} backdrop-blur-sm border rounded-3xl blur-[3.5px] p-3 flex flex-col gap-2 transform -rotate-6`}>
            <div className={`w-full h-1/2 ${theme.panelInner || 'bg-white/50 border-white/60'} rounded-xl border`} />
            <div className={`w-full h-1.5 ${theme.lineSoft} rounded-full mt-2`} />
            <div className={`w-5/6 h-1.5 ${theme.lineSoft} rounded-full`} />
            <div className={`w-3/4 h-1.5 ${theme.lineSoft} rounded-full`} />
          </div>
        </div>

        {/* 2.5 Line-Following Task Path */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 5 }}>
          <svg 
            viewBox="0 0 594 841"
            className="absolute inset-0 h-full w-full opacity-80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="path-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="28" />
              </filter>
              <g id="trail-arrow-icon" fill="rgba(255,255,255,0.75)">
                <path d="M728.223744 520.22784a42.467328 42.467328 0 0 1-11.393024 20.503552L374.90688 882.65728c-16.662528 16.662528-43.677696 16.662528-60.340224 0s-16.662528-43.677696 0-60.340224L626.449408 510.43328 314.614784 198.598656c-16.662528-16.662528-16.662528-43.677696 0-60.340224 16.661504-16.662528 43.676672-16.662528 60.3392 0L716.879872 480.18432c10.860544 10.860544 14.642176 26.120192 11.343872 40.04352z" />
              </g>
            </defs>

            <path
              d={trailPath}
              stroke={trail.trailDash || theme.trailDash || 'rgba(148,163,184,0.18)'}
              strokeWidth={trail.dashWidth || 2}
              strokeDasharray="10 12"
              strokeLinecap="round"
            />
            <path
              d={trailPath}
              stroke={trail.trailGlow || theme.trailGlow || 'rgba(125,211,252,0.18)'}
              strokeWidth={trail.glowWidth || 32}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#path-glow)"
            />
            <path
              ref={trailGuideRef}
              d={trailPath}
              stroke={trail.trailStroke || theme.trailStroke || '#7dd3fc'}
              strokeWidth={trail.strokeWidth || 24}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {SHOW_TRAIL_ARROWS && (
              <>
                {trailArrowTransforms.start.map((transform, index) => (
                  <use key={`trail-arrow-start-${index}`} href="#trail-arrow-icon" transform={transform} />
                ))}
                {trailArrowTransforms.end.map((transform, index) => (
                  <use key={`trail-arrow-end-${index}`} href="#trail-arrow-icon" transform={transform} />
                ))}
              </>
            )}
          </svg>
        </div>

        {/* 3. Defocused Frosted Glass UI Panels */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
          {/* 新的 ROI HUD 视窗面板 (去框化 AR 全息风格) */}
          <div className="absolute top-[18%] right-[10%] w-56 h-40 pointer-events-none">
            
            {/* 独立的悬浮标签：ALGORITHM (左上角) */}
            <div className="absolute -top-6 -left-4 flex items-center gap-2">
               <div className={`w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]`} />
               <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest uppercase">
                 Algorithm: cv::fitLine
               </span>
            </div>

            {/* 取景框 (暗示边界) */}
            <div className="absolute inset-0">
               {/* 4角折线 */}
               <div className="absolute top-0 left-0 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-slate-400/60" />
               <div className="absolute top-0 right-0 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-slate-400/60" />
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-slate-400/60" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-slate-400/60" />

               {/* 中心十字准星 */}
               <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-400/20 border-dashed border-t border-slate-400/30" />
               <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-400/20 border-dashed border-l border-slate-400/30" />

               {/* 核心视觉元素：拟合出的绿色数学直线, 模拟 cv::fitLine 结果 */}
               <div className={`absolute w-[150%] h-[1.5px] ${trail.fitLineColor} ${trail.fitLineGlow} ${trail.linePosition} ${trail.lineAngle}`}>
                 {/* 重心 (Center of Mass) */}
                 <div className={`absolute left-[50%] -top-[3px] w-2 h-2 bg-white border-2 ${trail.fitLinePointMain} rounded-full shadow-[0_0_6px_#22c55e]`} />
               </div>
            </div>

            {/* 独立的悬浮标签：LATERAL OFFSET & HEADING ANGLE (底部错落) */}
            <div className="absolute -bottom-14 left-0 right-0 flex justify-between items-start">
               {/* Lateral Offset */}
               <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2">
                   <div className="w-[1.5px] h-3 bg-cyan-500/70" />
                   <span className="text-[8px] font-bold text-slate-400 tracking-widest">LATERAL OFFSET</span>
                 </div>
                 <div className="flex items-baseline gap-1 pl-2.5">
                   <span className="text-sm font-mono font-black text-slate-700">+12.5</span>
                   <span className="text-[8px] font-mono text-slate-400">px</span>
                 </div>
                 {/* 极简指示线 */}
                 <div className="w-16 h-[1.5px] bg-slate-200 ml-2.5 mt-0.5 relative">
                   <div className="absolute top-0 left-1/2 w-5 h-[1.5px] bg-cyan-500" />
                 </div>
               </div>

               {/* Heading Angle */}
               <div className="flex flex-col gap-1 items-end mt-4">
                 <div className="flex items-center gap-2">
                   <span className="text-[8px] font-bold text-slate-400 tracking-widest">HEADING ANGLE</span>
                   <div className="w-[1.5px] h-3 bg-amber-500/70" />
                 </div>
                 <div className="flex items-baseline gap-1 pr-2.5">
                   <span className="text-sm font-mono font-black text-slate-700">-15.0</span>
                   <span className="text-[8px] font-mono text-slate-400">°</span>
                 </div>
                 {/* 极简指示线 */}
                 <div className="w-16 h-[1.5px] bg-slate-200 mr-2.5 mt-0.5 relative overflow-hidden">
                   <div className="absolute top-0 right-1/2 w-4 h-[1.5px] bg-amber-500" />
                 </div>
               </div>
            </div>

          </div>
        </div>

        {/* 4. Swiss Typography Layer */}
        <div className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-between pointer-events-none">
          {/* Header */}
          <div className="flex w-full items-start">
            <div className="flex flex-col items-start text-left">
              <h1 className={`text-6xl sm:text-7xl font-black tracking-tighter ${theme.title} leading-[0.85] mb-2  ml-[-8px]`}>
                GROUP5<span className={theme.accent}>.</span>
              </h1>
              <h2 className={`text-xl sm:text-2xl font-semibold tracking-widest ${theme.muted} uppercase mt-1`}>
                NineOne Rover
              </h2>
            </div>
            {/* 中间空白伸展占位符，自动把两边向左右推到绝对对齐 */}
            <div className="flex-1"></div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-[3px] opacity-70 mb-1">
                <div className={`w-[2px] h-7 ${theme.mutedStrongBg}`} />
                <div className={`w-1.5 h-7 ${theme.mutedStrongBg}`} />
                <div className={`w-[1px] h-7 ${theme.mutedStrongBg}`} />
                <div className={`w-[4px] h-7 ${theme.mutedStrongBg}`} />
                <div className={`w-2 h-7 ${theme.mutedStrongBg}`} />
              </div>
              <p className={`text-[10px] font-bold tracking-[0.2em] ${theme.mutedSoft} uppercase`}>
                Proto-04
              </p>
            </div>
          </div>

          {/* Floating System Specifications Text */}
          <div className="absolute left-0 pl-8 sm:pl-10 top-[32%] flex flex-col pointer-events-auto z-30">
            {/* Masked Backdrop Blur Background */}
            <div 
              className="absolute -inset-y-6 left-0 -right-4 z-[-1]"
              style={{
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                background: 'linear-gradient(to right, rgba(148, 163, 184, 0.08), transparent)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
              }}
            />
            
            {/* Content Wrapper with Brackets */}
            <div className="relative flex flex-col gap-2 self-start">
              {/* Top-Left Bracket ⌜ */}
              <div className="absolute -top-3 -left-4 w-3 h-3 border-t-[1.5px] border-l-[1.5px] border-slate-400/80" />
              {/* Bottom-Right Bracket ⌟ */}
              <div className="absolute -bottom-3 -right-4 w-3 h-3 border-b-[1.5px] border-r-[1.5px] border-slate-400/80" />

              <p className={`text-[12px] font-bold tracking-[0.3em] ${theme.mutedStrong} uppercase mb-0 border-b border-slate-400/30 pb-2 inline-block`}>
                System Specifications
              </p>
              <div className="grid grid-cols-[80px_1fr] gap-x-4 gap-y-1.5 text-[11px] sm:text-[12px] font-mono relative">
                <span className={`${theme.mutedSoft} font-semibold`}>SOFTWARE</span>
              <span className={`${theme.mutedStrong}`}>C++ / OpenCV</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>HOST</span>
              <span className={`${theme.mutedStrong}`}>Raspberry Pi</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>VISION</span>
              <span className={`${theme.mutedStrong}`}>Camera Module 3</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>MOTION</span>
              <span className={`${theme.mutedStrong}`}>1-DOF SG90</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>COMMS</span>
              <span className={`${theme.mutedStrong}`}>UART Driver Board</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>CHASSIS</span>
              <span className={`${theme.mutedStrong}`}>4WD Differential</span>
              
              <span className={`${theme.mutedSoft} font-semibold`}>POWER</span>
              <span className={`${theme.mutedStrong}`}>18650 × 2</span>
            </div>
            </div>
          </div>

          {/* Center Product Display Marker (Subtle) */}
          <div className="flex-1 w-full flex items-end justify-end relative my-8 pointer-events-none z-20">
             {SHOW_VEHICLE_IMAGE && (
               <div className="absolute -right-[5.6%] -bottom-[31%] w-[48%] max-w-[400px] flex items-center justify-center">
                  {/* Vehicle Image */}
                  <img 
                    src={vehicleImage} 
                    alt="Nighwan Vehicle" 
                    className="w-full h-auto object-contain drop-shadow-2xl transform rotate-[0.5deg]"
                    style={{ filter: 'drop-shadow(0 25px 25px rgba(0,0,0,0.3))' }}
                  />
               </div>
             )}
          </div>

          {/* Footer */}
          <div className="relative flex justify-between items-end pt-8 z-30">
            <div className="absolute top-[8px] left-[-7px] h-2.5 w-[68%] rounded-full bg-[linear-gradient(to_right,rgba(100,116,139,0.28)_0%,rgba(100,116,139,0.22)_16%,rgba(100,116,139,0.20)_34%,rgba(100,116,139,0.13)_58%,rgba(100,116,139,0.07)_75%,rgba(100,116,139,0.0)_100%)] blur-[2px]" />
            <div className="absolute top-[9px] left-[-5px] h-2 w-[65%] rounded-md bg-[linear-gradient(to_right,rgba(100,116,139,0.44)_0%,rgba(100,116,139,0.36)_10%,rgba(100,116,139,0.26)_24%,rgba(100,116,139,0.20)_44%,rgba(100,116,139,0.03)_68%,rgba(100,116,139,0.00)_100%)] backdrop-blur-md" />
            
            <div className="flex flex-col">
              <p className={`text-[13px] sm:text-[15px] font-bold tracking-[0.2em] ${theme.mutedStrong} uppercase mb-2`}>
                Group Members
              </p>
              <p className={`text-[12px] sm:text-[14px] ${theme.muted} leading-relaxed font-medium`}>
                Luxuan SUN<br />
                Junyang ZHANG<br />
                Zichao MENG<br />
                Zihao ZHAO
              </p>
            </div>

            <div className="flex flex-col items-end text-right pb-1 translate-y-[7px] relative">
              {SHOW_NIGHWAN_BLUR && (
                <div 
                  className="absolute z-[-1] 
                             -top-5 -left-12
                             -right-[40px] -bottom-[40px]
                             sm:-right-[50px] sm:-bottom-[50px]"
                  style={{
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                    background: 'linear-gradient(to top left, rgba(148, 163, 184, 0.13), transparent)',
                    maskImage: 'linear-gradient(to top, black 80%, transparent 100%), linear-gradient(to left, black 80%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to top, black 80%, transparent 100%), linear-gradient(to left, black 80%, transparent 100%)',
                    WebkitMaskComposite: 'source-in',
                    maskComposite: 'intersect'
                  }}
                />
              )}
              <p className={`text-[32px] sm:text-[42px] font-black tracking-[0.15em] ${theme.title} uppercase mb-1 leading-none`}>
                NIGHWAN
              </p>
              <p className={`text-[9px] sm:text-[11px] font-bold tracking-[0.2em] ${theme.accent} uppercase`}>
                Autonomous Vision-Based Ground Vehicle
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
