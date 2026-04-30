import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import AddExpenseForm from './AddExpenseForm';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Entertainment: '#9c27b0',
  Shopping: '#e91e63',
  Health: '#10b981',
  Other: '#607d8b',
};

function ExpenseList() {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories, exportCSV } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);

  return (
    <div className="expense-list-section">
      <div className="list-header">
        <h2>Expenses</h2>
        <button className="export-btn" onClick={exportCSV}>Export CSV</button>
      </div>

      <div className="tabs">
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'tab active' : 'tab'}
          >
            {cat}
          </button>
        ))}
      </div>

      {editingExpense && (
        <AddExpenseForm
          editingExpense={editingExpense}
          onCancelEdit={() => setEditingExpense(null)}
        />
      )}

      {filteredExpenses.length === 0 ? (
        <p className="empty-msg">No expenses found.</p>
      ) : (
        filteredExpenses.map(exp => (
          <div key={exp.id} className="expense-item">
            <span
              className="cat-dot"
              style={{ background: COLORS[exp.category] || '#607d8b' }}
            />
            <div className="expense-info">
              <b>{exp.name}</b>
              <span className="expense-meta">{exp.category} · {exp.date}</span>
            </div>
            <span className="expense-amount">${exp.amount.toFixed(2)}</span>
            <button
              className="edit-btn"
              onClick={() => setEditingExpense(exp)}
              title="Edit"
            >
              ✎
            </button>
            <button
              className="delete-btn"
              onClick={() => deleteExpense(exp.id)}
              title="Delete"
            >
              ✕
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
