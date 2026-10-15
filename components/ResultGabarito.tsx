'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Sparkles,
  ArrowRight,
  TrendingUp,
  BookmarkPlus,
  BookmarkCheck,
  Check,
  X,
  Share2,
} from 'lucide-react';
import { ExamSessionResult, Question } from '@/lib/types';
import { QUESTIONS_DATABASE } from '@/lib/questions-data';
import { addQuestionToErrorNotebook, getErrorNotebookQuestionIds } from '@/lib/storage';

interface ResultGabaritoProps {
  result: ExamSessionResult;
  onRetake: () => void;
  onSelectAnother: () => void;
  onGoToSisu: (triScore: number) => void;
}

export function ResultGabarito({
  result,
  onRetake,
  onSelectAnother,
  onGoToSisu,
}: ResultGabaritoProps) {
  const [filterType, setFilterType] = useState<'todas' | 'acertos' | 'erros' | 'duvidas'>('todas');
  const [savedErrorIds, setSavedErrorIds] = useState<string[]>(() => getErrorNotebookQuestionIds());
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    // Trigger confetti if scored 60% or above
    if (result.percentage >= 60) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D32F2F', '#2E7D32', '#1565C0', '#FBC02D'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [result.percentage]);

  const examQuestions = QUESTIONS_DATABASE.filter(q => q.examId === result.examId);

  const filteredQuestions = examQuestions.filter(q => {
    const userAns = result.answers[q.id]?.selectedOption;
    const isCorrect = userAns === q.correctOption;
    const isFlagged = result.answers[q.id]?.isFlagged;

    if (filterType === 'acertos') return isCorrect;
    if (filterType === 'erros') return !isCorrect;
    if (filterType === 'duvidas') return isFlagged;
    return true;
  });

  const handleSaveToErrorNotebook = (qId: string) => {
    addQuestionToErrorNotebook(qId);
    setSavedErrorIds(prev => [...prev, qId]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${String(s).padStart(2, '0')}s`;
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Fiz o simulado ${result.examTitle} no EscSimulados e acertei ${result.correctCount}/${result.totalQuestions} (${result.percentage}%)! Nota TRI estimada: ${result.triScore} pontos. Experimente grátis!`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* TOP SCORE CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-50 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Simulado Concluído com Sucesso</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#121212] tracking-tight">
                Resultado Oficial: {result.examTitle}
              </h1>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Confira seu desempenho consolidado, análise por disciplina e a resolução comentada passo a passo de todas as 20 questões.
              </p>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => onGoToSisu(result.triScore)}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs sm:text-sm font-bold shadow-sm transition-all cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Simular Nota no SISU</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedShare ? 'Copiado!' : 'Compartilhar'}</span>
              </button>
            </div>
          </div>

          {/* Metrics 4-Block Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-100">
            {/* Acertos */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Acertos Totais
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-emerald-700">
                  {result.correctCount}
                </span>
                <span className="text-sm font-bold text-gray-500">/ {result.totalQuestions}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 mt-1">
                {result.percentage}% de rendimento
              </span>
            </div>

            {/* Nota TRI Estimada */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Nota TRI Estimada
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#D32F2F]">
                  {result.triScore}
                </span>
                <span className="text-sm font-bold text-gray-500">pts</span>
              </div>
              <span className="text-xs font-semibold text-gray-600 mt-1">
                Calibragem modelo ENEM/Vunesp
              </span>
            </div>

            {/* Tempo Total */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Tempo Gasto
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#121212]">
                  {formatTime(result.timeSpentSeconds)}
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-600 mt-1">
                Média:{' '}
                {result.answeredCount > 0
                  ? formatTime(Math.round(result.timeSpentSeconds / result.answeredCount))
                  : '--'}{' '}
                / questão
              </span>
            </div>

            {/* Classificação Estimada */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col">
              <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                Percentil Nacional
              </span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl sm:text-4xl font-black text-[#121212]">
                  {result.percentage >= 80 ? 'Top 5%' : result.percentage >= 60 ? 'Top 20%' : 'Top 50%'}
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-700 mt-1">
                Comparativo nacional
              </span>
            </div>
          </div>

          {/* Subject Performance Breakdown */}
          {result.subjectStats.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                Aproveitamento por Disciplina
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {result.subjectStats.map((sub, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-gray-200 text-xs">
                    <div className="flex justify-between font-semibold mb-1">
                      <span className="text-gray-800 truncate">{sub.subject}</span>
                      <span className="text-[#D32F2F] font-mono font-bold">{sub.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-[#D32F2F] h-1.5 rounded-full"
                        style={{ width: `${sub.percentage}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-500 mt-1 block">
                      {sub.correct} de {sub.total} acertos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* GABARITO COMENTADO SECTION */}
        <div className="space-y-6">
          {/* Section Header & Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
                Gabarito Detalhado Oficial
              </span>
              <h2 className="text-2xl font-extrabold text-[#121212] tracking-tight">
                Resolução Comentada Questão a Questão
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setFilterType('todas')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterType === 'todas'
                    ? 'bg-[#D32F2F] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Todas ({examQuestions.length})
              </button>
              <button
                onClick={() => setFilterType('acertos')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterType === 'acertos'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Acertos ({result.correctCount})
              </button>
              <button
                onClick={() => setFilterType('erros')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterType === 'erros'
                    ? 'bg-[#B71C1C] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Erros ({result.wrongCount})
              </button>
              <button
                onClick={() => setFilterType('duvidas')}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  filterType === 'duvidas'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Marcadas ({Object.values(result.answers).filter(a => a.isFlagged).length})
              </button>
            </div>
          </div>

          {/* Question Cards List */}
          <div className="space-y-6">
            {filteredQuestions.map((q, idx) => {
              const userAns = result.answers[q.id]?.selectedOption;
              const isCorrect = userAns === q.correctOption;
              const isSavedInErrors = savedErrorIds.includes(q.id);

              return (
                <div
                  key={q.id}
                  className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs space-y-5"
                >
                  {/* Question Status Badge Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-lg font-black text-[#121212]">
                        Questão {examQuestions.findIndex(item => item.id === q.id) + 1}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold">
                        {q.subject} • {q.topic}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Você acertou</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold border border-[#FFCDD2]">
                          <XCircle className="w-3.5 h-3.5 text-[#D32F2F]" />
                          <span>
                            {userAns ? `Você marcou (${userAns})` : 'Em branco'} • Gabarito ({q.correctOption})
                          </span>
                        </span>
                      )}

                      {/* Add to Error Notebook Button */}
                      <button
                        onClick={() => handleSaveToErrorNotebook(q.id)}
                        disabled={isSavedInErrors}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSavedInErrors
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                        title="Salvar no Caderno de Erros para revisão periódica"
                      >
                        {isSavedInErrors ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>No Caderno</span>
                          </>
                        ) : (
                          <>
                            <BookmarkPlus className="w-3.5 h-3.5 text-gray-500" />
                            <span>Salvar no Caderno</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Context text if present */}
                  {q.contextText && (
                    <div className="bg-gray-50 rounded-xl p-4 text-xs sm:text-sm text-gray-700 italic border-l-4 border-gray-300">
                      &ldquo;{q.contextText}&rdquo;
                    </div>
                  )}

                  {/* Prompt */}
                  <p className="font-bold text-[#121212] text-sm sm:text-base leading-relaxed">
                    {q.prompt}
                  </p>

                  {/* Alternatives Stack */}
                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isOptionCorrect = opt.id === q.correctOption;
                      const isOptionSelected = opt.id === userAns;

                      let style = 'bg-gray-50/70 border-gray-200 text-gray-800';
                      let badgeStyle = 'bg-white border-gray-300 text-gray-700';

                      if (isOptionCorrect) {
                        style = 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-semibold';
                        badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                      } else if (isOptionSelected && !isOptionCorrect) {
                        style = 'bg-[#FFEBEE] border-[#D32F2F] text-[#B71C1C] line-through';
                        badgeStyle = 'bg-[#D32F2F] text-white border-[#D32F2F]';
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`flex items-start gap-3 p-3 rounded-xl border ${style}`}
                        >
                          <span
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${badgeStyle}`}
                          >
                            {opt.id}
                          </span>
                          <span className="flex-1 pt-0.5 text-xs sm:text-sm leading-snug">
                            {opt.text}
                          </span>
                          {isOptionCorrect && (
                            <span className="text-xs text-emerald-700 font-bold px-2 py-0.5 rounded bg-emerald-100 shrink-0">
                              Gabarito Correto
                            </span>
                          )}
                          {isOptionSelected && !isOptionCorrect && (
                            <span className="text-xs text-[#D32F2F] font-bold px-2 py-0.5 rounded bg-red-100 shrink-0">
                              Sua Escolha
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Pedagogical Commentary & Step by step explanation */}
                  <div className="bg-[#FFEBEE]/40 border border-[#FFCDD2] rounded-xl p-4 sm:p-5 space-y-2">
                    <span className="text-xs font-bold text-[#B71C1C] uppercase tracking-wider flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#D32F2F]" />
                      Resolução Comentada & Análise Pedagógica
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
                </div>
              );
            })}
          </div>

          {/* Bottom Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white rounded-2xl border border-gray-200 shadow-sm mt-8">
            <button
              onClick={onSelectAnother}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Escolher Outra Prova</span>
            </button>

            <button
              onClick={onRetake}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Refazer Este Simulado</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
