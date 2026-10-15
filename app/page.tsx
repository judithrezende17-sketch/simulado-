'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { WeeklySimuladoBanner } from '@/components/WeeklySimuladoBanner';
import { CategoryGrid } from '@/components/CategoryGrid';
import { SearchAndFilters } from '@/components/SearchAndFilters';
import { PedagogicalPillars } from '@/components/PedagogicalPillars';
import { ExamMatrixTeaser } from '@/components/ExamMatrixTeaser';
import { ExamRunner } from '@/components/ExamRunner';
import { ResultGabarito } from '@/components/ResultGabarito';
import { SisuSimulator } from '@/components/SisuSimulator';
import { CadernoDeErros } from '@/components/CadernoDeErros';
import { ExamCatalogView } from '@/components/ExamCatalogView';
import { AboutView } from '@/components/AboutView';
import { Footer } from '@/components/Footer';

import { EXAMS_REGISTRY, QUESTIONS_DATABASE } from '@/lib/questions-data';
import { ExamId, ExamSessionResult } from '@/lib/types';

export default function Home() {
  const [currentView, setCurrentView] = useState<
    'home' | 'exam' | 'result' | 'provas' | 'olimpiadas' | 'sisu' | 'caderno_erros' | 'sobre'
  >('home');
  const [selectedExamId, setSelectedExamId] = useState<ExamId>('enem');
  const [examResult, setExamResult] = useState<ExamSessionResult | null>(null);
  const [sisuInitialScore, setSisuInitialScore] = useState<number | undefined>(undefined);

  const startExam = (examId: ExamId) => {
    setSelectedExamId(examId);
    setCurrentView('exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishExam = (result: ExamSessionResult) => {
    setExamResult(result);
    setSisuInitialScore(result.triScore);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (view: string, examId?: ExamId) => {
    if (examId) {
      startExam(examId);
      return;
    }
    setCurrentView(view as any);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentExamDef = EXAMS_REGISTRY.find(ex => ex.id === selectedExamId) || EXAMS_REGISTRY[0];
  const currentExamQuestions = QUESTIONS_DATABASE.filter(q => q.examId === selectedExamId);

  // If in the full-focus exam mode, render the exam runner alone (immersive clean mode)
  if (currentView === 'exam') {
    return (
      <ExamRunner
        exam={currentExamDef}
        questions={currentExamQuestions}
        onFinish={handleFinishExam}
        onExit={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col text-[#121212] antialiased">
      {/* Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onStartQuickExam={() => startExam('enem')}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-16">
        {currentView === 'home' && (
          <>
            <Hero
              onStartExam={startExam}
              onExploreCategories={() => setCurrentView('provas')}
              onOpenSisu={() => setCurrentView('sisu')}
            />

            <WeeklySimuladoBanner onStartExam={startExam} />

            <CategoryGrid onSelectExam={startExam} />

            <SearchAndFilters onStartExam={startExam} />

            <PedagogicalPillars onOpenErrorNotebook={() => setCurrentView('caderno_erros')} />

            <ExamMatrixTeaser onStartExam={startExam} />
          </>
        )}

        {currentView === 'provas' && (
          <ExamCatalogView
            initialFilter="todas"
            onStartExam={startExam}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'olimpiadas' && (
          <ExamCatalogView
            initialFilter="olimpiadas"
            onStartExam={startExam}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'sisu' && (
          <SisuSimulator
            initialScore={sisuInitialScore}
            onBackToHome={() => setCurrentView('home')}
            onStartExam={startExam}
          />
        )}

        {currentView === 'caderno_erros' && (
          <CadernoDeErros
            onStartExam={startExam}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'sobre' && (
          <AboutView
            onStartExam={startExam}
            onBackToHome={() => setCurrentView('home')}
          />
        )}

        {currentView === 'result' && examResult && (
          <ResultGabarito
            result={examResult}
            onRetake={() => startExam(examResult.examId)}
            onSelectAnother={() => setCurrentView('provas')}
            onGoToSisu={(score: number) => {
              setSisuInitialScore(score);
              setCurrentView('sisu');
            }}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onSelectExam={startExam} onNavigate={handleNavigate} />
    </div>
  );
}
