import { useState } from 'react'
import './App.css'

function GoalInput({ onAddGoal }) {
  const [title, setTitle] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAddGoal(trimmed)
    setTitle('')
  }

  return (
    <form className="goal-input" onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new goal"
        aria-label="New goal"
      />
      <button type="submit">Add</button>
    </form>
  )
}

function GoalItem({ goal, onMarkDone, onDelete }) {
  return (
    <li className="goal-item">
      <label className="goal-toggle">
        <input
          type="checkbox"
          checked={goal.done}
          onChange={() => onMarkDone(goal.id)}
        />
        <span className={goal.done ? 'goal-done' : ''}>{goal.text}</span>
      </label>
      <div className="goal-buttons">
        <button onClick={() => onDelete(goal.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </li>
  )
}

function GoalList({ title, goals, onMarkDone, onDelete }) {
  return (
    <section className="goal-section">
      <h2>{title}</h2>
      {goals.length === 0 ? (
        <p className="empty">No {title.toLowerCase()}.</p>
      ) : (
        <ul className="goal-list">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onMarkDone={onMarkDone}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  )
}

function App() {
  const [goals, setGoals] = useState([])

  const addGoal = (text) => {
    setGoals((prev) => [
      ...prev,
      { id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(), text, done: false },
    ])
  }

  const markGoalDone = (id) => {
    setGoals((prev) =>
      prev.map((goal) => (goal.id === id ? { ...goal, done: !goal.done } : goal))
    )
  }

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((goal) => goal.id !== id))
  }

  const activeGoals = goals.filter((goal) => !goal.done)
  const doneGoals = goals.filter((goal) => goal.done)

  return (
    <main className="app-shell">
      <h1>Goal Manager</h1>
      <GoalInput onAddGoal={addGoal} />
      <div className="goal-grid">
        <GoalList
          title="Active Goals"
          goals={activeGoals}
          onMarkDone={markGoalDone}
          onDelete={deleteGoal}
        />
        <GoalList
          title="Completed Goals"
          goals={doneGoals}
          onMarkDone={markGoalDone}
          onDelete={deleteGoal}
        />
      </div>
    </main>
  )
}

export default App
