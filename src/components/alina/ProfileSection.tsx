import React from 'react';
import Icon from '@/components/ui/icon';

const STATS = [
  { label: 'Диалогов', value: '127', icon: 'MessageSquare' },
  { label: 'Часов работы', value: '34.2', icon: 'Clock' },
  { label: 'Задач решено', value: '89', icon: 'CheckCircle' },
  { label: 'Индекс обуч.', value: '94%', icon: 'TrendingUp' },
];

const ACTIVITY = [
  { day: 'Пн', sessions: 4 },
  { day: 'Вт', sessions: 7 },
  { day: 'Ср', sessions: 3 },
  { day: 'Чт', sessions: 9 },
  { day: 'Пт', sessions: 6 },
  { day: 'Сб', sessions: 2 },
  { day: 'Вс', sessions: 1 },
];

const max = Math.max(...ACTIVITY.map(a => a.sessions));

const ProfileSection: React.FC = () => {
  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-6 space-y-6">
      <div
        className="flex items-center gap-5 p-5 rounded-lg"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, hsl(220 18% 18%), hsl(220 18% 22%))',
            border: '2px solid hsl(var(--border))',
            color: 'hsl(var(--foreground))',
          }}
        >
          АД
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Андрей Дмитриев
            </h2>
            <span
              className="text-xs px-2 py-0.5 rounded font-mono"
              style={{
                background: 'hsl(140 50% 40% / 0.15)',
                color: 'hsl(140 50% 55%)',
                border: '1px solid hsl(140 50% 40% / 0.3)',
              }}
            >
              Администратор
            </span>
          </div>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            a.dmitriev@company.ru
          </p>
          <p className="text-xs font-mono mt-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Участник с января 2026 · Корпоративная лицензия
          </p>
        </div>
        <button
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-all duration-200"
          style={{
            background: 'hsl(var(--secondary))',
            color: 'hsl(var(--secondary-foreground))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <Icon name="Pencil" size={12} />
          Редактировать
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {STATS.map((stat, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg text-center animate-fade-in"
            style={{
              animationDelay: `${idx * 0.08}s`,
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
          >
            <Icon name={stat.icon} fallback="Circle" size={18} style={{ color: 'hsl(var(--primary))', margin: '0 auto 8px' }} />
            <div className="text-xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              {stat.value}
            </div>
            <div className="text-xs mt-1 font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div
        className="p-5 rounded-lg"
        style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
      >
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-4"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Активность за неделю
        </h3>
        <div className="flex items-end gap-2" style={{ height: 64 }}>
          {ACTIVITY.map(({ day, sessions }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
              <div
                className="w-full rounded-sm transition-all duration-300"
                style={{
                  height: `${Math.max(4, (sessions / max) * 52)}px`,
                  background: sessions === max
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--secondary))',
                  border: '1px solid hsl(var(--border))',
                }}
              />
              <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;