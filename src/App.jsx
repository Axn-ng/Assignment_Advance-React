import Greeting from './Greeting.jsx'
import './App.css'

const tips = [
  'Take one small action before aiming for perfect results.',
  'Focus on progress, not pressure.',
  'Pause, breathe, and restart with clarity when stuck.',
  'Protect your energy by finishing one task at a time.',
]
function App() {
  return (
    <main>
      <section className="card">
        <Greeting name="Anaugul Sompoch" />
        <div className="tips-block">
          <h2>Motivational Tips</h2>
          <ul className="tips-list">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App