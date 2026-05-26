"use client";

import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

// --- PHONE SCREENS COMPONENTS ---

const InteractionOneScreen = () => {
  const [animationState, setAnimationState] = useState('idle');

  const handleClick = () => {
    if (animationState !== 'idle') return;
    setAnimationState('animating');
  };

  const handleReset = () => {
    setAnimationState('idle');
  };

  useEffect(() => {
    if (animationState === 'animating') {
      const timer = setTimeout(() => {
        setAnimationState('finished');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
      <style>{`
        @keyframes text-fade-out {
            0% { opacity: 1; }
            100% { opacity: 0; }
        }
        .animate-text-fade-out {
            animation: text-fade-out 0.3s forwards;
        }

        @keyframes smooth-liquid {
            0%, 10% {
                bottom: 3rem;
                width: calc(100% - 3rem);
                height: 60px;
                border-radius: 1rem;
                transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
            }
            25% { 
                bottom: 3rem;
                width: 60px;
                height: 60px;
                border-radius: 1rem;
                transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
            }
            50% { 
                bottom: 50%;
                width: 60px;
                height: 60px;
                border-radius: 1rem;
                transform: translate3d(-50%, 50%, 0) rotate(180deg) scale(1);
            }
            70% { 
                bottom: 50%;
                width: 60px;
                height: 60px;
                border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
                transform: translate3d(-50%, 50%, 0) rotate(360deg) scale(2);
            }
            100% { 
                bottom: 50%;
                width: 60px;
                height: 60px;
                border-radius: 45%;
                transform: translate3d(-50%, 50%, 0) rotate(720deg) scale(40);
            }
        }
        .liquid-transition {
            position: absolute;
            left: 50%;
            background-color: rgb(37 99 235);
            animation: smooth-liquid 3s cubic-bezier(0.65, 0, 0.35, 1) forwards;
            z-index: 40;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
            will-change: transform, width, border-radius, bottom;
            backface-visibility: hidden;
            transform-style: preserve-3d;
        }
      `}</style>

      {!isAnimating && (
        <button
          onClick={handleClick}
          className="w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-lg z-30 relative"
        >
          Click Me
        </button>
      )}

      {isAnimating && (
        <div className="liquid-transition overflow-hidden">
           <span className="text-white font-semibold text-lg animate-text-fade-out whitespace-nowrap">
             Click Me
           </span>
        </div>
      )}

      <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <h1 className="text-3xl font-bold text-white text-center px-4 drop-shadow-md">
           This is the next screen
         </h1>
         <button 
           onClick={handleReset}
           className="text-blue-200 hover:text-white underline underline-offset-4 cursor-pointer font-medium tracking-wide transition-colors"
         >
           Reset
         </button>
      </div>
    </div>
  );
};

const InteractionTwoScreen = () => {
  const [animationState, setAnimationState] = useState('idle');

  const handleClick = () => {
    if (animationState !== 'idle') return;
    setAnimationState('animating');
  };

  const handleReset = () => {
    setAnimationState('idle');
  };

  useEffect(() => {
    if (animationState === 'animating') {
      const timer = setTimeout(() => {
        setAnimationState('finished');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  const stripes = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2];

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
      <style>{`
        @keyframes int2-text-fade {
            0%, 30% { opacity: 1; }
            100% { opacity: 0; }
        }
        .int2-text-fade-out {
            animation: int2-text-fade 0.6s forwards;
        }

        @keyframes stripe-expand-fuse {
            0%, 15% {
                width: calc(100% - 3rem);
                border-radius: 1rem;
                transform: translate3d(-50%, 0, 0) scaleY(1);
            }
            35% {
                width: 100%;
                border-radius: 0;
                transform: translate3d(-50%, 0, 0) scaleY(1);
            }
            60% {
                width: 100%;
                border-radius: 0;
                transform: translate3d(-50%, calc(var(--stripe-offset) * 80px), 0) scaleY(1);
            }
            100% {
                width: 100%;
                border-radius: 0;
                transform: translate3d(-50%, calc(var(--stripe-offset) * 80px), 0) scaleY(1.35);
            }
        }

        .stripe-element {
            position: absolute;
            bottom: 3rem;
            left: 50%;
            height: 65px;
            background-color: rgb(37 99 235);
            animation: stripe-expand-fuse 2.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
            animation-delay: calc(var(--stripe-delay) * 0.06s);
            z-index: calc(40 + var(--stripe-delay));
            display: flex;
            align-items: center;
            justify-content: center;
            backface-visibility: hidden;
            transform-style: preserve-3d;
            will-change: transform, width, border-radius;
        }
      `}</style>

      {!isAnimating && (
        <button
          onClick={handleClick}
          className="w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-lg z-30 relative"
        >
          Click Me
        </button>
      )}

      {isAnimating && stripes.map(offset => (
        <div 
          key={offset} 
          className="stripe-element overflow-hidden"
          style={{ 
            '--stripe-offset': offset,
            '--stripe-delay': Math.abs(offset) 
          }}
        >
          {offset === 0 && (
             <span className="text-white font-semibold text-lg int2-text-fade-out whitespace-nowrap">
               Click Me
             </span>
          )}
        </div>
      ))}

      <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <h1 className="text-3xl font-bold text-white text-center px-4 drop-shadow-md">
           This is the next screen
         </h1>
         <button 
           onClick={handleReset}
           className="text-blue-200 hover:text-white underline underline-offset-4 cursor-pointer font-medium tracking-wide transition-colors"
         >
           Reset
         </button>
      </div>
    </div>
  );
};

const InteractionThreeScreen = () => {
  const [animationState, setAnimationState] = useState('idle'); // 'idle', 'animating', 'finished'

  const handleClick = () => {
    if (animationState !== 'idle') return;
    setAnimationState('animating');
  };

  const handleReset = () => {
    setAnimationState('idle');
  };

  useEffect(() => {
    if (animationState === 'animating') {
      const timer = setTimeout(() => {
        setAnimationState('finished');
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
      <style>{`
        @keyframes int3-text-fade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.8); }
        }
        .int3-text-fade-out {
            animation: int3-text-fade 0.4s forwards;
        }

        @keyframes line-expansion-sequence {
            0% {
                width: calc(100% - 3rem);
                height: 60px;
                bottom: 3rem;
                border-radius: 1rem;
                transform: translate3d(-50%, 0, 0);
            }
            15% {
                width: calc(100% - 3rem);
                height: 60px;
                bottom: 3rem;
                border-radius: 1rem;
                transform: translate3d(-50%, 0, 0);
            }
            40% {
                width: 4px;
                height: 60px;
                bottom: 3rem;
                border-radius: 2px;
                transform: translate3d(-50%, 0, 0);
            }
            70% {
                width: 4px;
                height: 100%;
                bottom: 0;
                border-radius: 0;
                transform: translate3d(-50%, 0, 0);
            }
            100% {
                width: 100%;
                height: 100%;
                bottom: 0;
                border-radius: 0;
                transform: translate3d(-50%, 0, 0);
            }
        }

        .line-transition {
            position: absolute;
            left: 50%;
            background-color: rgb(37 99 235);
            animation: line-expansion-sequence 2.4s cubic-bezier(0.65, 0, 0.35, 1) forwards;
            z-index: 40;
            display: flex;
            align-items: center;
            justify-content: center;
            will-change: transform, width, height, bottom, border-radius;
            backface-visibility: hidden;
            transform-style: preserve-3d;
        }
      `}</style>

      {!isAnimating && (
        <button
          onClick={handleClick}
          className="w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-lg z-30 relative"
        >
          Click Me
        </button>
      )}

      {isAnimating && (
        <div className="line-transition">
           <span className="text-white font-semibold text-lg int3-text-fade-out whitespace-nowrap">
             Click Me
           </span>
        </div>
      )}

      <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
         <h1 className="text-3xl font-bold text-white text-center px-4 drop-shadow-md">
           This is the next screen
         </h1>
         <button 
           onClick={handleReset}
           className="text-blue-200 hover:text-white underline underline-offset-4 cursor-pointer font-medium tracking-wide transition-colors"
         >
           Reset
         </button>
      </div>
    </div>
  );
};

const InteractionFourScreen = () => {
  const [animationState, setAnimationState] = useState('idle');

  const handleClick = () => {
    if (animationState !== 'idle') return;
    setAnimationState('animating');
  };

  const handleReset = () => {
    setAnimationState('idle');
  };

  useEffect(() => {
    if (animationState === 'animating') {
      const timer = setTimeout(() => {
        setAnimationState('finished');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  const circles = [
    { top: '10%', left: '10%', size: '100px', delay: '0.1s' },
    { top: '20%', left: '70%', size: '150px', delay: '0.3s' },
    { top: '50%', left: '20%', size: '120px', delay: '0.5s' },
    { top: '70%', left: '60%', size: '180px', delay: '0.2s' },
  ];

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
        <style>{`
            @keyframes circle-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
            @keyframes circle-grow-and-solidify {
                0% { transform: scale(1); opacity: 0.4; }
                100% { transform: scale(15); opacity: 1; background-color: rgb(37 99 235); }
            }
            .floating-circle {
                animation: circle-float 4s ease-in-out infinite;
            }
            .growing-circle {
                animation: circle-grow-and-solidify 2s ease-in-out forwards;
            }
        `}</style>
        
        {circles.map((c, i) => (
            <div key={i} className={`absolute rounded-full blur-2xl opacity-40 bg-blue-300 ${isAnimating ? 'growing-circle' : 'floating-circle'}`}
                 style={{ top: c.top, left: c.left, width: c.size, height: c.size, animationDelay: c.delay }}></div>
        ))}

        <button 
            onClick={handleClick} 
            className={`w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-all active:scale-95 text-lg z-30 relative duration-[2000ms] ease-in-out ${isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            Click Me
        </button>
        
        <div className={`absolute inset-0 z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-1000 ${showText ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <h1 className="text-3xl font-bold text-white text-center px-4 drop-shadow-md">This is the next screen</h1>
            <button onClick={handleReset} className="text-blue-200 hover:text-white underline underline-offset-4 font-medium">Reset</button>
        </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('int1');

  const options = [
    { id: 'int1', label: 'Interaction 1', screen: <InteractionOneScreen /> },
    { id: 'int2', label: 'Interaction 2', screen: <InteractionTwoScreen /> },
    { id: 'int3', label: 'Interaction 3', screen: <InteractionThreeScreen /> },
    { id: 'int4', label: 'Interaction 4', screen: <InteractionFourScreen /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans selection:bg-blue-200">
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-10 flex flex-col border-r border-gray-200">
        <div className="p-8 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Interactions</h1>
          <p className="text-slate-500 text-sm">Select an option below.</p>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {options.map((option) => (
            <button key={option.id} onClick={() => setActiveTab(option.id)} className={`w-full flex items-center p-4 rounded-2xl transition-all ${activeTab === option.id ? 'bg-slate-900 text-white scale-[1.02]' : 'bg-white hover:bg-slate-50'}`}>
              <div className="flex-1 text-left font-semibold">{option.label}</div>
              <ChevronRight size={20} className={activeTab === option.id ? 'text-white' : 'text-slate-400'} />
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative w-[340px] h-[720px] bg-black rounded-[3.5rem] shadow-2xl border-[12px] border-slate-900 overflow-hidden">
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden pt-10 pb-4">
             <div key={activeTab} className="w-full h-full">
                {options.find(opt => opt.id === activeTab)?.screen}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
