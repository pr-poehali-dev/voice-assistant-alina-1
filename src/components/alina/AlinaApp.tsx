import React, { useState } from 'react';
import Icon from '@/components/ui/icon';
import ChatSection from './ChatSection';
import HistorySection from './HistorySection';
import SettingsSection from './SettingsSection';
import ProfileSection from './ProfileSection';
import HelpSection from './HelpSection';
import FeaturesSection from './FeaturesSection';

type Tab = 'chat' | 'history' | 'features' | 'settings' | 'profile' | 'help';

const NAV_ITEMS: { id: Tab; icon: string; label: string }[] = [
  { id: 'chat', icon: 'MessageSquare', label: 'Чат' },
  { id: 'history', icon: 'Clock', label: 'История' },
  { id: 'features', icon: 'Zap', label: 'Возможности' },
  { id: 'settings', icon: 'Settings', label: 'Настройки' },
  { id: 'profile', icon: 'User', label: 'Профиль' },
  { id: 'help', icon: 'HelpCircle', label: 'Помощь' },
];

const SECTION_TITLES: Record<Tab, string> = {
  chat: 'Диалог с Алиной',
  history: 'История взаимодействий',
  features: 'Возможности системы',
  settings: 'Параметры',
  profile: 'Профиль пользователя',
  help: 'Справка',
};

const AlinaApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('chat');

  const renderSection = () => {
    switch (activeTab) {
      case 'chat': return <ChatSection />;
      case 'history': return <HistorySection />;
      case 'features': return <FeaturesSection />;
      case 'settings': return <SettingsSection />;
      case 'profile': return <ProfileSection />;
      case 'help': return <HelpSection />;
    }
  };

  return (
    <div
      className="flex h-screen w-screen overflow-hidden"
      style={{ background: 'hsl(var(--background))' }}
    >
      <aside
        className="flex flex-col flex-shrink-0"
        style={{
          width: 220,
          background: 'hsl(220 20% 7%)',
          borderRight: '1px solid hsl(var(--border))',
        }}
      >
        <div
          className="flex items-center gap-3 px-5 py-5"
          style={{ borderBottom: '1px solid hsl(var(--border))' }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, hsl(210 65% 45%), hsl(185 70% 38%))',
              color: 'white',
            }}
          >
            А
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              Алина
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'hsl(140 50% 55%)' }}
              />
              <span className="text-xs font-mono" style={{ color: 'hsl(140 50% 55%)' }}>
                онлайн
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left ${activeTab === item.id ? 'active' : ''}`}
              style={{
                color: activeTab === item.id ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
                paddingLeft: activeTab === item.id ? 10 : 12,
              }}
            >
              <Icon name={item.icon} fallback="Circle" size={16} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div
          className="px-4 py-4"
          style={{ borderTop: '1px solid hsl(var(--border))' }}
        >
          <div
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-md"
            style={{ background: 'hsl(var(--secondary))' }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
              style={{
                background: 'hsl(var(--border))',
                color: 'hsl(var(--foreground))',
              }}
            >
              АД
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate" style={{ color: 'hsl(var(--foreground))' }}>
                А. Дмитриев
              </div>
              <div className="text-xs font-mono truncate" style={{ color: 'hsl(var(--muted-foreground))' }}>
                Администратор
              </div>
            </div>
            <button className="flex-shrink-0 transition-opacity hover:opacity-70">
              <Icon name="LogOut" size={13} style={{ color: 'hsl(var(--muted-foreground))' }} />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-col flex-1 min-w-0">
        <header
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: '1px solid hsl(var(--border))' }}
        >
          <div>
            <h1 className="text-sm font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
              {SECTION_TITLES[activeTab]}
            </h1>
            <p className="text-xs font-mono mt-0.5" style={{ color: 'hsl(var(--muted-foreground))' }}>
              25 марта 2026 · Корпоративный ИИ-ассистент v2.4.1
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono"
              style={{
                background: 'hsl(210 65% 45% / 0.1)',
                border: '1px solid hsl(210 65% 55% / 0.2)',
                color: 'hsl(var(--primary))',
              }}
            >
              <Icon name="Cpu" size={12} />
              Система активна
            </div>
            <a
              href="#"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-all duration-200"
              style={{
                background: 'hsl(var(--secondary))',
                border: '1px solid hsl(var(--border))',
                color: 'hsl(var(--muted-foreground))',
                textDecoration: 'none',
              }}
            >
              <Icon name="Link" size={12} />
              Алина
            </a>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-hidden">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AlinaApp;
