"use client";

import React, { useState, useEffect, type CSSProperties } from 'react';
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
          style={
            {
              "--stripe-offset": offset,
              "--stripe-delay": Math.abs(offset),
            } as CSSProperties
          }
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
      }, 2000); // 2 second transition
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
      <style>{`
        /* Background transition */
        @keyframes bg-fade-in {
            0% { background-color: rgb(249 250 251); } /* bg-gray-50 */
            100% { background-color: rgb(37 99 235); } /* bg-blue-600 */
        }
        .bg-fill-anim {
            animation: bg-fade-in 2s forwards;
        }

        /* Synced Button fade out */
        @keyframes sync-btn-fade {
            0% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.95); pointer-events: none; }
        }
        .btn-sync-fading {
            animation: sync-btn-fade 2s forwards;
        }

        /* Smooth organic floating for idle circles */
        @keyframes float-1 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -30px); } }
        @keyframes float-2 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-25px, 20px); } }
        @keyframes float-3 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(30px, 25px); } }
        @keyframes float-4 { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(-20px, -20px); } }

        .circle-idle-1 { animation: float-1 6s ease-in-out infinite; }
        .circle-idle-2 { animation: float-2 8s ease-in-out infinite; }
        .circle-idle-3 { animation: float-3 7s ease-in-out infinite; }
        .circle-idle-4 { animation: float-4 9s ease-in-out infinite; }

        /* Expansion and merge animation */
        @keyframes circle-expand {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(25); opacity: 1; background-color: rgb(37, 99, 235); }
        }
        .circle-animating {
            animation: circle-expand 2s ease-in-out forwards;
        }
      `}</style>

      {/* Layer 1: Background filler */}
      <div className={`absolute inset-0 z-0 ${isAnimating ? 'bg-fill-anim' : 'bg-gray-50'}`}></div>

      {/* Layer 2: Floating Circles */}
      <div className={`absolute z-10 w-32 h-32 rounded-full blur-xl left-4 top-20 bg-blue-400/40 ${isAnimating ? 'circle-animating' : 'circle-idle-1'}`} style={{ animationDelay: isAnimating ? '0s' : '0s' }}></div>
      <div className={`absolute z-10 w-40 h-40 rounded-full blur-xl right-[-20px] top-1/3 bg-blue-300/50 ${isAnimating ? 'circle-animating' : 'circle-idle-2'}`} style={{ animationDelay: isAnimating ? '0.2s' : '0s' }}></div>
      <div className={`absolute z-10 w-24 h-24 rounded-full blur-lg left-10 bottom-1/3 bg-blue-500/30 ${isAnimating ? 'circle-animating' : 'circle-idle-3'}`} style={{ animationDelay: isAnimating ? '0.4s' : '0s' }}></div>
      <div className={`absolute z-10 w-48 h-48 rounded-full blur-2xl right-10 bottom-20 bg-blue-400/40 ${isAnimating ? 'circle-animating' : 'circle-idle-4'}`} style={{ animationDelay: isAnimating ? '0.1s' : '0s' }}></div>

      {/* Layer 3: Button */}
      {!showText && (
        <button
          onClick={handleClick}
          className={`w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-lg z-30 relative ${isAnimating ? 'btn-sync-fading' : ''}`}
        >
          Click Me
        </button>
      )}

      {/* Layer 4: Final Text */}
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

