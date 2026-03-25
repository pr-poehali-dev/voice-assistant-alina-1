import React, { useState, useRef, useEffect } from 'react';
import VoiceOrb from './VoiceOrb';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'alina';
  text: string;
  time: string;
}

const DEMO_RESPONSES = [
  'Понял вашу задачу. Для её решения рекомендую следующий подход: разбейте проблему на три этапа — анализ, планирование и исполнение. Хотите, чтобы я помог с каждым из них?',
  'Это интересный вопрос. По данной теме существует несколько точек зрения. Основная рекомендация — придерживаться структурированного подхода и фиксировать промежуточные результаты.',
  'Согласно актуальным данным, наиболее эффективная стратегия включает автоматизацию рутинных процессов и фокус на задачах с высокой добавленной стоимостью.',
  'Рассмотрю ваш запрос детально. Ключевые факторы успеха в этой области: чёткая постановка целей, регулярный мониторинг и своевременная корректировка плана действий.',
];

const getTime = () => new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'alina',
    text: 'Добрый день. Я Алина — ваш корпоративный ИИ-ассистент. Готова помочь с решением бизнес-задач, аналитикой и свободным общением. Чем могу помочь?',
    time: getTime(),
  },
];

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      time: getTime(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setIsSpeaking(true);
      const response = DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];
      const alinaMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'alina',
        text: response,
        time: getTime(),
      };
      setMessages(prev => [...prev, alinaMsg]);
      setTimeout(() => setIsSpeaking(false), 2500);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const toggleVoice = () => {
    if (isListening) {
      setIsListening(false);
      if (inputText.trim()) sendMessage(inputText);
    } else {
      setIsListening(true);
      setInputText('Голосовой ввод активирован...');
      setTimeout(() => {
        setIsListening(false);
        setInputText('Какой статус по проекту на этой неделе?');
      }, 2500);
    }
  };

  return (
    <div className="flex h-full gap-6">
      <div className="flex flex-col flex-1 h-full min-w-0">
        <div
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          style={{ minHeight: 0 }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat-message flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: msg.role === 'alina'
                    ? 'linear-gradient(135deg, hsl(210 65% 45%), hsl(185 70% 38%))'
                    : 'hsl(var(--secondary))',
                  color: msg.role === 'alina' ? 'white' : 'hsl(var(--secondary-foreground))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                {msg.role === 'alina' ? 'А' : 'Вы'}
              </div>
              <div className="flex flex-col gap-1 max-w-[72%]">
                <div
                  className="px-4 py-3 rounded-lg text-sm leading-relaxed"
                  style={{
                    background: msg.role === 'alina'
                      ? 'hsl(var(--card))'
                      : 'hsl(210 65% 45% / 0.15)',
                    border: `1px solid ${msg.role === 'alina' ? 'hsl(var(--border))' : 'hsl(210 65% 55% / 0.25)'}`,
                    color: 'hsl(var(--foreground))',
                  }}
                >
                  {msg.text}
                </div>
                <span
                  className="text-xs px-1 font-mono"
                  style={{ color: 'hsl(var(--muted-foreground))', textAlign: msg.role === 'user' ? 'right' : 'left' }}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="chat-message flex gap-3">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold"
                style={{
                  background: 'linear-gradient(135deg, hsl(210 65% 45%), hsl(185 70% 38%))',
                  color: 'white',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                А
              </div>
              <div
                className="px-4 py-3 rounded-lg"
                style={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                }}
              >
                <div className="flex items-center gap-1.5">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <div
                      key={i}
                      className="rounded-full"
                      style={{
                        width: 6,
                        height: 6,
                        background: 'hsl(var(--muted-foreground))',
                        animation: `wave-bar 1s ease-in-out ${delay}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div
          className="px-6 py-4"
          style={{ borderTop: '1px solid hsl(var(--border))' }}
        >
          <div
            className="flex items-end gap-3 px-4 py-3 rounded-lg"
            style={{
              background: 'hsl(var(--secondary))',
              border: '1px solid hsl(var(--border))',
            }}
          >
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Введите сообщение или нажмите на микрофон..."
              rows={1}
              className="flex-1 bg-transparent resize-none text-sm outline-none placeholder:text-muted-foreground leading-relaxed"
              style={{
                color: 'hsl(var(--foreground))',
                maxHeight: 120,
                fontFamily: 'IBM Plex Sans, sans-serif',
              }}
            />
            <button
              onClick={() => sendMessage(inputText)}
              disabled={!inputText.trim()}
              className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-md transition-all duration-200 disabled:opacity-30"
              style={{
                background: inputText.trim() ? 'hsl(var(--primary))' : 'transparent',
                color: inputText.trim() ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
              }}
            >
              <Icon name="Send" size={14} />
            </button>
          </div>
          <p className="text-xs mt-2 px-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Enter — отправить · Shift+Enter — новая строка
          </p>
        </div>
      </div>

      <div
        className="flex-shrink-0 flex flex-col items-center justify-center gap-6 px-6 py-8"
        style={{
          width: 200,
          borderLeft: '1px solid hsl(var(--border))',
        }}
      >
        <div className="text-center">
          <div
            className="text-xs uppercase tracking-widest mb-1 font-mono"
            style={{ color: 'hsl(var(--muted-foreground))' }}
          >
            Голосовой режим
          </div>
        </div>

        <VoiceOrb
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={toggleVoice}
        />

        <div
          className="w-full rounded-lg p-3 text-center"
          style={{
            background: 'hsl(var(--secondary))',
            border: '1px solid hsl(var(--border))',
          }}
        >
          <div className="text-xs font-mono mb-1" style={{ color: 'hsl(var(--muted-foreground))' }}>
            Сообщений сегодня
          </div>
          <div className="text-xl font-semibold" style={{ color: 'hsl(var(--foreground))' }}>
            {messages.length - 1}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
