import { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import AddExpenseForm from './AddExpenseForm';
import { CATEGORY_COLORS } from '../constants';
import styles from './ExpenseList.module.css';

function ExpenseList() {
  const { filteredExpenses, deleteExpense, filter, setFilter, categories, exportCSV } = useExpenses();
  const [editingExpense, setEditingExpense] = useState(null);

  return (
    <div className={styles.expenseListSection}>
      <div className={styles.listHeader}>
        <h2>Expenses</h2>
        <button className={styles.exportBtn} onClick={exportCSV}>Export CSV</button>
      </div>

      <div className={styles.tabs}>
        {['All', ...categories].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? `${styles.tab} ${styles.active}` : styles.tab}
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
        <p className={styles.emptyMsg}>No expenses found.</p>
      ) : (
        filteredExpenses.map(exp => (
          <div key={exp.id} className={styles.expenseItem}>
            <span className={styles.catDot} style={{ background: CATEGORY_COLORS[exp.category] }} />
            <div className={styles.expenseInfo}>
              <b>{exp.name}</b>
              <span className={styles.expenseMeta}>{exp.category} · {exp.date}</span>
            </div>
            <span className={styles.expenseAmount}>${exp.amount.toFixed(2)}</span>
            <button className={styles.editBtn} onClick={() => setEditingExpense(exp)} title="Edit">✎</button>
            <button className={styles.deleteBtn} onClick={() => deleteExpense(exp.id)} title="Delete">✕</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;
