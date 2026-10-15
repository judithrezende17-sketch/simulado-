'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, BookOpen, ChevronRight, Play, CheckCircle2, RotateCcw } from 'lucide-react';
import { QUESTIONS_DATABASE, EXAMS_REGISTRY } from '@/lib/questions-data';
import { ExamId, Question } from '@/lib/types';

interface SearchAndFiltersProps {
  onStartExam: (examId: ExamId) => void;
  onStartCustomQuiz?: (questions: Question[], title: string) => void;
}

export function SearchAndFilters({ onStartExam, onStartCustomQuiz }: SearchAndFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState<string>('todos');
  const [selectedSubject, setSelectedSubject] = useState<string>('todas');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('todas');

  const allSubjects = useMemo(() => {
    const set = new Set<string>();
    QUESTIONS_DATABASE.forEach(q => set.add(q.subject));
    return Array.from(set).sort();
  }, []);

  const filteredQuestions = useMemo(() => {
    return QUESTIONS_DATABASE.filter(q => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        q.prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (q.contextText && q.contextText.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesExam = selectedExam === 'todos' || q.examId === selectedExam;
      const matchesSubject = selectedSubject === 'todas' || q.subject === selectedSubject;
      const matchesDifficulty = selectedDifficulty === 'todas' || q.difficulty === selectedDifficulty;

      return matchesSearch && matchesExam && matchesSubject && matchesDifficulty;
    });
  }, [searchTerm, selectedExam, selectedSubject, selectedDifficulty]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedExam('todos');
    setSelectedSubject('todas');
    setSelectedDifficulty('todas');
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 w-full">
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold text-[#D32F2F] uppercase tracking-wider">
              Banco com 140+ Questões Oficiais
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#121212] tracking-tight">
              Buscar e Filtrar Questões de Simulados
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              {filteredQuestions.length} questões encontradas
            </span>
            {(searchTerm || selectedExam !== 'todos' || selectedSubject !== 'todas' || selectedDifficulty !== 'todas') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-medium text-gray-600 hover:text-[#D32F2F] flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Limpar filtros
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {/* Search Term Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Ex: Eletrodinâmica, Machado de Assis, Kepler..."
              className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] bg-gray-50/50"
            />
          </div>

          {/* Exam Selector */}
          <div>
            <select
              value={selectedExam}
              onChange={e => setSelectedExam(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] bg-white cursor-pointer"
            >
              <option value="todos">Todos os Exames (ENEM, FUVEST, SARESP...)</option>
              {EXAMS_REGISTRY.map(ex => (
                <option key={ex.id} value={ex.id}>
                  {ex.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Selector */}
          <div>
            <select
              value={selectedSubject}
              onChange={e => setSelectedSubject(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] bg-white cursor-pointer"
            >
              <option value="todas">Todas as Disciplinas</option>
              {allSubjects.map(sub => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D32F2F] focus:border-[#D32F2F] bg-white cursor-pointer"
            >
              <option value="todas">Todas as Dificuldades</option>
              <option value="Fácil">Fácil</option>
              <option value="Média">Média</option>
              <option value="Difícil">Difícil</option>
            </select>
          </div>
        </div>

        {/* Filtered Sample List */}
        <div className="space-y-3">
          {filteredQuestions.slice(0, 4).map(q => (
            <div
              key={q.id}
              className="p-4 rounded-xl border border-gray-200 bg-gray-50/60 hover:bg-[#FFEBEE]/20 hover:border-[#D32F2F]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFEBEE] text-[#B71C1C]">
                    {q.examName}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {q.subject} • {q.topic}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                      q.difficulty === 'Fácil'
                        ? 'bg-emerald-100 text-emerald-800'
                        : q.difficulty === 'Média'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-[#121212] line-clamp-2">
                  {q.prompt}
                </p>
              </div>

              <button
                onClick={() => onStartExam(q.examId)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-xs font-bold shrink-0 shadow-xs cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Abrir Simulado Completo</span>
              </button>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="py-8 text-center text-gray-500 text-sm">
              Nenhuma questão encontrada com os filtros selecionados. Tente termos mais amplos.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
