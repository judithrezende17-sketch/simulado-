'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Timer,
  CheckCircle,
  Play,
  Trophy,
  Building2,
  GraduationCap,
  Scale,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { EXAMS_REGISTRY } from '@/lib/questions-data';
import { ExamDefinition, ExamId } from '@/lib/types';

interface ExamCatalogViewProps {
  initialFilter?: string;
  onStartExam: (examId: ExamId) => void;
  onBackToHome: () => void;
}

export function ExamCatalogView({ initialFilter = 'todas', onStartExam, onBackToHome }: ExamCatalogViewProps) {
  const [activeTab, setActiveTab] = useState<string>(initialFilter);

  const filteredExams = EXAMS_REGISTRY.filter(ex => {
    if (activeTab === 'todas') return true;
    if (activeTab === 'medio_enem') return ex.category === 'medio_enem' || ex.id === 'enem';
    if (activeTab === 'vestibulares') return ex.category === 'vestibulares' || ex.id === 'fuvest' || ex.id === 'provao_paulista';
    if (activeTab === 'olimpiadas') return ex.category === 'olimpiadas';
    if (activeTab === 'fundamental') return ex.category === 'fundamental' || ex.id === 'saresp';
    if (activeTab === 'concursos') return ex.category === 'concursos';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold border border-[#FFCDD2]">
            <BookOpen className="w-4 h-4 text-[#D32F2F]" />
            <span>Catálogo Completo de Simulados Oficiais</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            Escolha seu Simulado com 20 Questões Comentadas
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            Todos os simulados contam com 20 questões completas de múltipla escolha, cronômetro oficial, mapa de navegação interativo e gabarito comentado passo a passo ao final.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('todas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'todas'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas as Provas
            </button>
            <button
              onClick={() => setActiveTab('medio_enem')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'medio_enem'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ENEM & Novo Ensino Médio
            </button>
            <button
              onClick={() => setActiveTab('vestibulares')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'vestibulares'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              FUVEST & Provão Paulista
            </button>
            <button
              onClick={() => setActiveTab('olimpiadas')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'olimpiadas'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Olimpíadas (OBMEP & OBA)
            </button>
            <button
              onClick={() => setActiveTab('fundamental')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'fundamental'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ensino Fundamental & SARESP
            </button>
            <button
              onClick={() => setActiveTab('concursos')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'concursos'
                  ? 'bg-[#D32F2F] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Concursos Públicos
            </button>
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map(ex => (
            <div
              key={ex.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#D32F2F]/40 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold">
                    {ex.badge}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">{ex.institution}</span>
                </div>

                <h3 className="text-xl font-bold text-[#121212] group-hover:text-[#D32F2F] transition-colors">
                  {ex.title}
                </h3>

                <p className="text-xs text-gray-500 font-medium">{ex.subtitle}</p>

                <p className="text-xs text-gray-600 leading-relaxed pt-1">{ex.description}</p>
              </div>

              <div className="pt-6 mt-4 border-t border-gray-100 space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                  <span className="flex items-center gap-1 font-semibold text-[#121212]">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {ex.totalQuestions} Questões Reais
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5 text-gray-500" />
                    {ex.durationMinutes} minutos
                  </span>
                </div>

                <button
                  onClick={() => onStartExam(ex.id)}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Iniciar Simulado Imediatamente</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
