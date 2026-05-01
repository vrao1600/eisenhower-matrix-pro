import { useState, useEffect } from "react";
import { Plus, ArrowRight, Trash2, X } from "lucide-react";

const QUADRANTS = ["do", "decide", "delegate", "delete"];

const QUADRANT_CONFIG = {
  do: {
    label: "Do",
    subtitle: "Urgent & Important",
    bg: "bg-red-50",
    border: "border-red-200",
    headerBg: "bg-red-100",
    headerText: "text-red-800",
    subtitleText: "text-red-500",
    badgeBg: "bg-red-200",
    badgeText: "text-red-700",
    btnBorder: "border-red-300",
    btnText: "text-red-700",
    btnHover: "hover:bg-red-100",
    dot: "bg-red-400",
  },
  decide: {
    label: "Decide",
    subtitle: "Not Urgent & Important",
    bg: "bg-blue-50",
    border: "border-blue-200",
    headerBg: "bg-blue-100",
    headerText: "text-blue-800",
    subtitleText: "text-blue-500",
    badgeBg: "bg-blue-200",
    badgeText: "text-blue-700",
    btnBorder: "border-blue-300",
    btnText: "text-blue-700",
    btnHover: "hover:bg-blue-100",
    dot: "bg-blue-400",
  },
  delegate: {
    label: "Delegate",
    subtitle: "Urgent & Not Important",
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    headerBg: "bg-yellow-100",
    headerText: "text-yellow-800",
    subtitleText: "text-yellow-600",
    badgeBg: "bg-yellow-200",
    badgeText: "text-yellow-700",
    btnBorder: "border-yellow-300",
    btnText: "text-yellow-700",
    btnHover: "hover:bg-yellow-100",
    dot: "bg-yellow-400",
  },
  delete: {
    label: "Delete",
    subtitle: "Not Urgent & Not Important",
    bg: "bg-green-50",
    border: "border-green-200",
    headerBg: "bg-green-100",
    headerText: "text-green-800",
    subtitleText: "text-green-600",
    badgeBg: "bg-green-200",
    badgeText: "text-green-700",
    btnBorder: "border-green-300",
    btnText: "text-green-700",
    btnHover: "hover:bg-green-100",
    dot: "bg-green-400",
  },
};

const STORAGE_KEY = "eisenhower-tasks";

function generateId() {
  return `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function nextQuadrant(current) {
  const idx = QUADRANTS.indexOf(current);
  return QUADRANTS[(idx + 1) % QUADRANTS.length];
}

function AddTaskInput({ quadrant, onAdd }) {
  const [value, setValue] = useState("");
  const cfg = QUADRANT_CONFIG[quadrant];

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a task…"
        className={`flex-1 min-w-0 text-sm px-3 py-1.5 rounded-lg border ${cfg.border} bg-white focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-opacity-40 placeholder-gray-400 text-gray-700`}
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${cfg.btnBorder} ${cfg.btnText} ${cfg.btnHover}`}
      >
        <Plus size={14} />
        Add
      </button>
    </form>
  );
}

function TaskCard({ task, onMove, onDelete }) {
  const cfg = QUADRANT_CONFIG[task.quadrant];
  const next = nextQuadrant(task.quadrant);
  const nextCfg = QUADRANT_CONFIG[next];

  return (
    <div
      className={`group flex items-start gap-2 p-2.5 rounded-lg bg-white border ${cfg.border} shadow-sm`}
    >
      <span className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
      <p className="flex-1 min-w-0 text-sm text-gray-700 leading-snug break-words">
        {task.text}
      </p>
      <div className="flex-shrink-0 flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onMove(task.id)}
          title={`Move to ${nextCfg.label}`}
          className={`flex items-center gap-1 px-2 py-1 rounded-md border text-xs font-medium transition-colors ${nextCfg.btnBorder} ${nextCfg.btnText} ${nextCfg.btnHover}`}
        >
          <ArrowRight size={12} />
          {nextCfg.label}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          title="Remove task"
          className="p-1 rounded-md border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
}

function Quadrant({ id, tasks, onAdd, onMove, onDelete }) {
  const cfg = QUADRANT_CONFIG[id];
  const count = tasks.length;

  return (
    <div className={`flex flex-col rounded-2xl border ${cfg.border} ${cfg.bg} overflow-hidden`}>
      <div className={`${cfg.headerBg} px-4 pt-4 pb-3`}>
        <div className="flex items-center justify-between">
          <h2 className={`text-base font-semibold ${cfg.headerText}`}>{cfg.label}</h2>
          {count > 0 && (
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
              {count}
            </span>
          )}
        </div>
        <p className={`text-xs mt-0.5 ${cfg.subtitleText}`}>{cfg.subtitle}</p>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4 pt-3 gap-2 min-h-[160px]">
        {tasks.length === 0 && (
          <p className="text-xs text-gray-400 italic mt-1">No tasks yet</p>
        )}
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onMove={onMove} onDelete={onDelete} />
        ))}
        <AddTaskInput quadrant={id} onAdd={(text) => onAdd(text, id)} />
      </div>
    </div>
  );
}

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // storage unavailable — fail silently
    }
  }, [tasks]);

  function addTask(text, quadrant) {
    setTasks((prev) => [
      ...prev,
      { id: generateId(), text, quadrant, createdAt: Date.now() },
    ]);
  }

  function moveTask(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, quadrant: nextQuadrant(t.quadrant) } : t
      )
    );
  }

  function deleteTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function clearAll() {
    if (window.confirm("Clear all tasks?")) setTasks([]);
  }

  const totalCount = tasks.length;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              Eisenhower Matrix
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Prioritize tasks by urgency &amp; importance
            </p>
          </div>
          <div className="flex items-center gap-3">
            {totalCount > 0 && (
              <span className="text-xs text-gray-400">{totalCount} task{totalCount !== 1 ? "s" : ""}</span>
            )}
            {totalCount > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600 border border-red-200 hover:border-red-300 hover:bg-red-50 px-2.5 py-1.5 rounded-lg transition-colors"
              >
                <Trash2 size={12} />
                Clear all
              </button>
            )}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {QUADRANTS.map((id) => (
            <Quadrant
              key={id}
              id={id}
              tasks={tasks.filter((t) => t.quadrant === id)}
              onAdd={addTask}
              onMove={moveTask}
              onDelete={deleteTask}
            />
          ))}
        </div>

        <footer className="mt-6 text-center text-xs text-gray-400">
          Tasks auto-saved to local storage &middot; Move cycles: Do → Decide → Delegate → Delete → Do
        </footer>
      </div>
    </div>
  );
}