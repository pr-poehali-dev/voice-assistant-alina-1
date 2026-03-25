import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Subject } from './AlinaApp';
import Icon from '@/components/ui/icon';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

interface Props {
  subject: Subject;
  onBack: () => void;
}

const ALINA_ANSWERS: Record<string, string[]> = {
  math: [
    'Конечно! Разберём шаг за шагом. Это классическая задача из школьного курса алгебры. Сначала определим тип задачи, а затем выберем правильный метод решения.',
    'Отличный вопрос! В математике важно понять суть, а не просто запомнить формулу. Давай разберём это вместе.',
    'Для решения таких задач нам понадобится применить теорему, которую вы проходили в этой теме.',
  ],
  physics: [
    'Физика — это наука о природе. Давай разберём этот закон на конкретном примере из жизни, чтобы лучше понять.',
    'Этот принцип открыл один из великих учёных. Представь себе ситуацию: ты плывёшь в бассейне...',
    'Великолепный вопрос! Это явление описывает, как энергия преобразуется из одного вида в другой.',
  ],
  default: [
    'Конечно, помогу! Это интересная тема. Давай разберём её подробно и с примерами.',
    'Хороший вопрос! Чтобы лучше понять, давай начнём с основного определения.',
    'Это важная тема в школьной программе. Объясню доступно и понятно.',
  ],
};

function getAnswer(subjectId: string): string {
  const pool = ALINA_ANSWERS[subjectId] ?? ALINA_ANSWERS.default;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function SchoolChat({ subject, onBack }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: `Привет! Готова помочь с ${subject.name.toLowerCase()}. Задай любой вопрос или выбери подсказку ниже 👇`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const answer = getAnswer(subject.id);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', text: answer }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Голосовой ввод не поддерживается в этом браузере. Попробуй Chrome.');
      return;
    }
    if (isListening) {
      setIsListening(false);
      return;
    }
    setIsListening(true);
    const w = window as Window & { webkitSpeechRecognition?: new () => SpeechRecognition; };
    const SR = w.webkitSpeechRecognition ?? window.SpeechRecognition;
    if (!SR) { setIsListening(false); return; }
    const recognition = new SR();
    recognition.lang = 'ru-RU';
    recognition.interimResults = false;
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] max-h-[780px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 px-1 flex flex-col gap-4">
        {messages.map(msg => (
          <ChatBubble key={msg.id} msg={msg} subject={subject} />
        ))}

        {isTyping && (
          <div className="flex gap-3 items-end">
            <Avatar subject={subject} />
            <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center h-4">
                <span className="typing-dot w-1.5 h-1.5 bg-muted-foreground rounded-full block"></span>
                <span className="typing-dot w-1.5 h-1.5 bg-muted-foreground rounded-full block"></span>
                <span className="typing-dot w-1.5 h-1.5 bg-muted-foreground rounded-full block"></span>
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      {/* Hints */}
      {messages.length <= 1 && (
        <div className="flex gap-2 flex-wrap py-2">
          {subject.hints.map((h, i) => (
            <button
              key={i}
              onClick={() => sendMessage(h)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all duration-150 hover:shadow-sm"
              style={{
                background: subject.color + '12',
                borderColor: subject.color + '40',
                color: subject.color,
              }}
            >
              {h}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="pt-3 pb-1">
        <div className={`flex items-end gap-2 bg-white rounded-2xl border-2 shadow-sm transition-all duration-200 px-4 py-2.5 focus-within:shadow-md`}
          style={{ borderColor: isListening ? subject.color : 'hsl(var(--border))' }}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={`Спроси по ${subject.name.toLowerCase()}...`}
            className="flex-1 resize-none bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground max-h-28 min-h-[24px] leading-6"
            style={{ fieldSizing: 'content' } as React.CSSProperties}
          />
          <div className="flex items-center gap-1.5 pb-0.5 flex-shrink-0">
            {/* Voice button */}
            <button
              onClick={toggleVoice}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isListening
                  ? 'text-white animate-orb-pulse'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
              style={isListening ? { background: subject.color } : {}}
              title="Голосовой ввод"
            >
              {isListening ? (
                <div className="flex gap-0.5 items-center h-4">
                  {[...Array(7)].map((_, i) => (
                    <span key={i} className="wave-bar w-0.5 rounded-full bg-white" style={{ height: '14px' }} />
                  ))}
                </div>
              ) : (
                <Icon name="Mic" size={16} />
              )}
            </button>
            {/* Send */}
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
              style={{ background: subject.color }}
            >
              <Icon name="ArrowUp" size={15} />
            </button>
          </div>
        </div>
        <p className="text-center text-[11px] text-muted-foreground mt-2">
          Enter — отправить · Shift+Enter — новая строка
        </p>
      </div>
    </div>
  );
}

function Avatar({ subject }: { subject: Subject }) {
  return (
    <div
      className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0 shadow-sm"
      style={{ background: subject.color + '20', border: `2px solid ${subject.color}30` }}
    >
      {subject.emoji}
    </div>
  );
}

function ChatBubble({ msg, subject }: { msg: Message; subject: Subject }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`chat-msg flex gap-3 ${isUser ? 'flex-row-reverse' : 'items-end'}`}>
      {!isUser && <Avatar subject={subject} />}
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
            ? 'rounded-br-sm text-white'
            : 'bg-white border border-border rounded-bl-sm text-foreground'
        }`}
        style={isUser ? { background: subject.color } : {}}
      >
        {msg.text}
      </div>
    </div>
  );
}