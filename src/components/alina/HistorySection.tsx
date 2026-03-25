import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

interface HistoryItem {
  id: string;
  date: string;
  title: string;
  messages: number;
  duration: string;
  tags: string[];
}

const HISTORY: HistoryItem[] = [
  { id: '1', date: '25 марта 2026', title: 'Анализ квартального отчёта', messages: 14, duration: '18 мин', tags: ['аналитика', 'финансы'] },
  { id: '2', date: '24 марта 2026', title: 'Разработка стратегии выхода на рынок', messages: 22, duration: '34 мин', tags: ['стратегия', 'маркетинг'] },
  { id: '3', date: '24 марта 2026', title: 'Оптимизация бизнес-процессов отдела', messages: 9, duration: '11 мин', tags: ['операции'] },
  { id: '4', date: '23 марта 2026', title: 'Подготовка презентации для совета', messages: 31, duration: '47 мин', tags: ['презентации', 'управление'] },
  { id: '5', date: '22 марта 2026', title: 'Свободная беседа о трендах ИИ', messages: 18, duration: '25 мин', tags: ['технологии'] },
  { id: '6', date: '21 марта 2026', title: 'Планирование бюджета на Q2', messages: 12, duration: '16 мин', tags: ['финансы', 'планирование'] },
];

const TAG_COLORS: Record<string, string> = {
  аналитика: 'hsl(210 65% 45% / 0.2)',
  финансы: 'hsl(140 50% 40% / 0.2)',
  стратегия: 'hsl(270 50% 50% / 0.2)',
  маркетинг: 'hsl(30 70% 45% / 0.2)',
  операции: 'hsl(185 65% 40% / 0.2)',
  презентации: 'hsl(0 60% 45% / 0.2)',
  управление: 'hsl(210 40% 55% / 0.2)',
  технологии: 'hsl(200 70% 48% / 0.2)',
  планирование: 'hsl(160 50% 40% / 0.2)',
};

const HistorySection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = HISTORY.filter(
    h =>
      h.title.toLowerCase().includes(search.toLowerCase()) ||
      h.tags.some(t => t.includes(search.toLowerCase()))
  );

  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-4" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
          style={{ background: 'hsl(var(--secondary))', border: '1px solid hsl(var(--border))' }}
        >
          <Icon name="Search" size={15} className="flex-shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск по истории..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            style={{ color: 'hsl(var(--foreground))', fontFamily: 'IBM Plex Sans, sans-serif' }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-2">
            <Icon name="SearchX" size={32} style={{ color: 'hsl(var(--muted-foreground))' }} />
            <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>Ничего не найдено</p>
          </div>
        ) : (
          filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelected(selected === item.id ? null : item.id)}
              className="rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 animate-fade-in"
              style={{
                animationDelay: `${idx * 0.04}s`,
                background: selected === item.id ? 'hsl(210 65% 45% / 0.1)' : 'hsl(var(--card))',
                border: `1px solid ${selected === item.id ? 'hsl(210 65% 55% / 0.3)' : 'hsl(var(--border))'}`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate mb-1"
                    style={{ color: 'hsl(var(--foreground))' }}
                  >
                    {item.title}
                  </p>
                  <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    <span>{item.date}</span>
                    <span>·</span>
                    <span>{item.messages} сообщ.</span>
                    <span>·</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
                <Icon
                  name={selected === item.id ? 'ChevronUp' : 'ChevronDown'}
                  size={14}
                  style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0, marginTop: 2 }}
                />
              </div>

              {selected === item.id && (
                <div className="mt-3 pt-3" style={{ borderTop: '1px solid hsl(var(--border))' }}>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs font-mono"
                        style={{
                          background: TAG_COLORS[tag] || 'hsl(var(--secondary))',
                          color: 'hsl(var(--foreground))',
                          border: '1px solid hsl(var(--border))',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md transition-all duration-200"
                    style={{
                      background: 'hsl(var(--primary) / 0.15)',
                      color: 'hsl(var(--primary))',
                      border: '1px solid hsl(var(--primary) / 0.25)',
                    }}
                  >
                    <Icon name="RotateCcw" size={12} />
                    Продолжить диалог
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div
        className="px-6 py-3 flex items-center justify-between text-xs font-mono"
        style={{
          borderTop: '1px solid hsl(var(--border))',
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        <span>Всего сессий: {HISTORY.length}</span>
        <span>Система обучения активна ●</span>
      </div>
    </div>
  );
};

export default HistorySection;
