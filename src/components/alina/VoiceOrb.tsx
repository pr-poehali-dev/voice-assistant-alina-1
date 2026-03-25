import React from 'react';

interface VoiceOrbProps {
  isListening: boolean;
  isSpeaking: boolean;
  onClick: () => void;
}

const VoiceOrb: React.FC<VoiceOrbProps> = ({ isListening, isSpeaking, onClick }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex items-center justify-center">
        {(isListening || isSpeaking) && (
          <>
            <div
              className="absolute rounded-full animate-pulse-ring"
              style={{
                width: 100,
                height: 100,
                background: isListening
                  ? 'hsl(210 65% 55% / 0.15)'
                  : 'hsl(185 70% 45% / 0.15)',
                border: `1px solid ${isListening ? 'hsl(210 65% 55% / 0.3)' : 'hsl(185 70% 45% / 0.3)'}`,
              }}
            />
            <div
              className="absolute rounded-full animate-pulse-ring"
              style={{
                width: 120,
                height: 120,
                animationDelay: '0.4s',
                background: 'transparent',
                border: `1px solid ${isListening ? 'hsl(210 65% 55% / 0.12)' : 'hsl(185 70% 45% / 0.12)'}`,
              }}
            />
          </>
        )}

        <button
          onClick={onClick}
          className="relative z-10 flex items-center justify-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
          style={{
            width: 72,
            height: 72,
            background: isListening
              ? 'linear-gradient(135deg, hsl(210 65% 45%), hsl(185 70% 38%))'
              : isSpeaking
              ? 'linear-gradient(135deg, hsl(185 70% 38%), hsl(210 65% 45%))'
              : 'linear-gradient(135deg, hsl(220 18% 15%), hsl(220 18% 18%))',
            border: '1px solid hsl(var(--border))',
            boxShadow: isListening
              ? '0 0 24px hsl(210 65% 55% / 0.35), inset 0 1px 0 hsl(210 65% 70% / 0.15)'
              : isSpeaking
              ? '0 0 24px hsl(185 70% 45% / 0.35), inset 0 1px 0 hsl(185 70% 60% / 0.15)'
              : 'inset 0 1px 0 hsl(220 15% 25% / 0.5)',
            focusRingColor: 'hsl(var(--primary))',
          }}
          aria-label={isListening ? 'Остановить запись' : 'Начать запись'}
        >
          {isListening ? (
            <div className="flex items-end gap-0.5" style={{ height: 24 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="wave-bar rounded-full"
                  style={{
                    width: 3,
                    height: 24,
                    background: 'white',
                    transformOrigin: 'bottom',
                  }}
                />
              ))}
            </div>
          ) : isSpeaking ? (
            <div className="flex items-end gap-0.5" style={{ height: 24 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="wave-bar rounded-full"
                  style={{
                    width: 3,
                    height: 24,
                    background: 'white',
                    transformOrigin: 'bottom',
                    animationDuration: '1.1s',
                  }}
                />
              ))}
            </div>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
              <line x1="12" x2="12" y1="19" y2="22"/>
            </svg>
          )}
        </button>
      </div>

      <div className="text-xs font-mono" style={{ color: 'hsl(var(--muted-foreground))' }}>
        {isListening ? (
          <span style={{ color: 'hsl(var(--primary))' }}>● ЗАПИСЬ</span>
        ) : isSpeaking ? (
          <span style={{ color: 'hsl(185 70% 45%)' }}>◈ АЛИНА ГОВОРИТ</span>
        ) : (
          <span>нажмите для записи</span>
        )}
      </div>
    </div>
  );
};

export default VoiceOrb;
