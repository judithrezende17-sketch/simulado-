'use client';

import React, { useState } from 'react';
import { Sparkles, Calculator, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Building2 } from 'lucide-react';
import { SISU_COURSES_DATA } from '@/lib/questions-data';
import { SisuCourse } from '@/lib/types';

interface SisuSimulatorProps {
  initialScore?: number;
  onBackToHome: () => void;
  onStartExam: (examId: any) => void;
}

export function SisuSimulator({ initialScore, onBackToHome, onStartExam }: SisuSimulatorProps) {
  const [linguagens, setLinguagens] = useState<number>(initialScore || 680);
  const [humanas, setHumanas] = useState<number>(initialScore || 710);
  const [natureza, setNatureza] = useState<number>(initialScore || 740);
  const [matematica, setMatematica] = useState<number>(initialScore || 790);
  const [redacao, setRedacao] = useState<number>(840);

  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number>(0);
  const selectedCourse: SisuCourse = SISU_COURSES_DATA[selectedCourseIndex];

  // Calculate weighted average
  const w = selectedCourse.weights;
  const totalWeight = w.linguagens + w.humanas + w.natureza + w.matematica + w.redacao;
  const weightedSum =
    linguagens * w.linguagens +
    humanas * w.humanas +
    natureza * w.natureza +
    matematica * w.matematica +
    redacao * w.redacao;
  const calculatedAverage = Number((weightedSum / totalWeight).toFixed(2));

  const difference = Number((calculatedAverage - selectedCourse.cutoffScore).toFixed(2));
  const isApproved = difference >= 0;
  const isCompetitive = !isApproved && difference >= -25;

  const handleFillStandardScores = (preset: 'medicina' | 'direito' | 'exatas') => {
    if (preset === 'medicina') {
      setLinguagens(730);
      setHumanas(750);
      setNatureza(810);
      setMatematica(850);
      setRedacao(960);
    } else if (preset === 'direito') {
      setLinguagens(760);
      setHumanas(800);
      setNatureza(680);
      setMatematica(730);
      setRedacao(920);
    } else {
      setLinguagens(700);
      setHumanas(690);
      setNatureza(780);
      setMatematica(890);
      setRedacao(880);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold border border-[#FFCDD2]">
            <Sparkles className="w-4 h-4 text-[#D32F2F]" />
            <span>Simulador Oficial SiSU 2025</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            Calculadora de Notas de Corte SISU & Universidades
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            Insira suas notas das 5 áreas do ENEM ou utilize as notas do seu simulado recente. O sistema aplica os pesos específicos de cada curso e universidade pública brasileira e compara com as notas de corte históricas.
          </p>

          {/* Presets Quick Fill */}
          <div className="pt-2 flex items-center gap-2 flex-wrap text-xs">
            <span className="font-semibold text-gray-700">Preenchimento rápido:</span>
            <button
              onClick={() => handleFillStandardScores('medicina')}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-[#FFEBEE] hover:text-[#B71C1C] text-gray-800 font-semibold cursor-pointer transition-colors"
            >
              Perfil Medicina Top
            </button>
            <button
              onClick={() => handleFillStandardScores('direito')}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-blue-50 hover:text-blue-800 text-gray-800 font-semibold cursor-pointer transition-colors"
            >
              Perfil Direito / Humanas
            </button>
            <button
              onClick={() => handleFillStandardScores('exatas')}
              className="px-3 py-1 rounded-lg bg-gray-100 hover:bg-emerald-50 hover:text-emerald-800 text-gray-800 font-semibold cursor-pointer transition-colors"
            >
              Perfil Engenharia / Computação
            </button>
          </div>
        </div>

        {/* Input Grades & Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Input Grades (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#121212] flex items-center gap-2">
              <Calculator className="w-5 h-5 text-[#D32F2F]" />
              <span>Suas Notas no ENEM (0 a 1000)</span>
            </h2>

            <div className="space-y-4">
              {/* Linguagens */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">Linguagens, Códigos e suas Tecnologias</span>
                  <span className="font-mono text-[#D32F2F] font-bold">{linguagens} pts</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="950"
                  step="5"
                  value={linguagens}
                  onChange={e => setLinguagens(Number(e.target.value))}
                  className="w-full accent-[#D32F2F] cursor-pointer"
                />
              </div>

              {/* Humanas */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">Ciências Humanas e suas Tecnologias</span>
                  <span className="font-mono text-[#D32F2F] font-bold">{humanas} pts</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="950"
                  step="5"
                  value={humanas}
                  onChange={e => setHumanas(Number(e.target.value))}
                  className="w-full accent-[#D32F2F] cursor-pointer"
                />
              </div>

              {/* Natureza */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">Ciências da Natureza e suas Tecnologias</span>
                  <span className="font-mono text-[#D32F2F] font-bold">{natureza} pts</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="950"
                  step="5"
                  value={natureza}
                  onChange={e => setNatureza(Number(e.target.value))}
                  className="w-full accent-[#D32F2F] cursor-pointer"
                />
              </div>

              {/* Matemática */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">Matemática e suas Tecnologias</span>
                  <span className="font-mono text-[#D32F2F] font-bold">{matematica} pts</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1000"
                  step="5"
                  value={matematica}
                  onChange={e => setMatematica(Number(e.target.value))}
                  className="w-full accent-[#D32F2F] cursor-pointer"
                />
              </div>

              {/* Redação */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-gray-700">Redação Oficial</span>
                  <span className="font-mono text-[#D32F2F] font-bold">{redacao} pts</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="1000"
                  step="20"
                  value={redacao}
                  onChange={e => setRedacao(Number(e.target.value))}
                  className="w-full accent-[#D32F2F] cursor-pointer"
                />
              </div>
            </div>

            {/* University & Course Selector */}
            <div className="pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-600 block mb-2">
                Selecione o Curso e Universidade Alvo:
              </label>
              <select
                value={selectedCourseIndex}
                onChange={e => setSelectedCourseIndex(Number(e.target.value))}
                className="w-full p-3 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#D32F2F] bg-white cursor-pointer"
              >
                {SISU_COURSES_DATA.map((c, i) => (
                  <option key={i} value={i}>
                    {c.university} • {c.course} ({c.shift}) - Corte: {c.cutoffScore} pts
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Simulation Result (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-[#121212] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#D32F2F]" />
              <span>Diagnóstico SiSU</span>
            </h2>

            {/* Course Summary Card */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
              <p className="text-xs text-gray-500 font-semibold">{selectedCourse.university}</p>
              <p className="text-lg font-black text-[#121212]">{selectedCourse.course}</p>
              <p className="text-xs text-gray-600">
                {selectedCourse.campus} • {selectedCourse.degree} • {selectedCourse.shift}
              </p>
            </div>

            {/* Big Score Comparison */}
            <div className="p-5 rounded-2xl border-2 space-y-3 text-center transition-colors">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block">Sua Média Ponderada</span>
                  <span className="text-3xl font-black text-[#121212]">{calculatedAverage}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-500 font-semibold block">Nota de Corte 2024</span>
                  <span className="text-3xl font-black text-gray-700">{selectedCourse.cutoffScore}</span>
                </div>
              </div>

              {/* Status Banner */}
              {isApproved ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Chances Altas de Aprovação! (+{difference} pts acima da nota de corte)
                  </span>
                </div>
              ) : isCompetitive ? (
                <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Disputa Competitiva na Lista de Espera ({difference} pts da corte)
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-red-50 border border-red-300 text-red-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#D32F2F] shrink-0" />
                  <span>
                    Abaixo da nota de corte ({difference} pts). Recomendado intensificar simulados!
                  </span>
                </div>
              )}
            </div>

            {/* Weights Breakdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Pesos Oficiais Adotados pela Banca:
              </span>
              <div className="grid grid-cols-5 gap-1.5 text-center text-xs font-mono">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-[10px] text-gray-500 block">Ling</span>
                  <span className="font-bold text-[#121212]">{w.linguagens}x</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-[10px] text-gray-500 block">Hum</span>
                  <span className="font-bold text-[#121212]">{w.humanas}x</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-[10px] text-gray-500 block">Nat</span>
                  <span className="font-bold text-[#D32F2F]">{w.natureza}x</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-[10px] text-gray-500 block">Mat</span>
                  <span className="font-bold text-[#D32F2F]">{w.matematica}x</span>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <span className="text-[10px] text-gray-500 block">Red</span>
                  <span className="font-bold text-[#121212]">{w.redacao}x</span>
                </div>
              </div>
            </div>

            {/* Action button */}
            <button
              onClick={() => onStartExam('enem')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Fazer Simulado ENEM para Elevar Nota</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
