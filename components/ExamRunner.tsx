'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  BookOpen,
  Timer,
  Pause,
  Play,
  Maximize2,
  Minimize2,
  Save,
  CheckCircle,
  CheckCircle2,
  Flag,
  Bookmark,
  Eraser,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  Layers,
  ChevronLeft,
  ExternalLink,
} from 'lucide-react';
import { Question, ExamDefinition, UserAnswerState, ExamSessionResult } from '@/lib/types';
import { saveCompletedSession, saveExamDraft, clearExamDraft } from '@/lib/storage';

interface ExamRunnerProps {
  exam: ExamDefinition;
  questions: Question[];
  onFinish: (result: ExamSessionResult) => void;
  onExit: () => void;
}

export function ExamRunner({ exam, questions, onFinish, onExit }: ExamRunnerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswerState>>(() => {
    const initial: Record<string, UserAnswerState> = {};
    questions.forEach(q => {
      initial[q.id] = {
        selectedOption: null,
        isFlagged: false,
        isBookmarked: false,
        eliminatedOptions: [],
        timeSpentSeconds: 0,
      };
    });
    return initial;
  });
  const [secondsRemaining, setSecondsRemaining] = useState(exam.durationMinutes * 60);
  const [isPaused, setIsPaused] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSizeOffset, setFontSizeOffset] = useState(0); // -1, 0, 1, 2
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }
  }, []);

  // Current active question
  const currentQ = questions[currentIndex];
  const currentAnswer = answers[currentQ?.id] || {
    selectedOption: null,
    isFlagged: false,
    isBookmarked: false,
    eliminatedOptions: [],
    timeSpentSeconds: 0,
  };

  // Answer selections
  const handleSelectOption = useCallback((optId: 'A' | 'B' | 'C' | 'D' | 'E') => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: optId,
      },
    }));
  }, [currentQ]);

  const handleClearSelection = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        selectedOption: null,
      },
    }));
  };

  const toggleEliminateOption = (optId: string) => {
    if (!currentQ) return;
    setAnswers(prev => {
      const existing = prev[currentQ.id]?.eliminatedOptions || [];
      const updated = existing.includes(optId)
        ? existing.filter(id => id !== optId)
        : [...existing, optId];
      return {
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          eliminatedOptions: updated,
        },
      };
    });
  };

  const toggleFlagCurrent = useCallback(() => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isFlagged: !prev[currentQ.id]?.isFlagged,
      },
    }));
  }, [currentQ]);

  const toggleBookmarkCurrent = () => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: {
        ...prev[currentQ.id],
        isBookmarked: !prev[currentQ.id]?.isBookmarked,
      },
    }));
  };

  // Keyboard navigation & shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showFinishModal || isPaused) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D', 'E'].includes(key) && currentQ) {
        const optionExists = currentQ.options.some(opt => opt.id === key);
        if (optionExists) {
          handleSelectOption(key as 'A' | 'B' | 'C' | 'D' | 'E');
        }
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (key === 'F' && currentQ) {
        toggleFlagCurrent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentQ, isPaused, showFinishModal, questions.length, handleSelectOption, toggleFlagCurrent]);

  // Stats calculation
  const totalQuestions = questions.length;
  const answeredCount = Object.values(answers).filter(a => a.selectedOption !== null).length;
  const flaggedCount = Object.values(answers).filter(a => a.isFlagged).length;
  const pendingCount = totalQuestions - answeredCount;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  // Time calculations
  const totalSeconds = exam.durationMinutes * 60;
  const elapsedSeconds = totalSeconds - secondsRemaining;
  const avgSecondsPerQ = answeredCount > 0 ? Math.round(elapsedSeconds / answeredCount) : 0;

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Submit and calculate complete results
  const handleSubmitExam = () => {
    let correctCount = 0;
    const subjectMap: Record<string, { total: number; correct: number }> = {};

    questions.forEach(q => {
      if (!subjectMap[q.subject]) {
        subjectMap[q.subject] = { total: 0, correct: 0 };
      }
      subjectMap[q.subject].total += 1;

      const userAns = answers[q.id]?.selectedOption;
      if (userAns === q.correctOption) {
        correctCount += 1;
        subjectMap[q.subject].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // TRI estimation formula for Brazilian exams (linear scale roughly 400 - 850 pts)
    const baseTri = 420;
    const calculatedTri = Math.round(baseTri + percentage * 4.3);

    const subjectStats = Object.entries(subjectMap).map(([subject, stat]) => ({
      subject,
      total: stat.total,
      correct: stat.correct,
      percentage: Math.round((stat.correct / stat.total) * 100),
    }));

    const result: ExamSessionResult = {
      examId: exam.id,
      examTitle: exam.title,
      totalQuestions,
      answeredCount,
      correctCount,
      wrongCount: totalQuestions - correctCount,
      percentage,
      triScore: calculatedTri,
      timeSpentSeconds: elapsedSeconds,
      completedAt: new Date().toISOString(),
      answers,
      subjectStats,
    };

    saveCompletedSession(result);
    clearExamDraft(exam.id);
    onFinish(result);
  };

  const handleSubmitRef = useRef(handleSubmitExam);
  useEffect(() => {
    handleSubmitRef.current = handleSubmitExam;
  });

  // Real-time Countdown timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Handle Save and Exit
  const handleSaveAndExit = () => {
    saveExamDraft(exam.id, {
      currentIndex,
      answers,
      secondsRemaining,
    });
    alert('Progresso salvo com sucesso! Você pode retomar este simulado quando retornar.');
    onExit();
  };

  if (!currentQ) return null;

  // Visual warning when less than 5 minutes remain
  const isTimeCritical = secondsRemaining <= 300;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#121212] flex flex-col">
      {/* STICKY TOP BAR (Image 3 design) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col gap-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Left: Exam Info */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={onExit}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors shrink-0 cursor-pointer"
                title="Voltar ao início"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-base sm:text-lg text-[#121212] truncate">
                    {exam.title}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-bold">
                    Caderno Oficial
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                    Questão {currentIndex + 1} de {totalQuestions}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {currentQ.subject} • {currentQ.topic}
                </p>
              </div>
            </div>

            {/* Right: Chronometer & Global Controls */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Chronometer */}
              <div
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs transition-colors ${
                  isTimeCritical
                    ? 'bg-[#D32F2F] text-white animate-pulse'
                    : 'bg-[#FFEBEE] text-[#B71C1C] border border-[#FFCDD2]'
                }`}
              >
                <Timer className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              {/* Pause Button */}
              <button
                onClick={() => setIsPaused(true)}
                className="h-9 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                title="Pausar simulado"
              >
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Pausar</span>
              </button>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center shadow-xs cursor-pointer"
                title="Modo Foco Total"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <div className="h-5 w-px bg-gray-200 hidden md:block" />

              {/* Save & Exit */}
              <button
                onClick={handleSaveAndExit}
                className="h-9 px-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold hidden lg:flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar</span>
              </button>

              {/* Finish Exam Button */}
              <button
                onClick={() => setShowFinishModal(true)}
                className="h-9 px-4 rounded-lg bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold transition-all shadow-xs active:scale-95 flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Finalizar</span>
              </button>
            </div>
          </div>

          {/* Continuous Progress Bar */}
          <div className="w-full flex items-center gap-3 pt-1">
            <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
              <div
                className="bg-[#D32F2F] h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-mono text-xs text-gray-600 font-semibold shrink-0">
              {progressPercent}% Concluído ({answeredCount} de {totalQuestions} respondidas)
            </span>
          </div>
        </div>
      </header>

      {/* MAIN TEST WORKBENCH (8 Cols Question / 4 Cols Question Matrix) */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* CENTRAL QUESTION AREA (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <article className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm flex flex-col gap-6">
              {/* Question Header & Tools */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 -mx-6 -mt-6 sm:-mx-8 sm:-mt-8 p-4 sm:px-6 rounded-t-2xl border-b border-gray-200">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-xl font-extrabold text-[#121212]">
                    Questão {currentIndex + 1}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-bold">
                    {currentQ.examName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FFEBEE] text-[#B71C1C] text-xs font-semibold">
                    {currentQ.topic}
                  </span>
                </div>

                {/* Accessibility and Action Tools */}
                <div className="flex items-center gap-1.5">
                  {/* Font Size decrease */}
                  <button
                    onClick={() => setFontSizeOffset(prev => Math.max(-1, prev - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                    title="Diminuir tamanho da fonte"
                  >
                    A-
                  </button>

                  {/* Font Size increase */}
                  <button
                    onClick={() => setFontSizeOffset(prev => Math.min(2, prev + 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                    title="Aumentar tamanho da fonte"
                  >
                    A+
                  </button>

                  <div className="w-px h-5 bg-gray-300 mx-1" />

                  {/* Bookmark Button */}
                  <button
                    onClick={toggleBookmarkCurrent}
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                      currentAnswer.isBookmarked
                        ? 'bg-amber-50 border-amber-300 text-amber-600'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Favoritar questão"
                  >
                    <Bookmark className={`w-4 h-4 ${currentAnswer.isBookmarked ? 'fill-current' : ''}`} />
                  </button>

                  {/* Flag for Review Button */}
                  <button
                    onClick={toggleFlagCurrent}
                    className={`h-8 px-2.5 rounded-lg border flex items-center gap-1.5 text-xs font-bold transition-colors cursor-pointer ${
                      currentAnswer.isFlagged
                        ? 'bg-[#FFEBEE] border-[#FFCDD2] text-[#D32F2F]'
                        : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title="Marcar para Revisão posterior"
                  >
                    <Flag className={`w-3.5 h-3.5 ${currentAnswer.isFlagged ? 'fill-current' : ''}`} />
                    <span>Revisar</span>
                  </button>
                </div>
              </div>

              {/* Enunciado da Questão */}
              <div
                className="space-y-4 text-[#121212]"
                style={{
                  fontSize:
                    fontSizeOffset === -1
                      ? '0.9rem'
                      : fontSizeOffset === 1
                      ? '1.1rem'
                      : fontSizeOffset === 2
                      ? '1.25rem'
                      : '1rem',
                }}
              >
                {/* Context Text Box (Texto de Apoio) */}
                {currentQ.contextText && (
                  <div className="bg-gray-50 border-l-4 border-[#D32F2F] rounded-r-xl p-4 sm:p-5">
                    <span className="text-[11px] font-bold text-[#D32F2F] uppercase tracking-wider block mb-1.5">
                      Texto I / Contexto
                    </span>
                    <p className="text-gray-800 leading-relaxed text-justify">
                      {currentQ.contextText}
                    </p>
                    {currentQ.sourceReference && (
                      <span className="block text-right text-xs text-gray-500 italic mt-2">
                        {currentQ.sourceReference}
                      </span>
                    )}
                  </div>
                )}

                {/* Prompt Principal da Questão */}
                <div className="pt-2">
                  <p className="font-bold text-[#121212] leading-relaxed text-base sm:text-lg">
                    {currentQ.prompt}
                  </p>
                </div>
              </div>

              {/* Alternativas (A, B, C, D, E) */}
              <div className="space-y-2.5 pt-2">
                {currentQ.options.map(opt => {
                  const isSelected = currentAnswer.selectedOption === opt.id;
                  const isEliminated = currentAnswer.eliminatedOptions?.includes(opt.id);

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`relative flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer group select-none ${
                        isSelected
                          ? 'border-[#D32F2F] bg-[#FFEBEE]/50 shadow-xs'
                          : 'border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300'
                      } ${isEliminated ? 'opacity-40 line-through bg-gray-100' : ''}`}
                    >
                      {/* Option Letter Badge */}
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-transform group-hover:scale-105 ${
                          isSelected
                            ? 'bg-[#D32F2F] text-white shadow-xs'
                            : 'bg-gray-100 text-gray-800 border border-gray-300'
                        }`}
                      >
                        {opt.id}
                      </span>

                      {/* Option Text */}
                      <div className="flex-1 pt-1 text-sm sm:text-base text-gray-900 leading-snug">
                        {opt.text}
                      </div>

                      {/* Strikethrough Eliminator Button (Ink Eraser) */}
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          toggleEliminateOption(opt.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-gray-400 hover:text-[#D32F2F] hover:bg-gray-100 transition-all cursor-pointer"
                        title={isEliminated ? 'Desfazer eliminação' : 'Eliminar alternativa (riscar)'}
                      >
                        <Eraser className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Question Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="h-10 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Questão Anterior</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleFlagCurrent}
                    className={`h-10 px-3 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      currentAnswer.isFlagged
                        ? 'bg-[#FFEBEE] border-[#FFCDD2] text-[#D32F2F]'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Marcar Dúvida</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearSelection}
                    disabled={!currentAnswer.selectedOption}
                    className="h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Limpar Resposta</span>
                  </button>
                </div>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex(prev => prev + 1)}
                    className="h-10 px-5 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer ml-auto sm:ml-0"
                  >
                    <span>Próxima Questão</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowFinishModal(true)}
                    className="h-10 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer ml-auto sm:ml-0"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Finalizar e Ver Resultado</span>
                  </button>
                )}
              </div>
            </article>

            {/* Keyboard Shortcuts Hint Bar */}
            <div className="p-3 bg-gray-100/80 rounded-xl border border-gray-200 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#121212]">Atalhos:</span>
                <span>[A-E] Seleciona</span>
                <span>•</span>
                <span>[←/→] Navega</span>
                <span>•</span>
                <span>[F] Sinalizar</span>
              </div>
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                Respostas salvas automaticamente
              </span>
            </div>
          </div>

          {/* RIGHT SIDEBAR: QUESTION MATRIX & PACING (4 Columns) */}
          <aside className="lg:col-span-4 flex flex-col gap-4 sticky top-28">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                <div>
                  <h3 className="font-extrabold text-base text-[#121212]">
                    Navegação da Prova
                  </h3>
                  <p className="text-xs text-gray-500">Caderno Geral: {totalQuestions} Questões</p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-[#FFEBEE] text-[#B71C1C] font-mono text-xs font-extrabold">
                  {currentIndex + 1} / {totalQuestions}
                </span>
              </div>

              {/* Visual Legend */}
              <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-[#121212]" />
                  <span className="text-gray-700">
                    Respondida <strong>({answeredCount})</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded border-2 border-[#D32F2F] bg-white text-[#D32F2F]" />
                  <span className="text-[#D32F2F] font-bold">
                    Atual <strong>({currentIndex + 1})</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-amber-400" />
                  <span className="text-gray-700">
                    Revisar <strong>({flaggedCount})</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-gray-200" />
                  <span className="text-gray-700">
                    Pendente <strong>({pendingCount})</strong>
                  </span>
                </div>
              </div>

              {/* Numeric Matrix Grid (5 Columns) */}
              <div className="grid grid-cols-5 gap-2 select-none">
                {questions.map((q, idx) => {
                  const ans = answers[q.id];
                  const isCurrent = idx === currentIndex;
                  const isAnswered = ans && ans.selectedOption !== null;
                  const isFlagged = ans && ans.isFlagged;

                  let buttonClass = 'bg-gray-100 hover:bg-gray-200 text-gray-700';

                  if (isCurrent) {
                    buttonClass =
                      'bg-white text-[#D32F2F] border-2 border-[#D32F2F] shadow-sm scale-105 font-black ring-2 ring-[#FFEBEE]';
                  } else if (isAnswered) {
                    buttonClass = 'bg-[#121212] text-white hover:bg-gray-800';
                  }

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-9 rounded-lg font-mono text-xs font-bold transition-all relative flex items-center justify-center cursor-pointer ${buttonClass}`}
                      title={`Ir para Questão ${idx + 1}`}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500 border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pacing Stats */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100 space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Média por questão:</span>
                  <span className="font-bold text-[#121212]">
                    {avgSecondsPerQ > 0 ? `${Math.floor(avgSecondsPerQ / 60)}m ${avgSecondsPerQ % 60}s` : '--'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Tempo decorrido:</span>
                  <span className="font-bold text-[#121212]">{formatTime(elapsedSeconds)}</span>
                </div>
              </div>

              {/* Submit Final Button */}
              <button
                type="button"
                onClick={() => setShowFinishModal(true)}
                className="w-full h-11 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Entregar Gabarito Definitivo</span>
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* PAUSE MODAL */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center mx-auto shadow-sm">
              <Pause className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-[#121212]">Simulado em Pausa</h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                O cronômetro foi congelado em{' '}
                <strong className="text-[#D32F2F] font-mono">{formatTime(secondsRemaining)}</strong>. As
                questões foram ocultadas temporariamente para garantir a lisura e precisão do seu treino.
              </p>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-700">
              Você pode retomar de onde parou sem perda de respostas.
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => setIsPaused(false)}
                className="w-full h-11 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Retomar Prova Agora</span>
              </button>

              <button
                onClick={handleSaveAndExit}
                className="w-full h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Salvar Progresso e Sair
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FINISH CONFIRMATION MODAL */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#FFEBEE] text-[#D32F2F] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#121212]">
                Finalizar {exam.title}?
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Confira o status de preenchimento do seu gabarito antes do envio definitivo:
              </p>
            </div>

            {/* Status Summary Grid */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-50 rounded-xl text-center border border-gray-100">
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-emerald-700">{answeredCount}</span>
                <span className="text-xs text-gray-500 font-semibold">Respondidas</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-amber-600">{flaggedCount}</span>
                <span className="text-xs text-gray-500 font-semibold">Em Dúvida</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-[#D32F2F]">{pendingCount}</span>
                <span className="text-xs text-gray-500 font-semibold">Em Branco</span>
              </div>
            </div>

            {pendingCount > 0 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  Atenção: Você ainda possui <strong>{pendingCount} questões em branco</strong>. Questões não
                  respondidas serão computadas como erro no gabarito oficial.
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="flex-1 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs transition-colors cursor-pointer"
              >
                Voltar para a Prova
              </button>

              <button
                type="button"
                onClick={handleSubmitExam}
                className="flex-1 h-11 rounded-xl bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Sim, Entregar e Ver Gabarito</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
