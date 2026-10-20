import { useLiveQuery } from 'dexie-react-hooks'
import { db } from './db'

export function useHabits() {
  const habits = useLiveQuery(() =>
    db.habits.filter((h) => h.archived === false).sortBy('name'),
  )

  return habits
}
