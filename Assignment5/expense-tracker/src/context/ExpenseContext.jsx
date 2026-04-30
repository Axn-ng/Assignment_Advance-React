import { createContext, useContext, useReducer, useEffect } from 'react';

const ExpenseContext = createContext();

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Other'];

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, expenses: [...state.expenses, action.payload] };
    case 'LOAD':
      return { ...state, expenses: action.payload };
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

const initialState = { expenses: [], filter: 'All', budget: 0 };

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  useEffect(() => {
    const s = localStorage.getItem('expenses');
    if (s) dispatch({ type: 'LOAD', payload: JSON.parse(s) });
    const b = localStorage.getItem('budget');
    if (b) dispatch({ type: 'SET_BUDGET', payload: parseFloat(b) });
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state.expenses]);

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
  }, [state.budget]);

  const totalAmount = state.expenses.reduce((sum, e) => sum + e.amount, 0);

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthlyTotal = state.expenses
    .filter(e => e.date && e.date.startsWith(currentMonth))
    .reduce((sum, e) => sum + e.amount, 0);

  const filteredExpenses =
    state.filter === 'All'
      ? [...state.expenses].sort((a, b) => b.id - a.id)
      : [...state.expenses]
          .filter(e => e.category === state.filter)
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
    const rows = [
      ['Name', 'Amount', 'Category', 'Date'],
      ...state.expenses.map(e => [e.name, e.amount, e.category, e.date]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
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
