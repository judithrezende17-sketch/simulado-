import { ExamSessionResult, Question } from './types';
import { QUESTIONS_DATABASE } from './questions-data';

const SESSIONS_STORAGE_KEY = 'escsimulados_sessions_v1';
const ERROR_NOTEBOOK_KEY = 'escsimulados_error_notebook_v1';
const SAVED_DRAFT_KEY_PREFIX = 'escsimulados_draft_';

export function getCompletedSessions(): ExamSessionResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading sessions from localStorage', e);
    return [];
  }
}

export function saveCompletedSession(result: ExamSessionResult): void {
  if (typeof window === 'undefined') return;
  try {
    const sessions = getCompletedSessions();
    sessions.unshift(result);
    // Keep last 25 sessions
    localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions.slice(0, 25)));

    // Also automatically register wrong answers in the Caderno de Erros
    const errorQuestions = getErrorNotebookQuestionIds();
    const updatedErrors = new Set(errorQuestions);

    Object.entries(result.answers).forEach(([qId, answer]) => {
      const q = QUESTIONS_DATABASE.find(item => item.id === qId);
      if (q && answer.selectedOption && answer.selectedOption !== q.correctOption) {
        updatedErrors.add(qId);
      }
      if (answer.isFlagged) {
        updatedErrors.add(qId);
      }
    });

    localStorage.setItem(ERROR_NOTEBOOK_KEY, JSON.stringify(Array.from(updatedErrors)));
  } catch (e) {
    console.error('Error saving session to localStorage', e);
  }
}

export function getErrorNotebookQuestionIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(ERROR_NOTEBOOK_KEY);
    if (!raw) {
      // Default initial seeds for demonstrative preview
      return ['enem-01', 'enem-08', 'fuvest-03', 'obmep-13'];
    }
    return JSON.parse(raw);
  } catch (e) {
    return ['enem-01', 'enem-08', 'fuvest-03', 'obmep-13'];
  }
}

export function addQuestionToErrorNotebook(questionId: string): void {
  if (typeof window === 'undefined') return;
  const current = new Set(getErrorNotebookQuestionIds());
  current.add(questionId);
  localStorage.setItem(ERROR_NOTEBOOK_KEY, JSON.stringify(Array.from(current)));
}

export function removeQuestionFromErrorNotebook(questionId: string): void {
  if (typeof window === 'undefined') return;
  const current = new Set(getErrorNotebookQuestionIds());
  current.delete(questionId);
  localStorage.setItem(ERROR_NOTEBOOK_KEY, JSON.stringify(Array.from(current)));
}

export function getErrorNotebookQuestions(): Question[] {
  const ids = getErrorNotebookQuestionIds();
  return QUESTIONS_DATABASE.filter(q => ids.includes(q.id));
}

export function saveExamDraft(examId: string, state: any): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SAVED_DRAFT_KEY_PREFIX + examId, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving exam draft', e);
  }
}

export function getExamDraft(examId: string): any | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SAVED_DRAFT_KEY_PREFIX + examId);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function clearExamDraft(examId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(SAVED_DRAFT_KEY_PREFIX + examId);
}
