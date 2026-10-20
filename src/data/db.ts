import Dexie, { type EntityTable } from 'dexie'
import type { Completion, Habit, PomodoroSkip, Settings, TimeSession } from '../domain/types'

/** Linha única da tabela `settings` (chave fixa). */
export type SettingsRow = Settings & { id: 'main' }

export class ProductivityDB extends Dexie {
  habits!: EntityTable<Habit, 'id'>
  completions!: EntityTable<Completion, 'id'>
  timeSessions!: EntityTable<TimeSession, 'id'>
  pomodoroSkips!: EntityTable<PomodoroSkip, 'id'>
  settings!: EntityTable<SettingsRow, 'id'>

  constructor(name = 'productivity') {
    super(name)
    this.version(1).stores({
      habits: '++id, archived',
      completions: '++id, &[habitId+date], date',
      timeSessions: '++id, habitId, start',
      pomodoroSkips: '++id, &[habitId+date], date',
      settings: 'id',
    })
  }
}

export const db = new ProductivityDB()

/** Pede ao navegador para não apagar os dados automaticamente. */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false
  return navigator.storage.persist()
}
