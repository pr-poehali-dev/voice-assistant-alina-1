import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

const FAQ = [
  {
    q: 'Как начать голосовой диалог?',
    a: 'Нажмите кнопку микрофона в правой части экрана. Говорите чётко и дождитесь ответа Алины. Для завершения нажмите кнопку ещё раз.',
  },
  {
    q: 'Как работает система обучения?',
    a: 'Алина анализирует историю ваших взаимодействий, выявляет паттерны и адаптирует ответы под ваш стиль работы. Данные хранятся только внутри корпоративного контура.',
  },
  {
    q: 'Можно ли обсуждать конфиденциальные данные?',
    a: 'Все данные обрабатываются в закрытом корпоративном контуре без передачи третьим лицам. Для особо чувствительной информации рекомендуем использовать режим без сохранения истории.',
  },
  {
    q: 'Как экспортировать историю диалогов?',
    a: 'В разделе «История» выберите нужный диалог и используйте функцию экспорта. Поддерживаются форматы PDF и TXT.',
  },
  {
    q: 'Что делать если Алина не понимает вопрос?',
    a: 'Попробуйте переформулировать запрос более конкретно. Используйте ключевые слова, относящиеся к теме. Также можно начать с фразы «Объясни как...» или «Помоги с...»',
  },
];

const SHORTCUTS = [
  { keys: ['Enter'], desc: 'Отправить сообщение' },
  { keys: ['Shift', 'Enter'], desc: 'Новая строка' },
  { keys: ['Ctrl', 'M'], desc: 'Включить микрофон' },
  { keys: ['Esc'], desc: 'Остановить запись' },
];

const HelpSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-6 space-y-6">
      <div
        className="flex items-start gap-4 p-5 rounded-lg"
        style={{
          background: 'hsl(210 65% 45% / 0.08)',
          border: '1px solid hsl(210 65% 55% / 0.2)',
        }}
      >
        <Icon name="LifeBuoy" size={20} style={{ color: 'hsl(var(--primary))', flexShrink: 0, marginTop: 2 }} />
        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>
            Центр поддержки
          </h3>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Если у вас возникли вопросы, которых нет в FAQ, обратитесь к системному администратору или напишите напрямую Алине — она поможет разобраться.
          </p>
        </div>
      </div>

      <div>
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Часто задаваемые вопросы
        </h3>
        <div className="space-y-2">
          {FAQ.map((item, idx) => (
            <div
              key={idx}
              className="rounded-lg overflow-hidden"
              style={{ border: '1px solid hsl(var(--border))' }}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full flex items-center justify-between px-4 py-3.5 text-left transition-all duration-200"
                style={{
                  background: openIdx === idx ? 'hsl(var(--card))' : 'hsl(var(--secondary))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <span className="text-sm font-medium pr-4">{item.q}</span>
                <Icon
                  name={openIdx === idx ? 'ChevronUp' : 'ChevronDown'}
                  size={14}
                  style={{ color: 'hsl(var(--muted-foreground))', flexShrink: 0 }}
                />
              </button>
              {openIdx === idx && (
                <div
                  className="px-4 py-3 text-sm animate-fade-in"
                  style={{
                    background: 'hsl(var(--card))',
                    color: 'hsl(var(--muted-foreground))',
                    borderTop: '1px solid hsl(var(--border))',
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Горячие клавиши
        </h3>
        <div
          className="rounded-lg overflow-hidden"
          style={{ border: '1px solid hsl(var(--border))' }}
        >
          {SHORTCUTS.map((s, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: idx < SHORTCUTS.length - 1 ? '1px solid hsl(var(--border))' : 'none',
                background: 'hsl(var(--card))',
              }}
            >
              <span className="text-sm" style={{ color: 'hsl(var(--foreground))' }}>{s.desc}</span>
              <div className="flex items-center gap-1">
                {s.keys.map((k, i) => (
                  <React.Fragment key={i}>
                    <kbd
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: 'hsl(var(--secondary))',
                        border: '1px solid hsl(var(--border))',
                        color: 'hsl(var(--foreground))',
                      }}
                    >
                      {k}
                    </kbd>
                    {i < s.keys.length - 1 && (
                      <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
