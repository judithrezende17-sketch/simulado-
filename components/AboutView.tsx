'use client';

import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle2, Award, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface AboutViewProps {
  onStartExam: (examId: ExamId) => void;
  onBackToHome: () => void;
}

export function AboutView({ onStartExam, onBackToHome }: AboutViewProps) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold border border-[#FFCDD2]">
            <Heart className="w-4 h-4 text-[#D32F2F]" />
            <span>Manifesto de Educação Pública e Aberta</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            Sobre o Esc<span className="text-[#D32F2F]">Simulados</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            O <strong>EscSimulados</strong> nasceu com um propósito inegociável: <strong>democratizar o acesso à preparação de excelência para exames oficiais no Brasil</strong>. Sem necessidade de login, senhas, mensalidades ou bloqueios de tela.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-[#121212] text-sm">Acesso Totalmente Livre</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Qualquer aluno de escola pública, particular ou concurseiro pode abrir a plataforma e iniciar qualquer um dos simulados imediatamente com um clique.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-[#121212] text-sm">Mínimo de 20 Questões Comentadas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Cada caderno possui estrutura completa com cronometragem oficial, mapa de navegação e resolução passo a passo de todas as alternativas ao final.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-[#121212] text-sm">Cobertura Ampla de Bancas</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                ENEM, FUVEST (USP), SARESP, Provão Paulista, Olimpíadas Nacionais (OBMEP e OBA) e Concursos Públicos Federais e Estaduais.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                04
              </div>
              <h3 className="font-bold text-[#121212] text-sm">Simulador SISU Integrado</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Calculadora com os pesos reais das universidades públicas para estimar chances de aprovação no curso dos seus sonhos.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={onBackToHome}
              className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors cursor-pointer"
            >
              Voltar ao Início
            </button>

            <button
              onClick={() => onStartExam('enem')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              <span>Começar Simulado Grátis Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
