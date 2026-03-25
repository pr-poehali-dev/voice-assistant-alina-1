import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

const SettingsSection: React.FC = () => {
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [language, setLanguage] = useState('ru');
  const [autoLearn, setAutoLearn] = useState(true);
  const [saveHistory, setSaveHistory] = useState(true);
  const [notifications, setNotifications] = useState(false);
  const [formality, setFormality] = useState('formal');

  const Toggle = ({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) => (
    <button
      onClick={() => onChange(!value)}
      className="relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none"
      style={{
        width: 40,
        height: 22,
        background: value ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
        border: '1px solid hsl(var(--border))',
      }}
    >
      <span
        className="absolute rounded-full bg-white transition-all duration-200"
        style={{
          width: 16,
          height: 16,
          left: value ? 20 : 2,
        }}
      />
    </button>
  );

  const Row = ({ label, desc, children }: { label: string; desc?: string; children: React.ReactNode }) => (
    <div
      className="flex items-center justify-between px-4 py-3.5 rounded-lg"
      style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
    >
      <div>
        <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>{label}</p>
        {desc && <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>{desc}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-y-auto px-6 py-6 space-y-6">
      <div>
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Голос и речь
        </h3>
        <div className="space-y-2">
          <Row label="Скорость речи" desc={`Текущее значение: ${voiceSpeed.toFixed(1)}x`}>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>0.5</span>
              <input
                type="range"
                min="0.5"
                max="2.0"
                step="0.1"
                value={voiceSpeed}
                onChange={e => setVoiceSpeed(parseFloat(e.target.value))}
                className="w-28 accent-blue-500"
                style={{ accentColor: 'hsl(var(--primary))' }}
              />
              <span className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>2.0</span>
            </div>
          </Row>
          <Row label="Язык интерфейса" desc="Язык ответов и распознавания речи">
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="text-sm px-3 py-1.5 rounded-md outline-none cursor-pointer"
              style={{
                background: 'hsl(var(--secondary))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--foreground))',
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            >
              <option value="ru">Русский</option>
              <option value="en">English</option>
            </select>
          </Row>
          <Row label="Стиль общения" desc="Формальный или неформальный тон ответов">
            <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid hsl(var(--border))' }}>
              {[{ v: 'formal', l: 'Строгий' }, { v: 'casual', l: 'Свободный' }].map(opt => (
                <button
                  key={opt.v}
                  onClick={() => setFormality(opt.v)}
                  className="px-3 py-1.5 text-xs transition-all duration-200"
                  style={{
                    background: formality === opt.v ? 'hsl(var(--primary))' : 'hsl(var(--secondary))',
                    color: formality === opt.v ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                    fontFamily: 'IBM Plex Sans, sans-serif',
                  }}
                >
                  {opt.l}
                </button>
              ))}
            </div>
          </Row>
        </div>
      </div>

      <div>
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Обучение и данные
        </h3>
        <div className="space-y-2">
          <Row label="Система автообучения" desc="Алина анализирует историю для улучшения ответов">
            <Toggle value={autoLearn} onChange={setAutoLearn} />
          </Row>
          <Row label="Сохранение истории" desc="Хранить историю диалогов для анализа">
            <Toggle value={saveHistory} onChange={setSaveHistory} />
          </Row>
          <Row label="Уведомления" desc="Push-уведомления о важных событиях">
            <Toggle value={notifications} onChange={setNotifications} />
          </Row>
        </div>
      </div>

      <div>
        <h3
          className="text-xs uppercase tracking-widest font-mono mb-3"
          style={{ color: 'hsl(var(--muted-foreground))' }}
        >
          Система
        </h3>
        <div className="space-y-2">
          <div
            className="flex items-center justify-between px-4 py-3.5 rounded-lg"
            style={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
          >
            <div>
              <p className="text-sm font-medium" style={{ color: 'hsl(var(--foreground))' }}>Очистить историю</p>
              <p className="text-xs mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>Удалить все диалоги без возможности восстановления</p>
            </div>
            <button
              className="text-xs px-3 py-1.5 rounded-md transition-all duration-200"
              style={{
                background: 'hsl(0 60% 45% / 0.15)',
                color: 'hsl(0 60% 55%)',
                border: '1px solid hsl(0 60% 45% / 0.3)',
              }}
            >
              Очистить
            </button>
          </div>
        </div>
      </div>

      <div
        className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono"
        style={{
          background: 'hsl(210 65% 45% / 0.08)',
          border: '1px solid hsl(210 65% 55% / 0.2)',
          color: 'hsl(var(--muted-foreground))',
        }}
      >
        <Icon name="Info" size={14} style={{ color: 'hsl(var(--primary))', flexShrink: 0 }} />
        Алина v2.4.1 · Модель обновлена 25 марта 2026
      </div>
    </div>
  );
};

export default SettingsSection;
