import React from 'react';
import Spline from '@splinetool/react-spline';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent" />

      <div className="relative z-10 flex h-full items-end md:items-center">
        <div className="px-4 md:px-8 lg:px-12 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              <span>AI Chat • Dark Space UI</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white">
              Converse with an Astral Copilot
            </h1>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-white/70">
              A dark, futuristic interface with streaming responses. Switch providers, manage sessions, and explore ideas in a cyberpunk glow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
