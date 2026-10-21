import { requestPersistentStorage } from './data/db'
import HabitForm from './components/HabitForm'
import { useHabits } from './data/useHabits'
import { WEEKDAY_LABELS } from './domain/habits'

export default function App() {
  void requestPersistentStorage()

  const habits = useHabits()

  return (
    <main>
      <h1>Productivity</h1>
      <p>Hábitos, tempo e Pomodoro — 100% offline.</p>
      <p>
        Base do projeto pronta (etapa 1). As telas virão nas próximas etapas.
      </p>
      <HabitForm />
      {habits === undefined ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {habits.map((h) => (
            <li key={h.id}>
              {h.name}{' '}
              <span>
                {h.weekdays.map((d) => WEEKDAY_LABELS[d]).join(', ')}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
