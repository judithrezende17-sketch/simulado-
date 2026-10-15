'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface ExamMatrixTeaserProps {
  onStartExam: (examId: ExamId) => void;
}

export function ExamMatrixTeaser({ onStartExam }: ExamMatrixTeaserProps) {
  const [activeNumber, setActiveNumber] = useState<number>(12);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
      <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Interactive Matrix Visual */}
          <div className="lg:col-span-5 space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold inline-block">
              Simulador de Gabarito Oficial
            </span>

            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#121212] tracking-tight">
              Navegue pelas questões como no dia da prova
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Matriz de gabarito rápida: visualize com um toque quais questões estão respondidas, em branco ou sinalizadas para revisão posterior.
            </p>

            {/* Interactive Question Matrix Box */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-3 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[#121212]" />
                  <span>Respondida (11)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded border-2 border-[#D32F2F] bg-white flex items-center justify-center text-[8px] font-bold text-[#D32F2F]" />
                  <span className="text-[#D32F2F] font-bold">Ativa ({activeNumber})</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-gray-200" />
                  <span>Pendente (3)</span>
                </span>
              </div>

              {/* Matrix of 15 buttons */}
              <div className="grid grid-cols-5 gap-2 font-mono text-xs text-center select-none">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setActiveNumber(n)}
                    className={`py-2 rounded-lg font-bold transition-transform cursor-pointer ${
                      activeNumber === n
                        ? 'bg-white text-[#D32F2F] border-2 border-[#D32F2F] shadow-sm scale-105'
                        : 'bg-[#121212] text-white hover:bg-gray-800'
                    }`}
                  >
                    {String(n).padStart(2, '0')}
                  </button>
                ))}

                {/* 12: active by default */}
                <button
                  type="button"
                  onClick={() => setActiveNumber(12)}
                  className={`py-2 rounded-lg font-bold transition-transform cursor-pointer ${
                    activeNumber === 12
                      ? 'bg-white text-[#D32F2F] border-2 border-[#D32F2F] shadow-sm scale-105'
                      : 'bg-[#121212] text-white'
                  }`}
                >
                  12
                </button>

                {/* 13, 14, 15: pending */}
                {[13, 14, 15].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setActiveNumber(n)}
                    className={`py-2 rounded-lg font-semibold transition-transform cursor-pointer ${
                      activeNumber === n
                        ? 'bg-white text-[#D32F2F] border-2 border-[#D32F2F] shadow-sm scale-105'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                  >
                    {String(n).padStart(2, '0')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Real Testimonial from Mariana Rios */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 pl-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-gray-100 pt-6 lg:pt-0">
            <div className="space-y-2">
              <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Caso Real de Aprovação
              </span>

              <blockquote className="text-lg sm:text-xl font-bold text-[#121212] leading-snug">
                &ldquo;Fiz 42 simulados completos antes do ENEM. Quando sentei para a prova oficial, parecia apenas mais um domingo no EscSimulados.&rdquo;
              </blockquote>
            </div>

            <div className="flex items-center gap-4 pt-2">
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-[#D32F2F]/20 shadow-xs">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-8FcGDcKWgot-7_IEOcpdFo250XxDrmOXUFDG4Nu_wmzSO6-8b7gyYcMpXsIQMxiglIGWjIyXGxCy86sbt0DQxqRwGAdb5geb_wxekuHOvFwCBGVpetVc60rlhYr6Ud_byVNnm9cJO7F7J4z4s91Ve9xmElZoZjcbZ-dvYTrtNCFRataFTu7iwFMa9faY-wi2ug13jn4zIAao8kmOfIKrWN72_I2jONGykMl8YKu9wov0mtxUBkg3"
                  alt="Mariana Rios"
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <p className="text-base font-bold text-[#121212]">Mariana Rios</p>
                <p className="text-xs sm:text-sm text-gray-600">
                  Aprovada em Medicina na <strong>USP (FUVEST)</strong> & 1º lugar SiSU na <strong>UFRJ</strong>
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onStartExam('enem')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <span>Começar Simulado Imediatamente</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-gray-500 font-medium">
                100% gratuito. Não exige cartão ou cadastro.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
