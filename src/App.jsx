import { ExpenseProvider } from './context/ExpenseContext';
import ExpenseSummary from './components/ExpenseSummary';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import styles from './App.module.css';

const title = import.meta.env.VITE_APP_APP_TITLE || 'Expense Tracker';

function App() {
  return (
    <ExpenseProvider>
      <div className={styles.app}>
        <header>
          <h1>{title}</h1>
        </header>
        <div className={styles.mainLayout}>
          <aside>
            <ExpenseSummary />
          </aside>
          <main>
            <AddExpenseForm />
            <ExpenseList />
          </main>
        </div>
      </div>
    </ExpenseProvider>
  );
}

export default App;
