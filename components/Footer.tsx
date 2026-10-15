'use client';

import React from 'react';
import { BookOpen, ShieldCheck, CheckCircle } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface FooterProps {
  onSelectExam?: (examId: ExamId) => void;
  onNavigate?: (view: string) => void;
}

export function Footer({ onSelectExam, onNavigate }: FooterProps) {
  return (
    <footer className="w-full bg-[#F5F5F5] text-gray-600 border-t border-gray-200 mt-12 sm:mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D32F2F] flex items-center justify-center text-white shadow-xs">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[#121212]">
                Esc<span className="text-[#D32F2F]">Simulados</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 max-w-sm leading-relaxed">
              Plataforma aberta de alta precisão pedagógica para estudantes e concurseiros de todo o Brasil. Resolução de simulados alinhados às matrizes oficiais do ENEM, FUVEST, SARESP, Provão Paulista, OBMEP, OBA e concursos.
            </p>

            <div className="flex items-center gap-2 text-xs font-semibold flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-gray-200 text-emerald-800 shadow-xs">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Padrão INEP / MEC
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-gray-200 text-gray-800 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                Acesso 100% Livre
              </span>
            </div>
          </div>

          {/* Níveis & Bancas */}
          <div>
            <h4 className="text-xs font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Níveis & Bancas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('saresp')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  SARESP (Ensino Fundamental & Médio)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('enem')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  ENEM Nacional Oficial
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('fuvest')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  FUVEST & Vestibulares Paulistas
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('provao_paulista')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  Provão Paulista Seriado
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('concursos')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  Concursos Federais e Estaduais
                </button>
              </li>
            </ul>
          </div>

          {/* Disciplinas */}
          <div>
            <h4 className="text-xs font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Olimpíadas & Disciplinas
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('obmep')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  OBMEP (Olimpíada de Matemática)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectExam && onSelectExam('oba')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  OBA (Astronomia & Astronáutica)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('sisu')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  Calculadora de Notas SISU
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate && onNavigate('caderno_erros')}
                  className="hover:text-[#D32F2F] transition-colors cursor-pointer text-left"
                >
                  Caderno de Erros Inteligente
                </button>
              </li>
            </ul>
          </div>

          {/* Suporte & Metodologia */}
          <div>
            <h4 className="text-xs font-bold text-[#121212] mb-3 uppercase tracking-wider">
              Metodologia & Transparência
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="text-gray-600">Simulação no Modelo TRI</li>
              <li className="text-gray-600">Gabarito com Resolução Passo a Passo</li>
              <li className="text-gray-600">Cronometragem Regressiva Oficial</li>
              <li className="text-gray-600">Sem Cadastro Obrigatório</li>
              <li className="text-gray-600">Termos de Uso Abertos</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2025 EscSimulados Educação Digital Ltda. Todos os direitos reservados.</p>
          <p className="font-medium text-[#121212]">
            Feito para estudantes focados em aprovação nacional.
          </p>
        </div>
      </div>
    </footer>
  );
}
