'use client';

import React from 'react';
import {
  GraduationCap,
  Flame,
  Building2,
  Scale,
  Sparkles,
  ChevronRight,
  Play,
  CheckCircle,
  HelpCircle,
  Trophy,
} from 'lucide-react';
import { ExamId } from '@/lib/types';

interface CategoryGridProps {
  onSelectExam: (examId: ExamId) => void;
  onFilterCategory?: (category: string) => void;
}

export function CategoryGrid({ onSelectExam }: CategoryGridProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-10 gap-3">
        <div>
          <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
            Trilhas de Aprendizado
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight mt-1">
            Escolha o seu foco de aprovação
          </h2>
        </div>
        <p className="text-sm text-gray-600 max-w-md">
          Simulados com no mínimo 20 questões oficiais e gabarito comentado com matriz de habilidades atualizada.
        </p>
      </div>

      {/* Grid of Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
        {/* CARD 1: Ensino Fundamental & SARESP */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#D32F2F]/30 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-[11px] font-bold">
                Escolar & SARESP
              </span>
              <GraduationCap className="w-5 h-5 text-gray-600 group-hover:text-[#D32F2F] transition-colors" />
            </div>

            <h3 className="text-lg font-bold text-[#121212] pt-0.5">
              Ensino Fundamental & SARESP
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Matriz do SARESP (SP), diagnósticos de Português e Matemática do 6º ao 9º ano e Colégios de Aplicação.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>20 Questões</span>
              <span className="text-emerald-700 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Comentadas
              </span>
            </div>

            <button
              onClick={() => onSelectExam('saresp')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-[#FFEBEE] text-gray-800 hover:text-[#B71C1C] font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Simulado SARESP</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CARD 2: Ensino Médio & ENEM (Featured) */}
        <div className="bg-white rounded-2xl p-5 border-2 border-[#D32F2F] flex flex-col justify-between shadow-md relative overflow-hidden group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-[#D32F2F] text-white text-[11px] font-bold flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3 text-amber-300" />
                <span>Mais Acessado</span>
              </span>
              <Sparkles className="w-5 h-5 text-[#D32F2F]" />
            </div>

            <h3 className="text-lg font-bold text-[#121212] pt-0.5">
              Ensino Médio & ENEM
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Simulado no modelo TRI com questões inéditas e oficiais do ENEM: Linguagens, Humanas, Natureza e Matemática.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs mb-3 font-semibold">
              <span className="text-[#D32F2F]">20 Questões Reais</span>
              <span className="text-emerald-700">Cálculo TRI</span>
            </div>

            <button
              onClick={() => onSelectExam('enem')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Iniciar ENEM</span>
            </button>
          </div>
        </div>

        {/* CARD 3: Vestibulares & Provão Paulista */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#D32F2F]/30 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 text-[11px] font-bold">
                FUVEST & Provão SP
              </span>
              <Building2 className="w-5 h-5 text-gray-600 group-hover:text-[#D32F2F] transition-colors" />
            </div>

            <h3 className="text-lg font-bold text-[#121212] pt-0.5">
              FUVEST & Provão Paulista
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Provas clássicas de 1ª fase da USP e exame seriado do Provão Paulista com vagas diretas em universidades paulistas.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>FUVEST & Provão</span>
              <span className="text-blue-700 font-semibold">Vagas USP/Unesp</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectExam('fuvest')}
                className="inline-flex items-center justify-center py-2 px-2 rounded-xl bg-gray-100 hover:bg-[#FFEBEE] text-gray-800 hover:text-[#B71C1C] font-bold text-[11px] transition-colors cursor-pointer"
              >
                FUVEST
              </button>
              <button
                onClick={() => onSelectExam('provao_paulista')}
                className="inline-flex items-center justify-center py-2 px-2 rounded-xl bg-gray-100 hover:bg-orange-50 text-gray-800 hover:text-orange-700 font-bold text-[11px] transition-colors cursor-pointer"
              >
                Provão SP
              </button>
            </div>
          </div>
        </div>

        {/* CARD 4: Olimpíadas Científicas (OBMEP & OBA) */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#D32F2F]/30 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold">
                OBMEP & OBA
              </span>
              <Trophy className="w-5 h-5 text-amber-500" />
            </div>

            <h3 className="text-lg font-bold text-[#121212] pt-0.5">
              Olimpíadas Científicas
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Olimpíada Brasileira de Matemática (OBMEP) e Olimpíada de Astronomia (OBA) com desafios lógicos e espaciais.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>Medalhas & Premiação</span>
              <span className="text-emerald-700 font-semibold">Níveis 1 a 4</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onSelectExam('obmep')}
                className="inline-flex items-center justify-center py-2 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition-colors cursor-pointer"
              >
                OBMEP
              </button>
              <button
                onClick={() => onSelectExam('oba')}
                className="inline-flex items-center justify-center py-2 px-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-bold text-[11px] transition-colors cursor-pointer"
              >
                OBA
              </button>
            </div>
          </div>
        </div>

        {/* CARD 5: Concursos Públicos */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-[#D32F2F]/30 transition-all group">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold">
                Cebraspe / FGV / FCC
              </span>
              <Scale className="w-5 h-5 text-gray-600 group-hover:text-[#D32F2F] transition-colors" />
            </div>

            <h3 className="text-lg font-bold text-[#121212] pt-0.5">
              Concursos Públicos
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed">
              Português, Raciocínio Lógico, Noções de Direito Constitucional e Administrativo e Informática para cargos públicos.
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium">
              <span>Federais & Estaduais</span>
              <span className="text-gray-900 font-semibold">20 Questões</span>
            </div>

            <button
              onClick={() => onSelectExam('concursos')}
              className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gray-100 hover:bg-[#FFEBEE] text-gray-800 hover:text-[#B71C1C] font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Simulado Concursos</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
