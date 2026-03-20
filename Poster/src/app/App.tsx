import React from 'react';
import { Settings, BarChart2, Cpu } from 'lucide-react';

// 切换主题：
// 1 = 原始版本 (浅灰系 + 蓝黄双光晕，就是最开始的样子)
// 2 = 高对比极简版本 (你刚才提的要求：纯白底 + 深空灰字 + 亮橙色强调)
// 3 = 【我独立构思的版本】深色科技/深海赛博版 (极暗夜色底 + 荧光紫/青双色霓虹光晕 + 亮青点缀，适合高智能探路车)
// 4 = 【最新版】极致纯净大疆/苹果风 (微磨砂 + 极简纯白底 + 珍珠质感微蓝/微粉光晕 + 科技蓝强调)
// 5 = 【新增】原图同款配色优化版 (深邃青蓝底 + 亮青色点缀 + 优化后的质感暗色玻璃卡片)
// 6 = 【新增】原图配色的浅色版 (清透白底 + 冰蓝色高光 + 透亮白玻璃质感卡片)
const THEME_VARIANT = 6;

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
      pageBg: 'bg-[#e2e8f0]', // 更深的底，衬托出海报
      posterBg: 'bg-[#f1f5f9]', // 稍微带点冷灰调，不再刺眼
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
      panelBase: 'bg-white/60 border-white/80 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-lg',
      panelBase_line: 'bg-white/30 border-white/0 shadow-[0_8px_32px_rgba(15,23,42,0.06)] backdrop-blur-lg',
      panelInner: 'bg-gradient-to-br from-white/90 to-white/40 border-white/60',
      panelInner_line: 'bg-gradient-to-br from-white/90 to-white/40 border-white/60',
      panelText: 'text-slate-600',
      trailStroke: '#7dd3fc',
      trailGlow: 'rgba(125,211,252,0.18)',
      trailDash: 'rgba(148,163,184,0.18)'
    }
  };

  const theme = THEMES[THEME_VARIANT];
  const trailPath =
    'M-48 200'+ 
    'C62 150, 150 160, 232 176'+ 
    'S360 214, 390 270'+ 
    'S480 346, 465 468'+ 
    'S438 690, 675 900';

  return (
    <div className={`min-h-screen ${theme.pageBg} flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden`}>
      {/* Poster Container */}
      <div className={`relative w-full max-w-[640px] aspect-[594/841] ${theme.posterBg} shadow-[0_32px_80px_rgba(0,0,0,0.15)] overflow-hidden ring-1 ${theme.posterRing} ${theme.posterText} rounded-sm`}>
        
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

        {/* 2.5 Line-Following Task Path */}
        <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
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
            </defs>

            <path
              d={trailPath}
              stroke={theme.trailDash || 'rgba(148,163,184,0.18)'}
              strokeWidth="2"
              strokeDasharray="10 12"
              strokeLinecap="round"
            />
            <path
              d={trailPath}
              stroke={theme.trailGlow || 'rgba(125,211,252,0.18)'}
              strokeWidth="32"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#path-glow)"
            />
            <path
              d={trailPath}
              stroke={theme.trailStroke || '#7dd3fc'}
              strokeWidth="24"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* 3. Defocused Frosted Glass UI Panels */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {/* Panel 1: Top Right */}
          {/* 旧的代码面板已注释
          <div className={`absolute top-[14%] right-[6%] w-48 h-56 ${theme.panelBase || 'bg-gradient-to-br from-white/70 to-white/20 border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'} backdrop-blur-md border rounded-2xl blur-[1px] p-4 flex flex-col gap-3 transform rotate-3`}>
  <div className="flex items-center justify-between px-1">
    <div className="flex gap-2 items-center">
      <Settings className={`w-3 h-3 ${theme.panelText || 'text-slate-400'}`} />
      <div className={`w-12 h-1.5 ${theme.lineStrong} rounded-full`} />
    </div>
    <div className={`w-2 h-2 ${theme.accentBg} rounded-full ${theme.accentShadow}`} />
  </div>

  <div className={`w-full flex-1 ${theme.panelInner || 'bg-gradient-to-br from-slate-100/50 to-transparent border-white/60'} rounded-xl border mt-1 p-3 overflow-hidden`}>
    <div className="flex gap-1.5 mb-2 opacity-60">
      <div className="w-2 h-2 rounded-full bg-slate-300" />
      <div className="w-2 h-2 rounded-full bg-slate-300" />
      <div className="w-2 h-2 rounded-full bg-slate-300" />
    </div>
    <pre className={`text-[9px] leading-[1.35] font-mono whitespace-pre-wrap ${theme.panelText || 'text-slate-300'} select-none`}>
{\`#include <opencv2/opencv.hpp>

int main() {
  cv::Mat img = cv::imread("input.jpg");
  cv::GaussianBlur(img, img, cv::Size(9, 9), 0);
  cv::imshow("demo", img);
  cv::waitKey(0);
}\`}</pre>
  </div>

  <div className={`w-4/5 h-1.5 ${theme.lineStrong} rounded-full mt-1`} />
  <div className={`w-1/2 h-1.5 ${theme.lineStrong} rounded-full`} />
</div>
          */}

          {/* 新的 ROI HUD 视窗面板 */}
          <div className={`absolute top-[12%] right-[8%] w-64 h-72 ${theme.panelBase_line || 'bg-gradient-to-br from-white/60 to-white/10 border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.04)]'} backdrop-blur-md border border-white/40 rounded-2xl p-4 flex flex-col transform rotate-2 pointer-events-auto`}>
            {/* Header: ROI Camera/Algorithm Info */}
            <div className="flex items-center justify-between px-1 mb-3">
              <div className="flex items-center gap-2">
                 <div className={`w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]`} />
                 <span className="text-[10px] font-mono text-slate-500 tracking-wider">ROI_TRACKING_ACTIVE</span>
              </div>
              <Settings className="w-3.5 h-3.5 text-slate-400" />
            </div>

            {/* Main Visualizer Window */}
            <div className={`relative w-full flex-1 ${theme.panelInner_line || 'bg-slate-900/5 border-slate-900/10'} rounded-xl border overflow-hidden`}>
               {/* 模拟的四角对焦框 (Focus Brackets) */}
               <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-slate-400 opacity-70"></div>
               <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-slate-400 opacity-70"></div>
               <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-slate-400 opacity-70"></div>
               <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-slate-400 opacity-70"></div>

               {/* 十字准星与中心原点 */}
               <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-slate-300/40 border-dashed border-t border-slate-400/30"></div>
               <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-300/40 border-dashed border-l border-slate-400/30"></div>
               <div className="absolute top-1/2 left-1/2 w-2 h-2 -ml-1 -mt-1 rounded-full border border-blue-500/80"></div>

               {/* 核心视觉元素：拟合出的绿色数学直线, 模拟 cv::fitLine 结果 */}
               {/* 角度约需要和背景光带曲线那一块的切线一致 */}
               <div className="absolute w-[150%] h-[2px] bg-green-500 shadow-[0_0_10px_#22c55e] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-35deg]">
                 {/* 直线上的采样点集 (Points) */}
                 <div className="absolute left-[30%] -top-1 w-1.5 h-1.5 bg-white border border-green-600 rounded-full"></div>
                 <div className="absolute left-[45%] top-[2px] w-1 h-1 bg-green-400 rounded-full"></div>
                 <div className="absolute left-[52%] -top-[3px] w-1.5 h-1.5 bg-white border border-green-600 rounded-full"></div>
                 <div className="absolute left-[65%] top-[1px] w-1 h-1 bg-green-400 rounded-full"></div>
                 <div className="absolute left-[78%] -top-[1.5px] w-1.5 h-1.5 bg-white border border-green-600 rounded-full"></div>
               </div>

               {/* 法向量指出 tilt/error (绿色直线垂线) */}
               <div className="absolute left-1/2 top-1/2 w-[40px] h-[1px] bg-red-400/80 shadow-[0_0_5px_#f87171] transform origin-left rotate-[55deg]">
                 {/* 法向量终点 */}
                 <div className="absolute right-0 -top-1 w-0 h-0 border-t-[3px] border-b-[3px] border-l-[5px] border-transparent border-l-red-400"></div>
               </div>
               {/* 注释法向量含义 */}
               <span className="absolute top-[60%] left-[55%] text-[8px] font-mono text-red-500 pointer-events-none">normError</span>
            </div>

            {/* C++ Variables Readout HUD */}
            <div className="mt-3 flex flex-col gap-1.5 bg-white/65 p-2 rounded-lg border border-white/50 backdrop-blur-md">
               <div className="flex justify-between items-center text-[9px] font-mono font-medium text-slate-600">
                 <span>cv::fitLine([dist=L2])</span>
                 <span className="text-blue-500">vy: 0.819, vx:-0.573</span>
               </div>
               <div className="flex justify-between items-center text-[9px] font-mono font-medium text-slate-600">
                 <span>emaTilt.deg</span>
                 <span className="text-amber-600 font-bold">-35.15°</span>
               </div>
               <div className="flex justify-between items-center text-[9px] font-mono font-medium text-slate-600">
                 <span>expoPower</span>
                 <span className="text-green-600">0.82 * P_MAX</span>
               </div>
            </div>
          </div>

          {/* Panel 2: Bottom Left */}
          <div className={`absolute bottom-[20%] left-[5%] w-56 h-36 ${theme.panelBase || 'bg-gradient-to-tr from-white/80 to-white/30 border-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.05)]'} backdrop-blur-lg border rounded-2xl blur-[2.5px] p-4 flex flex-col gap-4 transform -rotate-2`}>
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
          <div className={`absolute top-[42%] -left-8 w-32 h-44 ${theme.panelBase || 'bg-white/40 border-white/60 shadow-sm'} backdrop-blur-sm border rounded-3xl blur-[3.5px] p-3 flex flex-col gap-2 transform -rotate-6`}>
            <div className={`w-full h-1/2 ${theme.panelInner || 'bg-white/50 border-white/60'} rounded-xl border`} />
            <div className={`w-full h-1.5 ${theme.lineSoft} rounded-full mt-2`} />
            <div className={`w-5/6 h-1.5 ${theme.lineSoft} rounded-full`} />
            <div className={`w-3/4 h-1.5 ${theme.lineSoft} rounded-full`} />
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

          {/* Center Product Display Marker (Subtle) */}
          <div className="flex-1 w-full flex items-center justify-center relative my-8">
             <div className="relative w-[80%] max-w-[320px] aspect-square flex items-center justify-center opacity-[0.25]">
                {/* Crosshairs */}
                <div className={`absolute top-0 left-0 w-4 h-[1px] ${theme.marker}`} />
                <div className={`absolute top-0 left-0 w-[1px] h-4 ${theme.marker}`} />

                <div className={`absolute top-0 right-0 w-4 h-[1px] ${theme.marker}`} />
                <div className={`absolute top-0 right-0 w-[1px] h-4 ${theme.marker}`} />

                <div className={`absolute bottom-0 left-0 w-4 h-[1px] ${theme.marker}`} />
                <div className={`absolute bottom-0 left-0 w-[1px] h-4 ${theme.marker}`} />

                <div className={`absolute bottom-0 right-0 w-4 h-[1px] ${theme.marker}`} />
                <div className={`absolute bottom-0 right-0 w-[1px] h-4 ${theme.marker}`} />
                
                <span className={`text-[10px] tracking-[0.3em] font-medium ${theme.muted} uppercase text-center max-w-[150px] leading-relaxed`}>
                  Vehicle Placement Area
                </span>
             </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-3 gap-4 items-end border-t-[1.5px] ${theme.linedivider} pt-6">
            <div className="col-span-1">
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
            <div className="col-span-1">
              <p className={`text-[9px] sm:text-[10px] font-bold tracking-[0.2em] ${theme.mutedStrong} uppercase mb-2`}>
                
              </p>
              <p className={`text-[10px] sm:text-xs ${theme.muted} leading-relaxed font-medium`}>

              </p>
            </div>
            <div className="col-span-1 flex justify-end pb-1">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full border-[1.5px] ${theme.panelInner ? 'border-transparent bg-[#1e293b]/50' : 'border-slate-200 bg-white/50'} flex items-center justify-center backdrop-blur-sm shadow-sm`}>
                <div className={`w-3 h-3 ${theme.accentBg} rounded-full ${theme.accentShadow}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Side Text */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-center pointer-events-none z-20 opacity-60">
          <p className={`text-[8px] sm:text-[10px] font-bold tracking-[0.4em] ${theme.mutedSoft} uppercase whitespace-nowrap`}>
            Next Generation Autonomous Systems
          </p>
        </div>
      </div>
    </div>
  );
}
