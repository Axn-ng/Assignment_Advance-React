import { useExpenses } from '../context/ExpenseContext';
import { CATEGORY_COLORS } from '../constants';
import styles from './ExpenseSummary.module.css';

function ExpenseSummary() {
  const { expenses, totalAmount, categories, monthlyTotal, budget, setBudget } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  const maxCategoryAmount = Math.max(...Object.values(byCategory), 1);
  const budgetPercent = budget > 0 ? Math.min((monthlyTotal / budget) * 100, 100) : 0;
  const isOverBudget = budget > 0 && monthlyTotal > budget;

  return (
    <div className={styles.summary}>
      <h3 className={styles.totalAmount}>${totalAmount.toFixed(2)}</h3>
      <p className={styles.transactionCount}>{expenses.length} transactions</p>

      <div className={styles.budgetSection}>
        <label htmlFor="budget-input">Monthly Budget ($)</label>
        <input
          id="budget-input"
          type="number"
          value={budget || ''}
          onChange={e => setBudget(e.target.value)}
          placeholder="Set budget"
          className={styles.budgetInput}
          min="0"
          step="0.01"
        />
        {budget > 0 && (
          <>
            <div className={styles.budgetBarWrap}>
              <div
                className={styles.budgetBarFill}
                style={{ width: `${budgetPercent}%`, background: isOverBudget ? '#e53e3e' : '#111' }}
              />
            </div>
            <p className={styles.budgetText} style={{ color: isOverBudget ? '#e53e3e' : '#999' }}>
              ${monthlyTotal.toFixed(2)} / ${budget.toFixed(2)} ({budgetPercent.toFixed(0)}% this month)
            </p>
            {isOverBudget && <p className={styles.overBudgetWarning}>Over budget this month</p>}
          </>
        )}
      </div>

      {Object.keys(byCategory).length > 0 && (
        <div className={styles.chartSection}>
          <h4>By Category</h4>
          {Object.entries(byCategory).map(([cat, amt]) => (
            <div key={cat} className={styles.chartRow}>
              <span className={styles.chartLabel}>{cat}</span>
              <div className={styles.chartBarWrap}>
                <div
                  className={styles.chartBar}
                  style={{ width: `${(amt / maxCategoryAmount) * 100}%`, background: CATEGORY_COLORS[cat] }}
                />
              </div>
              <span className={styles.chartAmount}>${amt.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;
