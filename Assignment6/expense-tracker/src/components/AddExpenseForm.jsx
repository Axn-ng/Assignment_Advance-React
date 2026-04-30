import { useState, useEffect } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import styles from './AddExpenseForm.module.css';

const today = () => new Date().toISOString().slice(0, 10);

function AddExpenseForm({ editingExpense, onCancelEdit }) {
  const { addExpense, editExpense, categories } = useExpenses();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!editingExpense) return;
    setName(editingExpense.name);
    setAmount(String(editingExpense.amount));
    setCategory(editingExpense.category);
    setDate(editingExpense.date);
  }, [editingExpense]);

  function reset() {
    setName('');
    setAmount('');
    setCategory(categories[0]);
    setDate(today());
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim()) { setError('Enter expense name'); return; }
    if (!amount || parseFloat(amount) <= 0) { setError('Enter a valid amount'); return; }

    if (editingExpense) {
      editExpense({ ...editingExpense, name: name.trim(), amount: parseFloat(amount), category, date });
      onCancelEdit();
      return;
    }

    addExpense(name.trim(), amount, category, date);
    reset();
  }

  return (
    <div className={styles.addForm}>
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.formError}>{error}</p>}
        <div className={styles.formGrid}>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Expense name"
          />
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="Amount"
            step="0.01"
            min="0"
          />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div className={styles.formActions}>
          <button type="submit">{editingExpense ? 'Update' : '+ Add'}</button>
          {editingExpense && (
            <button type="button" onClick={onCancelEdit}>Cancel</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddExpenseForm;
