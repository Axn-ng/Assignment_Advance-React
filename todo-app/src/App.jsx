import { useState, useEffect } from 'react';
import TaskInput from './components/TaskInput';
import TaskItem from './components/TaskItem';

const initialTasks = [
  { id: 1, text: 'Complete React Session 3', completed: true },
  { id: 2, text: 'Read React docs',          completed: false },
  { id: 3, text: 'Read React documentation', completed: false },
];

let nextId = 4;

function App() {
  // ── State ────────────────────────────────────────────────
  // Challenge: localStorage — lazy initializer อ่านค่าจาก localStorage ตอนเริ่ม
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('todo-tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [filter, setFilter] = useState('all');

  // ── Challenge: localStorage — บันทึกทุกครั้งที่ tasks เปลี่ยน ──
  useEffect(() => {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // ── Handlers ─────────────────────────────────────────────
  function handleAddTask(text) {
    setTasks([...tasks, { id: nextId++, text, completed: false }]);
  }

  function handleToggle(id) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  }

  function handleDelete(id) {
    setTasks(tasks.filter(t => t.id !== id));
  }

  // ── Challenge: Edit ──────────────────────────────────────
  function handleEdit(id, newText) {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ));
  }

  // ── Challenge: Select All ────────────────────────────────
  function handleSelectAll() {
    setTasks(tasks.map(t => ({ ...t, completed: !allDone })));
  }

  // ── Challenge: Derived State (task count) ────────────────
  const allDone    = tasks.length > 0 && tasks.every(t => t.completed);
  const remaining  = tasks.filter(t => !t.completed).length;
  const completedCount = tasks.filter(t => t.completed).length;

  // ── Filter ───────────────────────────────────────────────
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active')    return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  // ── Render ───────────────────────────────────────────────
  return (
    <div className="app-bg">
      <div className="todo-card">

        <h1>✓ My To-Do List</h1>

        {/* Step 3 — TaskInput component */}
        <TaskInput onAddTask={handleAddTask} />

        {/* Challenge: task count badge */}
        <div className="stats-row">
          <span>{remaining} tasks remaining</span>
          <span>{completedCount} completed</span>
        </div>

        {/* Challenge: Select All checkbox */}
        <div className="controls-row">
          <label className="select-all-label">
            <input
              type="checkbox"
              checked={allDone}
              onChange={handleSelectAll}
            />
            Mark all complete
          </label>

          {/* Filter buttons */}
          <div className="filter-bar">
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active-filter' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — TaskItem rendered per task */}
        {filteredTasks.length === 0 ? (
          <p className="empty-message">No tasks here</p>
        ) : (
          <ul className="task-list">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        )}

        {/* Clear Completed */}
        {completedCount > 0 && (
          <button
            className="clear-btn"
            onClick={() => setTasks(tasks.filter(t => !t.completed))}
          >
            Clear {completedCount} Completed
          </button>
        )}

      </div>
    </div>
  );
}

export default App;