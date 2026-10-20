import { DEFAULT_SETTINGS } from '../domain/types'
import type { DateKey, Habit, Settings, TimeSession } from '../domain/types'
import type { ProductivityDB } from './db'

export type NewHabit = Pick<Habit, 'name' | 'weekdays'> & Partial<Pick<Habit, 'trackTime'>>

/** Repositórios sobre o banco. Recebem o `db` para facilitar testes. */
export function createRepositories(db: ProductivityDB) {
  return {
    habits: {
      list: () => db.habits.toArray(),
      async add(input: NewHabit): Promise<number> {
        return db.habits.add({
          name: input.name.trim(),
          weekdays: [...new Set(input.weekdays)].sort(),
          trackTime: input.trackTime ?? false,
          archived: false,
          createdAt: Date.now(),
        } as Habit)
      },
      update: (id: number, changes: Partial<Omit<Habit, 'id'>>) => db.habits.update(id, changes),
      archive: (id: number) => db.habits.update(id, { archived: true }),
    },

    completions: {
      listBetween: (from: DateKey, to: DateKey) => db.completions.where('date').between(from, to, true, true).toArray(),
      /** Alterna a conclusão de (hábito, data). Retorna o novo estado. */
      async toggle(habitId: number, date: DateKey): Promise<boolean> {
        return db.transaction('rw', db.completions, async () => {
          const existing = await db.completions.where('[habitId+date]').equals([habitId, date]).first()
          if (existing) {
            await db.completions.delete(existing.id)
            return false
          }
          await db.completions.add({ habitId, date } as never)
          return true
        })
      },
    },

    pomodoroSkips: {
      listFor: (date: DateKey) => db.pomodoroSkips.where('date').equals(date).toArray(),
      async skip(habitId: number, date: DateKey) {
        const exists = await db.pomodoroSkips.where('[habitId+date]').equals([habitId, date]).first()
        if (!exists) await db.pomodoroSkips.add({ habitId, date } as never)
      },
      async restore(habitId: number, date: DateKey) {
        await db.pomodoroSkips.where('[habitId+date]').equals([habitId, date]).delete()
      },
    },

    timeSessions: {
      list: () => db.timeSessions.toArray(),
      add: (session: Omit<TimeSession, 'id'>) => db.timeSessions.add(session as TimeSession),
    },

    settings: {
      async get(): Promise<Settings> {
        const row = await db.settings.get('main')
        return { ...DEFAULT_SETTINGS, ...row }
      },
      async save(settings: Settings) {
        await db.settings.put({ ...settings, id: 'main' })
      },
    },
  }
}

export type Repositories = ReturnType<typeof createRepositories>
