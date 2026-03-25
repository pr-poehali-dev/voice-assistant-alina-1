import { Subject } from './AlinaApp';

interface Props {
  subjects: Subject[];
  onSelect: (s: Subject) => void;
}

export default function SubjectGrid({ subjects, onSelect }: Props) {
  return (
    <div className="flex flex-col gap-8 py-4 animate-fade-in">
      {/* Hero */}
      <div className="text-center pt-4 pb-2">
        <div className="inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-violet-700 items-center justify-center text-3xl shadow-lg mb-4 animate-float">
          🎓
        </div>
        <h1 className="font-['Montserrat'] font-black text-3xl text-foreground tracking-tight mb-2">
          Привет! Я Алина
        </h1>
        <p className="text-muted-foreground max-w-sm mx-auto text-base">
          Помогу разобраться с любым школьным предметом. Выбери тему:
        </p>
      </div>

      {/* Subject cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {subjects.map((subj, i) => (
          <button
            key={subj.id}
            onClick={() => onSelect(subj)}
            className={`animate-fade-in-scale stagger-${Math.min(i + 1, 8)} group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${subj.bg} ${subj.border} hover:shadow-lg hover:scale-[1.03] transition-all duration-200 cursor-pointer text-left`}
          >
            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">{subj.emoji}</span>
            <span className="font-semibold text-sm text-foreground">{subj.name}</span>
          </button>
        ))}
      </div>

      {/* Quick hint */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          или просто напиши свой вопрос — Алина сама разберётся, какой это предмет
        </p>
      </div>

      {/* Free question */}
      <FreeQuestion onSelect={onSelect} subjects={subjects} />
    </div>
  );
}

function FreeQuestion({ onSelect, subjects }: { onSelect: (s: Subject) => void; subjects: Subject[] }) {
  const mathSubject = subjects.find(s => s.id === 'math')!;
  return (
    <button
      onClick={() => onSelect(mathSubject)}
      className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl border-2 border-dashed border-violet-200 bg-violet-50/60 hover:bg-violet-50 hover:border-violet-300 transition-all duration-200 group"
    >
      <div className="w-9 h-9 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600 group-hover:bg-violet-200 transition-colors flex-shrink-0">
        ✨
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold text-foreground">Задать любой вопрос</div>
        <div className="text-xs text-muted-foreground">Без выбора предмета</div>
      </div>
    </button>
  );
}
