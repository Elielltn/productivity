import { db } from '../data/db'
import { useState } from 'react'
import { createRepositories } from '../data/repositories'
import {
  WEEKDAY_LABELS,
  HABIT_ERROR_MESSAGES,
  type HabitValidationError,
  validateHabit,
} from '../domain/habits'
import type { Weekday } from '../domain/types'

const repos = createRepositories(db)

function HabitForm() {
  const [name, setName] = useState('')
  const [selectedDays, setSelectedDays] = useState<Weekday[]>([])
  const [activeErrors, setActiveErrors] = useState<HabitValidationError[]>([])

  function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value)
  }

  function toggleDay(index: Weekday) {
    if (selectedDays.includes(index)) {
      setSelectedDays(selectedDays.filter((i) => i !== index))
    } else {
      setSelectedDays([...selectedDays, index])
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const errors = validateHabit({ name, weekdays: selectedDays })
    setActiveErrors(errors)

    if (errors.length > 0) {
      return
    }

    await repos.habits.add({ name, weekdays: selectedDays })

    setName('')
    setSelectedDays([])
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="habitInput">Hábito</label>
      <input
        id="habitInput"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      {WEEKDAY_LABELS.map((day, i) => (
        <button
          type="button"
          aria-pressed={selectedDays.includes(i as Weekday)}
          onClick={() => toggleDay(i as Weekday)}
          key={i}
        >
          {day}
        </button>
      ))}
      <button type="submit">Adicionar</button>
      {activeErrors.map((error) => (
        <p key={error}>{HABIT_ERROR_MESSAGES[error]}</p>
      ))}
    </form>
  )
}

export default HabitForm
