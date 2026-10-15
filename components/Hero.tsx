'use client';

import React, { useState } from 'react';
import { ArrowRight, Sparkles, Timer, CheckCircle, TrendingUp, Star, Award, BookOpen } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface HeroProps {
  onStartExam: (examId: ExamId) => void;
  onExploreCategories: () => void;
  onOpenSisu: () => void;
}

export function Hero({ onStartExam, onExploreCategories, onOpenSisu }: HeroProps) {
  const [selectedMockOption, setSelectedMockOption] = useState<'A' | 'B' | 'C'>('B');

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 bg-[#FAFAFA]">
      {/* Subtle Ambient Light Accents */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#FFCDD2]/30 blur-3xl pointer-events-none" />
      <div className="absolute top-48 -left-20 w-80 h-80 rounded-full bg-[#FFEBEE]/50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFEBEE] border border-[#FFCDD2] shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D32F2F] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D32F2F]" />
              </span>
              <span className="text-xs font-semibold text-[#B71C1C]">
                Mais de 120.000 questões comentadas e simulados atualizados 2025
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#121212] tracking-tight leading-[1.15]">
              Conquiste a sua aprovação com{' '}
              <span className="text-[#D32F2F]">simulados reais</span> e análise de desempenho
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-2xl">
              Prepare-se para o <strong>ENEM</strong>, vestibulares mais concorridos (<strong>FUVEST, UNICAMP, VUNESP</strong>), olimpíadas científicas (<strong>OBMEP, OBA</strong>), provas escolares (<strong>SARESP, Provão Paulista</strong>) e concursos públicos com gabarito comentado passo a passo.
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto">
              <button
                onClick={() => onStartExam('enem')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg active:scale-95 transition-all cursor-pointer"
              >
                <span>Iniciar Simulado ENEM (20 Qs)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSisu}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FFEBEE] text-[#D32F2F] border border-[#FFCDD2] font-bold text-sm sm:text-base shadow-xs hover:shadow transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simulador SISU</span>
              </button>

              <button
                onClick={onExploreCategories}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-sm transition-all cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-gray-600" />
                <span>Ver Todas as Provas</span>
              </button>
            </div>

            {/* Social Proof & Metrics Badges Bar */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl">
              <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#D32F2F]">+94%</span>
                <span className="text-xs font-medium text-gray-600 mt-0.5">Taxa de Aprovação</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs flex flex-col">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#121212]">350k+</span>
                <span className="text-xs font-medium text-gray-600 mt-0.5">Alunos Ativos no Brasil</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-gray-200 shadow-xs flex flex-col">
                <div className="flex items-center gap-1 text-[#121212]">
                  <span className="text-2xl sm:text-3xl font-extrabold">4.9</span>
                  <Star className="w-4 h-4 fill-[#D32F2F] text-[#D32F2F]" />
                </div>
                <span className="text-xs font-medium text-gray-600 mt-0.5">Avaliação Média</span>
              </div>
            </div>
          </div>

          {/* Hero Right Column: Rich Interactive Preview Card (Image 1 replica) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-white rounded-2xl p-5 sm:p-6 shadow-xl border border-gray-200 overflow-hidden">
              {/* Header of Mock Exam */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-[#FFEBEE] text-[#B71C1C]">
                    ENEM OFICIAL
                  </span>
                  <span className="text-xs font-mono font-medium text-gray-500">
                    Q. 01 / 20
                  </span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 font-mono text-xs text-[#D32F2F] font-bold">
                  <Timer className="w-3.5 h-3.5" />
                  <span>02:44:18</span>
                </div>
              </div>

              {/* Question Stem Preview */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 font-semibold">
                    Ciências da Natureza
                  </span>
                  <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Média Dificuldade
                  </span>
                </div>

                <p className="text-sm text-[#121212] font-medium leading-relaxed">
                  Um circuito elétrico residencial de 127 V conecta três lâmpadas idênticas em paralelo. Ao desligar uma das lâmpadas, a corrente elétrica total fornecida pela rede sofrerá qual alteração?
                </p>
              </div>

              {/* Options Stack (Interactive) */}
              <div className="mt-4 space-y-2">
                {/* Option A */}
                <button
                  type="button"
                  onClick={() => setSelectedMockOption('A')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMockOption === 'A'
                      ? 'border-[#D32F2F] bg-[#FFEBEE]/50 shadow-xs'
                      : 'border-gray-200 bg-gray-50/70 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedMockOption === 'A'
                        ? 'bg-[#D32F2F] text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    A
                  </span>
                  <span className="text-xs text-gray-800 leading-snug">
                    Permanecerá constante devido à tensão fixa.
                  </span>
                </button>

                {/* Option B (Selected/Correct) */}
                <button
                  type="button"
                  onClick={() => setSelectedMockOption('B')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMockOption === 'B'
                      ? 'border-[#D32F2F] bg-[#FFEBEE]/50 shadow-xs'
                      : 'border-gray-200 bg-gray-50/70 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedMockOption === 'B'
                        ? 'bg-[#D32F2F] text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    B
                  </span>
                  <span className="text-xs font-bold text-gray-900 leading-snug flex-1">
                    Reduzirá em um terço em relação ao valor original.
                  </span>
                  <CheckCircle className="w-4 h-4 text-[#D32F2F] shrink-0" />
                </button>

                {/* Option C */}
                <button
                  type="button"
                  onClick={() => setSelectedMockOption('C')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedMockOption === 'C'
                      ? 'border-[#D32F2F] bg-[#FFEBEE]/50 shadow-xs'
                      : 'border-gray-200 bg-gray-50/70 hover:bg-gray-100'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      selectedMockOption === 'C'
                        ? 'bg-[#D32F2F] text-white'
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    C
                  </span>
                  <span className="text-xs text-gray-800 leading-snug">
                    Aumentará proporcionalmente à resistência interna.
                  </span>
                </button>
              </div>

              {/* Inline Floating Badge: Live Ranking Spark */}
              <div className="mt-4 p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900 leading-none">Desempenho TRI Estimado</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">742.8 pts • Top 4% nacional</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  +18 pts hoje
                </span>
              </div>
            </div>

            {/* Soft decorative shadow card behind for depth */}
            <div className="absolute -bottom-3 -right-3 -z-10 w-full h-full bg-[#FFEBEE] rounded-2xl opacity-60 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
