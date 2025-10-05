"use client"

import React, { useState, useEffect } from "react"
import Aurora from "./Backgrounds/Aurora"

export const LoadingScreen: React.FC = () => {
    const [mounted, setMounted] = useState(false);
    const loadingWords = ['buttons', 'forms', 'switches', 'cards', 'buttons'];

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
    <>
      <style>
        {`
        .black-grid-background {
            background-color: #111;
            --grid-line-color: rgba(255, 255, 255, 0.07);
            --grid-size: 40px;
            background-image:
              linear-gradient(to right, var(--grid-line-color) 1px, transparent 1px),
              linear-gradient(to bottom, var(--grid-line-color) 1px, transparent 1px);
            background-size: var(--grid-size) var(--grid-size);
          }
          @keyframes spin_words {
            10% { transform: translateY(-102%); }
            25% { transform: translateY(-100%); }
            35% { transform: translateY(-202%); }
            50% { transform: translateY(-200%); }
            60% { transform: translateY(-302%); }
            75% { transform: translateY(-300%); }
            85% { transform: translateY(-402%); }
            100% { transform: translateY(-400%); }
          }
          .animate-spin-words {
            animation: spin_words 4s infinite;
          }
          .words-fade::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 20;
          }
        `}
      </style>
      <div className="fixed top-0 left-0 black-grid-background z-[9999] flex h-screen min-h-screen w-full items-center justify-center font-sans">        {/* you can change background here*/ }
        <div className="rounded-2xl bg-black pb-12 px-12 sm:scale-100 scale-70">
          <div className="flex h-10 justify-center  items-center rounded-lg p-1 font-medium text-zinc-400 text-6xl ">
            <p className="translate-y-5">loading</p>
            <div className="words-fade relative h-full overflow-hidden translate-y-4 py-8">
              {loadingWords.map((word, index) => (
                <span className="animate-spin-words block h-full pl-[12px] translate-y-2 py-8 text-[#956afa]" key={index}>
                  {word}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
