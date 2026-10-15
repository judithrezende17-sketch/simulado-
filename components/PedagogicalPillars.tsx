'use client';

import React from 'react';
import { Clock, LineChart, Wrench, Check, ArrowRight } from 'lucide-react';

interface PedagogicalPillarsProps {
  onOpenErrorNotebook: () => void;
}

export function PedagogicalPillars({ onOpenErrorNotebook }: PedagogicalPillarsProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12 space-y-2">
        <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
          Metodologia Científica
        </span>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#121212] tracking-tight">
          Diferenciais pensados para a sua aprovação
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          A mesma pressão e condições do dia oficial, com tecnologia que diagnostica suas lacunas de aprendizado em tempo recorde.
        </p>
      </div>

      {/* 3 Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Cronometragem Real */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Cronometragem Real com Simulação de Prova
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Gerencie o tempo exato por questão (média de 3 minutos no ENEM). O sistema avisa o momento ideal de passar o gabarito e encerra com precisão de bancas reais.
            </p>
          </div>

          {/* Visual Element: Interactive Pace Gauge */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-600 font-medium">Ritmo por Questão</span>
              <span className="text-[#D32F2F] font-mono font-bold">02m 45s / meta 03m</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-[#D32F2F] h-2.5 rounded-full transition-all duration-500" style={{ width: '78%' }} />
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-2.5 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Dentro do tempo seguro para gabarito</span>
            </p>
          </div>
        </div>

        {/* Pillar 2: Análise de Desempenho TRI */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <LineChart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Análise de Desempenho por Habilidade e Matéria
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Descubra em qual competência específica você perde pontos. Métricas comparativas com os 10% melhores colocados no ranking para orientar o seu estudo.
            </p>
          </div>

          {/* Visual Element: Mini Radar / Skill Matrix SVG */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
            <svg className="w-16 h-16 shrink-0" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.2"
              />
              <path
                className="text-[#D32F2F]"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray="82, 100"
                strokeLinecap="round"
                strokeWidth="3.2"
              />
              <text
                className="text-gray-900 font-bold text-[8px] font-mono"
                fill="currentColor"
                textAnchor="middle"
                x="18"
                y="20.5"
              >
                82%
              </text>
            </svg>
            <div className="flex flex-col text-xs">
              <span className="font-bold text-gray-900">Matemática Pura</span>
              <span className="text-gray-500 text-[11px] mt-0.5">Geometria Espacial necessita revisão</span>
              <span className="text-[#D32F2F] text-[11px] font-bold mt-1.5 flex items-center gap-0.5">
                Top 4% Nacional
              </span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Caderno de Erros Inteligente */}
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFEBEE] flex items-center justify-center text-[#D32F2F]">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#121212]">
              Caderno de Erros Inteligente para Revisão
            </h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              Questões que você errou ou sinalizou com dúvida são catalogadas automaticamente em cadernos de repetição espaçada até você fixar o conteúdo.
            </p>
          </div>

          {/* Visual Element: Smart Review Deck Preview */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-gray-700">Para Revisar Hoje</span>
              <span className="px-2 py-0.5 rounded-full bg-[#D32F2F] text-white text-[10px] font-bold">
                18 Questões
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-[#D32F2F]" />
              <span>Estequiometria (Química) • 4 erros recentes</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Orações Subordinadas (Gramática) • 2 erros</span>
            </div>
            <button
              onClick={onOpenErrorNotebook}
              className="w-full mt-2 pt-2 text-xs text-[#D32F2F] font-bold hover:underline flex items-center justify-center gap-1 cursor-pointer border-t border-gray-200"
            >
              <span>Acessar Meu Caderno de Erros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
