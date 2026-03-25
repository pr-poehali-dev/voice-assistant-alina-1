import React from 'react';
import Icon from '@/components/ui/icon';

const FEATURES = [
  {
    icon: 'Mic',
    title: 'Голосовое взаимодействие',
    desc: 'Распознавание речи с точностью 97%+. Поддержка русского и английского языков. Адаптация под акцент и темп речи пользователя.',
    status: 'active',
  },
  {
    icon: 'Brain',
    title: 'Система обучения',
    desc: 'Алина анализирует историю диалогов и адаптирует стиль ответов. Чем больше взаимодействий — тем точнее и персонализированнее помощь.',
    status: 'active',
  },
  {
    icon: 'BarChart3',
    title: 'Бизнес-аналитика',
    desc: 'Анализ данных, подготовка отчётов, выявление трендов. Алина помогает принимать обоснованные управленческие решения на основе данных.',
    status: 'active',
  },
  {
    icon: 'FileText',
    title: 'Работа с документами',
    desc: 'Создание, редактирование и анализ документов. Подготовка презентаций, договоров, технических заданий в нужном формате.',
    status: 'active',
  },
  {
    icon: 'MessageCircle',
    title: 'Свободное общение',
    desc: 'Обсуждение любых тем — от профессиональных до повседневных. Алина поддерживает контекст и помнит детали разговора.',
    status: 'active',
  },
  {
    icon: 'ShieldCheck',
    title: 'Корпоративная безопасность',
    desc: 'Все данные обрабатываются внутри корпоративного контура. Сквозное шифрование, ролевая модель доступа, аудит действий.',
    status: 'active',
  },
  {
    icon: 'Plug',
    title: 'Интеграции',
    desc: 'Подключение к корпоративным системам: CRM, ERP, почте, календарю. API для разработчиков, поддержка webhook.',
    status: 'soon',
  },
  {
    icon: 'Globe',
    title: 'Мультиязычность',
    desc: 'Расширение поддержки языков до 12. Одновременный перевод в реальном времени во время диалога.',
    status: 'soon',
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-6">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURES.map((feat, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg animate-fade-in"
            style={{
              animationDelay: `${idx * 0.05}s`,
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              opacity: feat.status === 'soon' ? 0.6 : 1,
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: feat.status === 'active'
                    ? 'hsl(210 65% 45% / 0.15)'
                    : 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <Icon
                  name={feat.icon}
                  fallback="Zap"
                  size={16}
                  style={{
                    color: feat.status === 'active' ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h4 className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>
                    {feat.title}
                  </h4>
                  {feat.status === 'soon' && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                      style={{
                        background: 'hsl(40 70% 45% / 0.15)',
                        color: 'hsl(40 70% 55%)',
                        border: '1px solid hsl(40 70% 45% / 0.3)',
                      }}
                    >
                      Скоро
                    </span>
                  )}
                  {feat.status === 'active' && (
                    <span
                      className="text-xs px-1.5 py-0.5 rounded font-mono flex-shrink-0"
                      style={{
                        background: 'hsl(140 50% 40% / 0.15)',
                        color: 'hsl(140 50% 55%)',
                        border: '1px solid hsl(140 50% 40% / 0.3)',
                      }}
                    >
                      Активно
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
