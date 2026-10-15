'use client';

import React, { useState, useEffect } from 'react';
import {
  Wrench,
  BookOpen,
  Trash2,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  FolderOpen,
} from 'lucide-react';
import { Question, ExamId } from '@/lib/types';
import { getErrorNotebookQuestions, removeQuestionFromErrorNotebook } from '@/lib/storage';

interface CadernoDeErrosProps {
  onStartExam: (examId: ExamId) => void;
  onBackToHome: () => void;
}

export function CadernoDeErros({ onStartExam, onBackToHome }: CadernoDeErrosProps) {
  const [questions, setQuestions] = useState<Question[]>(() => getErrorNotebookQuestions());
  const [activeAnswers, setActiveAnswers] = useState<Record<string, string>>({});
  const [revealedExplanations, setRevealedExplanations] = useState<Record<string, boolean>>({});

  const handleSelectOption = (qId: string, optId: string) => {
    setActiveAnswers(prev => ({ ...prev, [qId]: optId }));
    setRevealedExplanations(prev => ({ ...prev, [qId]: true }));
  };

  const handleRemove = (qId: string) => {
    removeQuestionFromErrorNotebook(qId);
    setQuestions(prev => prev.filter(q => q.id !== qId));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold border border-[#FFCDD2]">
            <Wrench className="w-4 h-4 text-[#D32F2F]" />
            <span>Repetição Espaçada Pedagógica</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
            Caderno de Erros & Questões Marcadas
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl">
            Questões que você errou ou marcou para revisão durante os simulados são arquivadas aqui automaticamente. Refaça cada uma até dominar o conteúdo e remover as lacunas de aprendizagem.
          </p>
        </div>

        {/* Counter Bar */}
        <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-[#D32F2F]" />
            <span className="text-sm font-bold text-[#121212]">
              {questions.length} questões no seu caderno para revisão
            </span>
          </div>

          <button
            onClick={() => onStartExam('enem')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <span>Fazer Novo Simulado</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* List of Error Questions */}
        {questions.length > 0 ? (
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const selectedOpt = activeAnswers[q.id];
              const isRevealed = revealedExplanations[q.id];
              const isCorrect = selectedOpt === q.correctOption;

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold">
                        {q.examName}
                      </span>
                      <span className="text-xs text-gray-600 font-medium">
                        {q.subject} • {q.topic}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 font-semibold text-gray-700">
                        {q.difficulty}
                      </span>
                    </div>

                    <button
                      onClick={() => handleRemove(q.id)}
                      className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#D32F2F] transition-colors cursor-pointer"
                      title="Remover do caderno (quando já tiver dominado)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover do Caderno</span>
                    </button>
                  </div>

                  {q.contextText && (
                    <div className="bg-gray-50 rounded-xl p-4 text-xs sm:text-sm text-gray-700 italic border-l-4 border-[#D32F2F]">
                      &ldquo;{q.contextText}&rdquo;
                    </div>
                  )}

                  <p className="font-bold text-[#121212] text-sm sm:text-base leading-relaxed">
                    {q.prompt}
                  </p>

                  {/* Interactive Alternatives to Retry */}
                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isOptionSelected = selectedOpt === opt.id;
                      const isOptionCorrect = opt.id === q.correctOption;

                      let style = 'bg-white border-gray-200 hover:bg-gray-50';
                      let badge = 'bg-gray-100 text-gray-700';

                      if (isRevealed) {
                        if (isOptionCorrect) {
                          style = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold';
                          badge = 'bg-emerald-600 text-white';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          style = 'bg-red-50 border-[#D32F2F] text-red-950 line-through';
                          badge = 'bg-[#D32F2F] text-white';
                        }
                      } else if (isOptionSelected) {
                        style = 'bg-[#FFEBEE] border-[#D32F2F]';
                        badge = 'bg-[#D32F2F] text-white';
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => handleSelectOption(q.id, opt.id)}
                          className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-all cursor-pointer ${style}`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${badge}`}
                          >
                            {opt.id}
                          </span>
                          <span className="flex-1 pt-0.5 text-xs sm:text-sm leading-snug">
                            {opt.text}
                          </span>
                          {isRevealed && isOptionCorrect && (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded shrink-0">
                              Gabarito Correto
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Resolution Box */}
                  {isRevealed && (
                    <div className="bg-[#FFEBEE]/40 border border-[#FFCDD2] rounded-xl p-4 sm:p-5 space-y-2">
                      <span className="text-xs font-bold text-[#B71C1C] uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#D32F2F]" />
                        Explicação & Gabarito Comentado
                      </span>
                      <p className="text-xs sm:text-sm text-gray-900 leading-relaxed text-justify">
                        {q.explanation}
                      </p>
                      {q.skillsEvaluated && (
                        <p className="text-[11px] text-gray-600 font-semibold pt-1">
                          🎯 {q.skillsEvaluated}
                        </p>
                      )}
                    </div>
                  )}

                  {!isRevealed && (
                    <button
                      onClick={() => setRevealedExplanations(prev => ({ ...prev, [q.id]: true }))}
                      className="text-xs font-bold text-[#D32F2F] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Ver Gabarito Comentado</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 shadow-sm space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-xl font-bold text-[#121212]">
              Seu Caderno de Erros está Limpo!
            </h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Parabéns! Você não possui questões pendentes de revisão. Realize novos simulados para continuar afiando seu desempenho.
            </p>
            <button
              onClick={() => onStartExam('enem')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#D32F2F] text-white font-bold text-xs shadow-sm hover:bg-[#B71C1C] transition-all cursor-pointer"
            >
              <span>Iniciar Simulado ENEM</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
