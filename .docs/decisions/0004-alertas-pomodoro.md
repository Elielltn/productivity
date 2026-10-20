# 0004 — Alertas do Pomodoro em segundo plano

**Status:** Aceito

## Contexto
O usuário quer alertas sonoros/notificações do Pomodoro mesmo com o app em segundo plano.

## Decisão
- Cronômetros baseados em timestamps (não em contagem de ticks).
- Notification API + som na PWA.
- Considerar Tauri (notificações nativas) caso o navegador seja limitante.

## Consequências
- Abas inativas sofrem throttling de timers; o cálculo por timestamp mantém a precisão, mas o alerta pode atrasar.
- Tauri fica como evolução provável (etapa 7 do roadmap).
