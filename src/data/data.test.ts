import 'fake-indexeddb/auto'
import { beforeEach, describe, expect, it } from 'vitest'
import { isCompleted, pomodoroListFor } from '../domain/schedule'
import { exportBackup, importBackup } from './backup'
import { ProductivityDB } from './db'
import { createRepositories } from './repositories'

let db: ProductivityDB
let repo: ReturnType<typeof createRepositories>
let n = 0

beforeEach(async () => {
  db = new ProductivityDB(`test-${n++}`)
  repo = createRepositories(db)
})

describe('repositórios', () => {
  it('cadastra hábito e normaliza dias', async () => {
    const id = await repo.habits.add({ name: '  Correr ', weekdays: [5, 1, 1, 3] })
    const [habit] = await repo.habits.list()
    expect(habit).toMatchObject({ id, name: 'Correr', weekdays: [1, 3, 5], trackTime: false, archived: false })
  })

  it('alterna conclusão por (hábito, data) sem duplicar', async () => {
    const id = await repo.habits.add({ name: 'Ler', weekdays: [0, 1, 2, 3, 4, 5, 6] })
    expect(await repo.completions.toggle(id, '2026-10-20')).toBe(true)
    expect(isCompleted(await repo.completions.listBetween('2026-10-19', '2026-10-25'), id, '2026-10-20')).toBe(true)
    expect(await repo.completions.toggle(id, '2026-10-20')).toBe(false)
    expect(await repo.completions.listBetween('2026-10-19', '2026-10-25')).toHaveLength(0)
  })

  it('remover do Pomodoro não altera o hábito e pode ser desfeito', async () => {
    const id = await repo.habits.add({ name: 'Estudar', weekdays: [0, 1, 2, 3, 4, 5, 6] })
    await repo.pomodoroSkips.skip(id, '2026-10-20')
    await repo.pomodoroSkips.skip(id, '2026-10-20') // idempotente
    const habits = await repo.habits.list()
    expect(habits[0].weekdays).toHaveLength(7)
    expect(pomodoroListFor(habits, await repo.pomodoroSkips.listFor('2026-10-20'), '2026-10-20')).toEqual([])
    await repo.pomodoroSkips.restore(id, '2026-10-20')
    expect(pomodoroListFor(habits, await repo.pomodoroSkips.listFor('2026-10-20'), '2026-10-20')).toHaveLength(1)
  })

  it('configurações usam padrões e persistem alterações', async () => {
    expect((await repo.settings.get()).focusMin).toBe(25)
    await repo.settings.save({ focusMin: 50, breakMin: 10, longBreakMin: 20, cycles: 3 })
    expect((await repo.settings.get()).focusMin).toBe(50)
  })
})

describe('backup', () => {
  it('exporta e importa os dados', async () => {
    const id = await repo.habits.add({ name: 'Academia', weekdays: [2, 4, 6], trackTime: true })
    await repo.completions.toggle(id, '2026-10-20')
    await repo.timeSessions.add({ habitId: id, start: 0, end: 1000, durationSec: 1 })
    const backup = await exportBackup(db)

    const other = new ProductivityDB(`test-${n++}`)
    await importBackup(other, JSON.parse(JSON.stringify(backup)))
    expect(await other.habits.count()).toBe(1)
    expect(await other.completions.count()).toBe(1)
    expect(await other.timeSessions.count()).toBe(1)
  })

  it('rejeita arquivo inválido', async () => {
    await expect(importBackup(db, { app: 'x' } as never)).rejects.toThrow()
  })
})
