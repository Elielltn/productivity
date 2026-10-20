# Produto

Uso individual: sem cadastro, login ou múltiplos usuários. Requisito transversal: **tudo funciona offline**.

## 1. Habit Tracker

- Cadastro/edição de hábitos (ex.: correr, academia, ler 10 páginas, estudar).
- Cada hábito tem **dias da semana próprios** (definidos na criação ou depois). Nada é presumido como diário.
- Conclusão marcada **por hábito e por data** (checkbox); visualização de concluídos e pendentes.
- **Métricas semanais**: concluídas ÷ programadas na semana. Dias não programados nunca contam como falha.
  - Mensagem motivacional conforme o desempenho (ex.: "3 de 7... Dá para melhorar!" / "5 de 7... Você está evoluindo!").

## 2. Cronômetro vinculado ao hábito

- Opção `trackTime` por hábito.
- Iniciar, pausar e encerrar sessões; tempo efetivo registrado.
- Total acumulado de horas por hábito (soma das sessões).
- Conclusão e cronômetro aparecem na **mesma área**, sem duplicar atividades.

## 3. Pomodoro

- Ciclos de foco e descanso com durações configuráveis.
- Lista de tarefas do dia = hábitos programados para hoje.
- O usuário pode: ver a lista, **remover temporariamente** um item, **readicioná-lo** e **marcar como concluído**.
- Remover do Pomodoro **não** exclui o hábito nem altera sua programação.
- A conclusão é **compartilhada** com o Habit Tracker.

## Regras de negócio

1. Lista do Pomodoro do dia = hábitos com o dia da semana de hoje − itens removidos hoje.
2. Conclusão = registro único por (hábito, data), compartilhado por todas as telas.
3. Mudar os dias de um hábito vale também para o passado (decisão simplificadora, ver [ADR 0003](decisions/0003-agendamento-simples.md)).
4. Alertas do Pomodoro (sons/notificações) são necessários, inclusive com o app em segundo plano.

## Fora do escopo (por ora)

Múltiplos usuários, autenticação, sincronização em nuvem.
