import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  // Challenge: Edit — local state สำหรับ editing mode
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  function handleSave() {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
    } else {
      setEditText(task.text);
    }
    setEditing(false);
  }

  return (
    <li className={`task-item${task.completed ? " completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        {/* Challenge: Edit — สลับระหว่าง span และ input */}
        {editing ? (
          <input
            className="task-edit-input"
            value={editText}
            autoFocus
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") {
                setEditText(task.text);
                setEditing(false);
              }
            }}
          />
        ) : (
          <span onDoubleClick={() => setEditing(true)}>
            {task.text}
          </span>
        )}
      </label>

      {/* Challenge: Edit button */}
      <button className="edit-btn" onClick={() => setEditing(true)}>
        ✏
      </button>

      <button onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}

export default TaskItem;