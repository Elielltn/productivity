import { requestPersistentStorage } from './data/db'

export default function App() {
  void requestPersistentStorage()

  return (
    <main>
      <h1>Productivity</h1>
      <p>Hábitos, tempo e Pomodoro — 100% offline.</p>
      <p>Base do projeto pronta (etapa 1). As telas virão nas próximas etapas.</p>
    </main>
  )
}