const InteractionFiveScreen = () => {
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
      }, 7000); 
      return () => clearTimeout(timer);
    }
  }, [animationState]);

  const isAnimating = animationState === 'animating' || animationState === 'finished';
  const showText = animationState === 'finished';

  return (
    <div className="h-full flex flex-col justify-end p-6 pb-12 bg-gray-50 relative overflow-hidden">
      <style>{`
        /* Background Fill Transition */
        @keyframes fill-bg-anim {
            0%, 70% { opacity: 0; }
            90%, 100% { opacity: 1; }
        }
        .bg-blue-fill {
            position: absolute;
            inset: 0;
            background-color: rgb(37 99 235);
            opacity: 0;
            z-index: 35;
        }
        .bg-blue-fill.animating {
            animation: fill-bg-anim 7s ease-in-out forwards;
        }

        /* Button Fade */
        @keyframes btn-fade-out {
            0% { opacity: 1; transform: scale(1); }
            10%, 100% { opacity: 0; transform: scale(0.95); }
        }
        .btn-fading {
            animation: btn-fade-out 7s ease-in-out forwards;
            pointer-events: none;
        }

        /* Container Bounce & Float - Holds rotation/scale during dispersal */
        @keyframes grid-bounce-scale {
            0%, 50% { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
            54% { transform: translate(-50%, -50%) scale(1.6) rotate(3deg); }
            59% { transform: translate(-50%, -50%) scale(1.4) rotate(-2deg); }
            66% { transform: translate(-50%, -52%) scale(1.45) rotate(1deg); }
            73% { transform: translate(-50%, -48%) scale(1.4) rotate(-1deg); }
            90%, 100% { transform: translate(-50%, -50%) scale(1.42) rotate(2deg); }
        }
        .grid-container {
            position: absolute;
            top: 40%;
            left: 50%;
            width: 112px;
            height: 112px;
            transform: translate(-50%, -50%);
            z-index: 40;
        }
        .grid-container.animating {
            animation: grid-bounce-scale 7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .base-sq {
            position: absolute;
            width: 32px;
            height: 32px;
            border-radius: 6px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            will-change: transform, opacity;
        }

        /* Idle Grid Positions */
        .sq-0-idle { transform: translate(0px, 0px); }
        .sq-1-idle { transform: translate(40px, 0px); }
        .sq-2-idle { transform: translate(80px, 0px); }
        .sq-3-idle { transform: translate(80px, 40px); }
        .sq-4-idle { transform: translate(80px, 80px); }
        .sq-5-idle { transform: translate(40px, 80px); }
        .sq-6-idle { transform: translate(0px, 80px); }
        .sq-7-idle { transform: translate(0px, 40px); }
        .sq-c-idle { transform: translate(40px, 40px); }

        /* TIMING ADJUSTED: Float rest reduced to 70%. Dispersal ends at 90%. Speed is identical. */
        @keyframes sq-anim-0 {
            0%, 2% { transform: translate(0px, 0px); opacity: 1; }
            10%, 14.5% { transform: translate(40px, 0px); opacity: 1; }
            22.5%, 27% { transform: translate(80px, 0px); opacity: 1; }
            35%, 39.5% { transform: translate(80px, 40px); opacity: 1; }
            47.5%, 70% { transform: translate(80px, 80px); opacity: 1; }
            90%, 100% { transform: translate(400px, 80px); opacity: 0; }
        }
        @keyframes sq-anim-1 {
            0%, 2% { transform: translate(40px, 0px); opacity: 1; }
            10%, 14.5% { transform: translate(80px, 0px); opacity: 1; }
            22.5%, 27% { transform: translate(80px, 40px); opacity: 1; }
            35%, 39.5% { transform: translate(80px, 80px); opacity: 1; }
            47.5%, 70% { transform: translate(40px, 80px); opacity: 1; }
            90%, 100% { transform: translate(40px, -400px); opacity: 0; }
        }
        @keyframes sq-anim-2 {
            0%, 2% { transform: translate(80px, 0px); opacity: 1; }
            10%, 14.5% { transform: translate(80px, 40px); opacity: 1; }
            22.5%, 27% { transform: translate(80px, 80px); opacity: 1; }
            35%, 39.5% { transform: translate(40px, 80px); opacity: 1; }
            47.5%, 70% { transform: translate(0px, 80px); opacity: 1; }
            90%, 100% { transform: translate(-400px, 80px); opacity: 0; }
        }
        @keyframes sq-anim-3 {
            0%, 2% { transform: translate(80px, 40px); opacity: 1; }
            10%, 14.5% { transform: translate(80px, 80px); opacity: 1; }
            22.5%, 27% { transform: translate(40px, 80px); opacity: 1; }
            35%, 39.5% { transform: translate(0px, 80px); opacity: 1; }
            47.5%, 70% { transform: translate(0px, 40px); opacity: 1; }
            90%, 100% { transform: translate(-400px, 40px); opacity: 0; }
        }
        @keyframes sq-anim-4 {
            0%, 2% { transform: translate(80px, 80px); opacity: 1; }
            10%, 14.5% { transform: translate(40px, 80px); opacity: 1; }
            22.5%, 27% { transform: translate(0px, 80px); opacity: 1; }
            35%, 39.5% { transform: translate(0px, 40px); opacity: 1; }
            47.5%, 70% { transform: translate(0px, 0px); opacity: 1; }
            90%, 100% { transform: translate(-400px, -400px); opacity: 0; }
        }
        @keyframes sq-anim-5 {
            0%, 2% { transform: translate(40px, 80px); opacity: 1; }
            10%, 14.5% { transform: translate(0px, 80px); opacity: 1; }
            22.5%, 27% { transform: translate(0px, 40px); opacity: 1; }
            35%, 39.5% { transform: translate(0px, 0px); opacity: 1; }
            47.5%, 70% { transform: translate(40px, 0px); opacity: 1; }
            90%, 100% { transform: translate(40px, -400px); opacity: 0; }
        }
        @keyframes sq-anim-6 {
            0%, 2% { transform: translate(0px, 80px); opacity: 1; }
            10%, 14.5% { transform: translate(0px, 40px); opacity: 1; }
            22.5%, 27% { transform: translate(0px, 0px); opacity: 1; }
            35%, 39.5% { transform: translate(40px, 0px); opacity: 1; }
            47.5%, 70% { transform: translate(80px, 0px); opacity: 1; }
            90%, 100% { transform: translate(400px, -400px); opacity: 0; }
        }
        @keyframes sq-anim-7 {
            0%, 2% { transform: translate(0px, 40px); opacity: 1; }
            10%, 14.5% { transform: translate(0px, 0px); opacity: 1; }
            22.5%, 27% { transform: translate(40px, 0px); opacity: 1; }
            35%, 39.5% { transform: translate(80px, 0px); opacity: 1; }
            47.5%, 70% { transform: translate(80px, 40px); opacity: 1; }
            90%, 100% { transform: translate(400px, 40px); opacity: 0; }
        }
        @keyframes sq-anim-c {
            0%, 70% { transform: translate(40px, 40px); opacity: 1; }
            90%, 100% { transform: translate(40px, -500px); opacity: 0; }
        }

        .anim-0 { animation: sq-anim-0 7s ease-in-out forwards; }
        .anim-1 { animation: sq-anim-1 7s ease-in-out forwards; }
        .anim-2 { animation: sq-anim-2 7s ease-in-out forwards; }
        .anim-3 { animation: sq-anim-3 7s ease-in-out forwards; }
        .anim-4 { animation: sq-anim-4 7s ease-in-out forwards; }
        .anim-5 { animation: sq-anim-5 7s ease-in-out forwards; }
        .anim-6 { animation: sq-anim-6 7s ease-in-out forwards; }
        .anim-7 { animation: sq-anim-7 7s ease-in-out forwards; }
        .anim-c { animation: sq-anim-c 7s ease-in-out forwards; }
      `}</style>

      {/* Layer 1: The background fade-in */}
      <div className={`bg-blue-fill ${isAnimating ? 'animating' : ''}`}></div>

      {/* Layer 2: The 3x3 Grid Compositon */}
      <div className={`grid-container ${isAnimating ? 'animating' : ''}`}>
        <div className={`base-sq bg-blue-100 ${isAnimating ? 'anim-0' : 'sq-0-idle'}`}></div>
        <div className={`base-sq bg-blue-200 ${isAnimating ? 'anim-1' : 'sq-1-idle'}`}></div>
        <div className={`base-sq bg-blue-300 ${isAnimating ? 'anim-2' : 'sq-2-idle'}`}></div>
        <div className={`base-sq bg-blue-400 ${isAnimating ? 'anim-3' : 'sq-3-idle'}`}></div>
        <div className={`base-sq bg-blue-500 ${isAnimating ? 'anim-4' : 'sq-4-idle'}`}></div>
        <div className={`base-sq bg-blue-600 ${isAnimating ? 'anim-5' : 'sq-5-idle'}`}></div>
        <div className={`base-sq bg-blue-700 ${isAnimating ? 'anim-6' : 'sq-6-idle'}`}></div>
        <div className={`base-sq bg-blue-800 ${isAnimating ? 'anim-7' : 'sq-7-idle'}`}></div>
        <div className={`base-sq bg-blue-500 ${isAnimating ? 'anim-c' : 'sq-c-idle'}`}></div>
      </div>

      {/* Layer 3: The Button */}
      {!showText && (
        <button
            onClick={handleClick}
            className={`w-full h-[60px] bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition-transform active:scale-95 text-lg z-40 relative ${isAnimating ? 'btn-fading' : ''}`}
        >
            Click Me
        </button>
      )}

      {/* Layer 4: Final Text */}
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

// --- MAIN APP COMPONENT ---

export default function App() {
  const [activeTab, setActiveTab] = useState('int1');

  const options = [
    { id: 'int1', label: 'Interaction 1', screen: <InteractionOneScreen /> },
    { id: 'int2', label: 'Interaction 2', screen: <InteractionTwoScreen /> },
    { id: 'int3', label: 'Interaction 3', screen: <InteractionThreeScreen /> },
    { id: 'int4', label: 'Interaction 4', screen: <InteractionFourScreen /> },
    { id: 'int5', label: 'Interaction 5', screen: <InteractionFiveScreen /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans selection:bg-blue-200">
      
      {/* Left Menu Panel */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-2xl z-10 flex flex-col border-r border-gray-200">
        <div className="p-8 pb-4">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Interactions</h1>
          <p className="text-slate-500 text-sm">Select an option below to view the interactive prototype on the device.</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {options.map((option) => {
            const isActive = activeTab === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setActiveTab(option.id)}
                className={`w-full flex items-center p-4 rounded-2xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-slate-900 text-white shadow-md transform scale-[1.02]' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 hover:shadow-sm'
                }`}
              >
                <div className="flex-1 text-left">
                  <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-slate-900'}`}>
                    {option.label}
                  </h3>
                </div>
                <ChevronRight 
                  size={20} 
                  className={`transition-transform duration-300 ${
                    isActive ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                  }`} 
                />
              </button>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-gray-100 bg-slate-50">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            System Online • React Component
          </div>
        </div>
      </div>

      {/* Right Phone Display Panel */}
      <div className="flex-1 relative flex items-center justify-center p-8 bg-slate-100 overflow-hidden">
        
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200 to-indigo-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        {/* The Phone Mockup */}
        <div className="relative w-[340px] h-[720px] bg-black rounded-[3.5rem] shadow-2xl shadow-slate-400/50 border-[12px] border-slate-900 overflow-hidden">
          
          {/* Hardware Buttons (Decorative) */}
          <div className="absolute left-[-14px] top-32 w-1 h-12 bg-slate-800 rounded-l-md"></div>
          <div className="absolute left-[-14px] top-48 w-1 h-16 bg-slate-800 rounded-l-md"></div>
          <div className="absolute left-[-14px] top-68 w-1 h-16 bg-slate-800 rounded-l-md"></div>
          <div className="absolute right-[-14px] top-40 w-1 h-20 bg-slate-800 rounded-r-md"></div>

          {/* Dynamic Island / Notch */}
          <div className="absolute top-2 inset-x-0 mx-auto w-32 h-7 bg-black rounded-full z-50 flex items-center justify-end px-3 shadow-sm border border-slate-800">
             <div className="w-2 h-2 rounded-full bg-slate-800/80 mr-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]"></div>
          </div>

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-white rounded-[2.5rem] overflow-hidden pt-10 pb-4">
             {/* Render the selected screen here */}
             <div key={activeTab} className="w-full h-full">
                {options.find(opt => opt.id === activeTab)?.screen}
             </div>
             
             {/* Home Indicator line at bottom */}
             <div className="absolute bottom-2 inset-x-0 mx-auto w-32 h-1.5 bg-black/20 rounded-full z-50"></div>
          </div>
        </div>

      </div>
    </div>
  );
}
