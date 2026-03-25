import { useState } from 'react';
import SchoolChat from './SchoolChat';
import SubjectGrid from './SubjectGrid';

export type Subject = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  bg: string;
  border: string;
  hints: string[];
};

export const SUBJECTS: Subject[] = [
  {
    id: 'math',
    name: 'Математика',
    emoji: '📐',
    color: '#7c55f5',
    bg: 'bg-violet-50',
    border: 'border-violet-200',
    hints: ['Реши уравнение 2x² + 5x − 3 = 0', 'Что такое производная?', 'Как найти площадь трапеции?'],
  },
  {
    id: 'physics',
    name: 'Физика',
    emoji: '⚡',
    color: '#2aa8dc',
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    hints: ["Объясни второй закон Ньютона", 'Что такое сила Архимеда?', 'Как работает электрический ток?'],
  },
  {
    id: 'chemistry',
    name: 'Химия',
    emoji: '🧪',
    color: '#2dc98a',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    hints: ['Что такое валентность?', 'Объясни таблицу Менделеева', 'Как балансировать уравнения реакций?'],
  },
  {
    id: 'biology',
    name: 'Биология',
    emoji: '🌿',
    color: '#3ab040',
    bg: 'bg-green-50',
    border: 'border-green-200',
    hints: ['Что такое фотосинтез?', 'Строение клетки', 'Как работает ДНК?'],
  },
  {
    id: 'history',
    name: 'История',
    emoji: '🏛️',
    color: '#e07b2a',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    hints: ['Причины Первой мировой войны', 'Что такое Октябрьская революция?', 'Расскажи о Петре I'],
  },
  {
    id: 'literature',
    name: 'Литература',
    emoji: '📖',
    color: '#c245a0',
    bg: 'bg-pink-50',
    border: 'border-pink-200',
    hints: ['Главные темы «Войны и мира»', 'Кто такой Раскольников?', 'Анализ стихотворения Пушкина'],
  },
  {
    id: 'geography',
    name: 'География',
    emoji: '🌍',
    color: '#1ab5c0',
    bg: 'bg-teal-50',
    border: 'border-teal-200',
    hints: ['Что такое климатические пояса?', 'Крупнейшие реки России', 'Объясни часовые пояса'],
  },
  {
    id: 'english',
    name: 'Английский',
    emoji: '🗣️',
    color: '#e8a100',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    hints: ['Объясни Present Perfect', 'Как использовать артикли?', 'Правило трёх форм глаголов'],
  },
];

export default function AlinaApp() {
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-sky-50/40 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {activeSubject && (
              <button
                onClick={() => setActiveSubject(null)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                aria-label="Назад"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                А
              </div>
              <div>
                <span className="font-semibold text-foreground text-sm leading-none block">Алина</span>
                <span className="text-[11px] text-muted-foreground leading-none">школьный помощник</span>
              </div>
            </div>
          </div>

          {activeSubject && (
            <div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium"
              style={{ background: activeSubject.color + '18', color: activeSubject.color }}
            >
              <span>{activeSubject.emoji}</span>
              <span>{activeSubject.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            онлайн
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-4 py-4">
        {activeSubject ? (
          <SchoolChat subject={activeSubject} onBack={() => setActiveSubject(null)} />
        ) : (
          <SubjectGrid subjects={SUBJECTS} onSelect={setActiveSubject} />
        )}
      </main>
    </div>
  );
}
