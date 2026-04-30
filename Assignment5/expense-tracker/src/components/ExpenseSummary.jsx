import { useExpenses } from '../context/ExpenseContext';

const COLORS = {
  Food: '#ff9500',
  Transport: '#0077cc',
  Entertainment: '#9c27b0',
  Shopping: '#e91e63',
  Health: '#10b981',
  Other: '#607d8b',
};

function ExpenseSummary() {
  const { expenses, totalAmount, categories, monthlyTotal, budget, setBudget } = useExpenses();

  const byCategory = categories.reduce((acc, cat) => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0);
    if (total > 0) acc[cat] = total;
    return acc;
  }, {});

  const maxCategoryAmount = Math.max(...Object.values(byCategory), 1);
  const budgetPercent = budget > 0 ? Math.min((monthlyTotal / budget) * 100, 100) : 0;
  const isOverBudget = budget > 0 && monthlyTotal > budget;

  return (
    <div className="summary">
      <h3 className="total-amount">${totalAmount.toFixed(2)}</h3>
      <p className="transaction-count">{expenses.length} transactions</p>

      <div className="budget-section">
        <label htmlFor="budget-input">Monthly Budget ($)</label>
        <input
          id="budget-input"
          type="number"
          value={budget || ''}
          onChange={e => setBudget(e.target.value)}
          placeholder="Set budget"
          className="budget-input"
          min="0"
          step="0.01"
        />
        {budget > 0 && (
          <>
            <div className="budget-bar-wrap">
              <div
                className="budget-bar-fill"
                style={{
                  width: `${budgetPercent}%`,
                  background: isOverBudget ? '#ef4444' : '#047857',
                }}
              />
            </div>
            <p className="budget-text" style={{ color: isOverBudget ? '#ef4444' : '#666' }}>
              ${monthlyTotal.toFixed(2)} / ${Number(budget).toFixed(2)} ({budgetPercent.toFixed(0)}% this month)
            </p>
            {isOverBudget && (
              <p className="over-budget-warning">⚠ Over budget this month!</p>
            )}
          </>
        )}
      </div>

      {Object.keys(byCategory).length > 0 && (
        <div className="chart-section">
          <h4>By Category</h4>
          {Object.entries(byCategory).map(([cat, amt]) => (
            <div key={cat} className="chart-row">
              <span className="chart-label">{cat}</span>
              <div className="chart-bar-wrap">
                <div
                  className="chart-bar"
                  style={{
                    width: `${(amt / maxCategoryAmount) * 100}%`,
                    background: COLORS[cat] || '#607d8b',
                  }}
                />
              </div>
              <span className="chart-amount">${amt.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseSummary;
