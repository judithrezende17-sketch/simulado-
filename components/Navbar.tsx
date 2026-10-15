'use client';

import React, { useState } from 'react';
import { BookOpen, Sparkles, HelpCircle, Flame, Menu, X, CheckCircle2 } from 'lucide-react';
import { ExamId } from '@/lib/types';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, examId?: ExamId) => void;
  onStartQuickExam: () => void;
}

export function Navbar({ currentView, onNavigate, onStartQuickExam }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group text-left cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D32F2F] to-[#B71C1C] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-[#121212]">
                  Esc<span className="text-[#D32F2F]">Simulados</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#FFEBEE] text-[#B71C1C]">
                  Brasil
                </span>
              </div>
            </div>
          </button>

          {/* 100% Livre Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Acesso Totalmente Livre</span>
          </div>
        </div>

        {/* Desktop Quick Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'home'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Início
          </button>

          <button
            onClick={() => onNavigate('provas')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'provas'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Simulados por Prova
          </button>

          <button
            onClick={() => onNavigate('olimpiadas')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'olimpiadas'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Olimpíadas (OBMEP & OBA)
          </button>

          <button
            onClick={() => onNavigate('sisu')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              currentView === 'sisu'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#D32F2F]" />
            <span>Simulador SISU</span>
          </button>

          <button
            onClick={() => onNavigate('caderno_erros')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'caderno_erros'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Caderno de Erros
          </button>

          <button
            onClick={() => onNavigate('sobre')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              currentView === 'sobre'
                ? 'text-[#D32F2F] bg-[#FFEBEE]/60'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            Sobre
          </button>
        </nav>

        {/* Action Button: Começar Simulado Rápido */}
        <div className="flex items-center gap-2">
          <button
            onClick={onStartQuickExam}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#D32F2F] hover:bg-[#B71C1C] text-white text-sm font-bold shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>Começar Simulado Rápido</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>100% Livre • Sem login, senha ou cadastro</span>
          </div>

          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Início
          </button>
          <button
            onClick={() => {
              onNavigate('provas');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Simulados por Prova (ENEM, FUVEST, SARESP...)
          </button>
          <button
            onClick={() => {
              onNavigate('olimpiadas');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Olimpíadas Científicas (OBMEP & OBA)
          </button>
          <button
            onClick={() => {
              onNavigate('sisu');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Simulador de Notas de Corte SISU
          </button>
          <button
            onClick={() => {
              onNavigate('caderno_erros');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Caderno de Erros Inteligente
          </button>
          <button
            onClick={() => {
              onNavigate('sobre');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-800 hover:bg-gray-100"
          >
            Sobre a Plataforma
          </button>
        </div>
      )}
    </header>
  );
}
