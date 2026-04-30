import { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'DELETE':
      return { ...state, expenses: state.expenses.filter(e => e.id !== action.payload) };
    case 'FILTER':
      return { ...state, filter: action.payload };
    case 'EDIT':
      return { ...state, expenses: state.expenses.map(e => e.id === action.payload.id ? action.payload : e) };
    case 'SET_BUDGET':
      return { ...state, budget: action.payload };
    default:
      return state;
  }
}

function loadInitialState() {
  try {
    return {
      expenses: JSON.parse(localStorage.getItem('expenses') || '[]'),
      filter: 'All',
      budget: parseFloat(localStorage.getItem('budget') || '0'),
    };
  } catch {
    return { expenses: [], filter: 'All', budget: 0 };
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
  }, [state.budget]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = state.expenses
    .filter(e => e.date?.startsWith(currentMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses = state.expenses
    .filter(e => state.filter === 'All' || e.category === state.filter)
    .sort((a, b) => b.id - a.id);

  function addExpense(name, amount, category, date) {
    dispatch({
      type: 'ADD',
      payload: {
        id: Date.now(),
        name,
        amount: parseFloat(amount),
        category,
        date: date || new Date().toISOString().slice(0, 10),
      },
    });
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id });
  }

  function setFilter(cat) {
    dispatch({ type: 'FILTER', payload: cat });
  }

  function editExpense(expense) {
    dispatch({ type: 'EDIT', payload: expense });
  }

  function setBudget(amount) {
    dispatch({ type: 'SET_BUDGET', payload: parseFloat(amount) || 0 });
  }

  function exportCSV() {
    const wrap = val => `"${String(val).replace(/"/g, '""')}"`;
    const rows = [
      ['Name', 'Amount', 'Category', 'Date'],
      ...state.expenses.map(e => [wrap(e.name), e.amount, wrap(e.category), wrap(e.date)]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'expenses.csv' });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <ExpenseContext.Provider
      value={{
        expenses: state.expenses,
        filteredExpenses,
        totalAmount,
        monthlyTotal,
        budget: state.budget,
        filter: state.filter,
        categories: CATEGORIES,
        addExpense,
        deleteExpense,
        setFilter,
        editExpense,
        setBudget,
        exportCSV,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  return useContext(ExpenseContext);
}
