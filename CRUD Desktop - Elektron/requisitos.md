# Avaliação — Cadastro de Clubes e Atletas

Disciplina: Desenvolvimento de Aplicações Desktop (DAD)
Conteúdo cobrado: Aulas 01 a 05 (Setup de Persistência e CRUD completo — Create, Read, Update, Delete)

## O cenário

O projeto é um sistema de cadastro para uma clube de futebol, com dois cadastros: **Clube** e **Atleta**. A estrutura é a mesma que já usamos nas Aulas 1 a 5 com o Gerenciador de Peças 3D (`insumo`/`peca_impressa`) — só que agora sobre um elenco de atletas.

## O que já está pronto para vocês

- **Banco de dados**: o script `sql/criar_tabelas.sql` já cria as duas tabelas (`clube` e `atleta`), com `DROP TABLE IF EXISTS` e já populado com alguns registros de exemplo — é só rodar no seu banco.
- **Ambiente de conexão**: `src/main/conexao.js` já está implementado exatamente como vimos na Aula 01, lendo tudo do `.env`. Vocês só precisam editar o arquivo `.env` (que já existe na raiz do projeto) trocando `DB_USER`, `DB_PASSWORD` e `DB_NAME` pelos seus dados reais — `DB_HOST` e `DB_PORT` já vêm certos.
- **Formulários prontos**: `frmClube.html` e `frmAtleta.html` já têm todos os campos, com os mesmos `name` das colunas das tabelas — igual ao que a Aula 01 sempre deixou pronto pra vocês.
- **CRUD de Clube completo**: `main.js`, `preload.js`, `frmClube.js` e a tabela de Clubes em `frmPrincipal.html`/`frmPrincipal.js` já implementam as quatro operações (Create, Read, Update, Delete) de ponta a ponta, seguindo exatamente o padrão das Aulas 2 a 5 (`preload → handle → Promise → conexao.query`, com `send`/`on` para preencher o modal de edição). **Usem esse código como referência** para o de Atleta — a lógica é idêntica, só trocam os nomes de tabela, colunas e canais IPC.

## O que vocês precisam fazer

Implementar o **CRUD completo de Atleta**, reaproveitando ao máximo o padrão já usado em Clube:

1. **Create** — formulário de Atleta já existe (`frmAtleta.html`/`frmAtleta.js`, com um `TODO` no lugar do `INSERT`). Implementem o handler `atleta:criar` no `main.js`, exponham `criarAtleta` no `preload.js`, e troquem o `TODO` do `frmAtleta.js` pela chamada real.
2. **Read** — implementem o handler `atleta:listar`, exponham `listarAtletas` no `preload.js`, e criem `carregarAtletas()` em `frmPrincipal.js` para preencher a tabela de Atletas (que já está no HTML, só com o `tbody` vazio).
3. **Update** — botão **Editar** na tabela de Atletas, handler `atleta:atualizar`, e o par `send`/`on` (`atleta:abrirEdicao` + `atleta:preencher`) para preencher o modal de edição — exatamente como foi feito para Clube.
4. **Delete** — botão **Excluir** na tabela de Atletas, um modal de confirmação (pode copiar o de Clube e trocar os ids/textos), e o handler `atleta:excluir`.

Todos os pontos onde isso é esperado estão marcados com comentários `TODO (aluno):` nos arquivos do projeto.

## Critérios de avaliação

A nota é composta pelas quatro operações do CRUD de **Atleta**, cada uma valendo **2,5 pontos** (total: 10 pontos):

| Operação | Peso |
|---|---|
| Create | 2,5 |
| Read | 2,5 |
| Update | 2,5 |
| Delete | 2,5 |

**Atenção**: se uma das quatro operações ficar **completamente sem nenhuma implementação** (nem tentativa: nenhum handler, nenhuma chamada, nada além do que já vinha pronto), além de não pontuar os 2,5 daquela operação, isso desconta mais **1 ponto do total da prova**. Uma implementação incompleta ou com erros não sofre esse desconto extra — perde só os pontos proporcionais da própria operação. O desconto é especificamente para quem deixa uma parte inteira de fora, sem tentar.

## Dicas

- Sigam o mesmo padrão arquitetural das Aulas 2 a 5: `preload → handle → Promise → conexao.query → MySQL`.
- Não esqueçam do `WHERE` no `UPDATE` e no `DELETE` — sem ele, o comando afeta a tabela inteira.
- Sempre parametrizado com `?`, nunca concatenando valor direto na query.
- Se `window.api.algumaCoisa` continuar `undefined`, o motivo quase sempre é esquecer o `webPreferences.preload` na janela — reparem que `abrirModalAtleta` no `main.js` ainda não tem isso configurado.
- Todas as janelas já abrem com `webContents.openDevTools()` ligado, pra facilitar o debug — deem uma olhada no Console do DevTools sempre que algo não funcionar como esperado.
