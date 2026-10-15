'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Users } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface WeeklySimuladoBannerProps {
  onStartExam: (examId: ExamId) => void;
}

export function WeeklySimuladoBanner({ onStartExam }: WeeklySimuladoBannerProps) {
  // 14 hours, 32 mins, 43 secs initial countdown
  const [timeLeft, setTimeLeft] = useState(14 * 3600 + 32 * 60 + 43);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
      <div className="bg-gradient-to-r from-[#211113] via-[#1B1C1C] to-[#2B1215] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-red-900/40">
        {/* Decorative backdrop glowing elements */}
        <div className="absolute -right-12 -bottom-12 w-72 h-72 rounded-full bg-[#D32F2F]/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#D32F2F] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
                Simulado Nacional Aberto
              </span>
              <span className="text-xs font-medium text-red-200 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D32F2F] animate-pulse" />
                <Users className="w-3.5 h-3.5 text-red-300" />
                9.420 estudantes online agora
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              ENEM 2025 - 1º Dia: Linguagens, Humanas & Redação Oficial
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed">
              Gabarito oficial comentado imediatamente ao término. Classificação percentual e nota TRI estimada para simulação direta nas notas de corte do SiSU.
            </p>
          </div>

          {/* Countdown Clock & CTA */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            {/* Live Countdown Blocks */}
            <div className="flex items-center justify-center gap-2 bg-black/60 border border-white/10 px-4 py-2.5 rounded-xl backdrop-blur-sm">
              <div className="flex flex-col items-center min-w-[36px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-red-300">
                  {String(hours).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Horas</span>
              </div>
              <span className="font-mono text-xl text-red-400 font-bold pb-2">:</span>
              <div className="flex flex-col items-center min-w-[36px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-red-300">
                  {String(minutes).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Min</span>
              </div>
              <span className="font-mono text-xl text-red-400 font-bold pb-2">:</span>
              <div className="flex flex-col items-center min-w-[36px]">
                <span className="font-mono text-xl sm:text-2xl font-black text-red-300">
                  {String(seconds).padStart(2, '0')}
                </span>
                <span className="text-[10px] text-gray-400 uppercase font-semibold">Seg</span>
              </div>
            </div>

            {/* Direct Access Button */}
            <button
              onClick={() => onStartExam('enem')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-red-900/50 transition-all cursor-pointer text-center whitespace-nowrap active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>Acessar Caderno de Prova</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
