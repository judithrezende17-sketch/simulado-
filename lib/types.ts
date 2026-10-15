export type ExamCategory =
  | 'fundamental'
  | 'medio_enem'
  | 'vestibulares'
  | 'olimpiadas'
  | 'concursos';

export type ExamId =
  | 'enem'
  | 'fuvest'
  | 'saresp'
  | 'provao_paulista'
  | 'obmep'
  | 'oba'
  | 'concursos'
  | 'unicamp'
  | 'vunesp';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
}

export interface Question {
  id: string;
  examId: ExamId;
  examName: string;
  year: number;
  subject: string;
  topic: string;
  difficulty: 'Fácil' | 'Média' | 'Difícil';
  contextText?: string;
  sourceReference?: string;
  imageUrl?: string;
  imageAlt?: string;
  imageCaption?: string;
  prompt: string;
  options: QuestionOption[];
  correctOption: 'A' | 'B' | 'C' | 'D' | 'E';
  explanation: string;
  skillsEvaluated?: string;
}

export interface ExamDefinition {
  id: ExamId;
  title: string;
  subtitle: string;
  category: ExamCategory;
  badge: string;
  durationMinutes: number;
  totalQuestions: number;
  description: string;
  color: string;
  institution: string;
}

export interface UserAnswerState {
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'E' | null;
  isFlagged: boolean;
  isBookmarked: boolean;
  eliminatedOptions: string[];
  timeSpentSeconds: number;
}

export interface ExamSessionResult {
  examId: ExamId;
  examTitle: string;
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  wrongCount: number;
  percentage: number;
  triScore: number;
  timeSpentSeconds: number;
  completedAt: string;
  answers: Record<string, UserAnswerState>;
  subjectStats: {
    subject: string;
    total: number;
    correct: number;
    percentage: number;
  }[];
}

export interface SisuCourse {
  university: string;
  campus: string;
  course: string;
  degree: string;
  shift: string;
  cutoffScore: number;
  weights: {
    linguagens: number;
    humanas: number;
    natureza: number;
    matematica: number;
    redacao: number;
  };
}
