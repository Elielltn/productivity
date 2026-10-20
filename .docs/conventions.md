# Convenções

## Documentação

- Documentação em Markdown, em português, dentro de `.docs/`.
- **Mesmo commit**: mudou comportamento, estrutura ou decisão → atualize os docs afetados.
- Checklist ao fechar uma iteração:
  - [ ] `README.md` (status, funcionalidades, como rodar)
  - [ ] `.docs/roadmap.md` (status das etapas)
  - [ ] `.docs/data-model.md` e `.docs/architecture.md`, se mudaram
  - [ ] Novo ADR em `.docs/decisions/`, se houve decisão relevante
  - [ ] `CHANGELOG.md`
- Docs descrevem o estado **real**; propostas ficam marcadas como "planejado/proposta".

## ADRs

Arquivos `decisions/NNNN-titulo.md` com: Contexto, Decisão, Consequências, Status. Não apague ADRs antigos: marque-os como "Substituído por NNNN".

## Commits

[Conventional Commits](https://www.conventionalcommits.org/) (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`).

## Código (previsto)

- TypeScript estrito; regras de domínio como funções puras em módulo próprio, com testes.
- Datas de conclusão como `YYYY-MM-DD` no fuso local.
