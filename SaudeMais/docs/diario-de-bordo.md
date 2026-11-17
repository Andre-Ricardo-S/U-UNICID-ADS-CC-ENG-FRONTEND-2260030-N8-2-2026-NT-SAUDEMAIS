# 📓 Diário de Bordo — SaúdeMais

Registro datado do que a equipe fez, das decisões tomadas e do uso de IA.

> **Como usar:** acrescente uma linha na tabela a cada etapa do projeto. As datas até 16/11 vêm do histórico de commits do repositório no GitHub.

---

## 🗓️ Registro das atividades

| Data | O que foi feito | Decisões e dificuldades |
|------|-----------------|-------------------------|
| 06/10/2026 | Criação do repositório, primeira versão do código do site e do README com o escopo (problema, público-alvo e ODS) | [preencher] |
| 20/10/2026 | Criação das páginas e da navegação do SaúdeMais | [preencher] |
| 27/10/2026 | MVP (1ª entrega): páginas Configurações, Emergência, Perfil, Prevenção, SUS e Unidades criadas; ajustes no CSS, Início, Sobre, Agendar e Contato | [preencher] |
| 27/10/2026 | Primeiras regras do Cursor para uso de IA (acessibilidade, CSS, HTML semântico e visão do projeto) | Regras para a IA seguir o escopo e o estilo do projeto |
| 03/11/2026 | Mais regras do Cursor, espelho das regras para o VS Code (`.github/instructions`), contexto técnico (`docs/readme.md`) e `acessibilidade.js` | [preencher] |
| 10/11/2026 | Aprovação do **pull request #1** (branch `primeira_Branch`) | — |
| 10/11/2026 | Recursos de acessibilidade em todas as páginas: alto contraste, daltonismo, maiúsculas/minúsculas e VLibras (`acessibilidade.css` e `acessibilidade.js`) | [preencher] |
| 10/11/2026 | Formulário de contato salvando no localStorage | [preencher] |
| 13/11/2026 | Atualizações no README | [preencher] |
| 13/11/2026 | Escopo organizado no README do GitHub com ajuda de IA (prompt 2) | [preencher] |
| 16/11/2026 | Comparação do site com o escopo: o site agendava consultas, o que o escopo diz que o projeto não faz | Decidimos mudar o site para seguir o escopo, e não o contrário |
| 16/11/2026 | Novas páginas: Como Funciona, Preciso de Ajuda, Quero Ajudar, Mapa e Segurança; Sobre, Postos e Acessibilidade reescritas | Reaproveitamos os nomes de arquivo antigos sempre que o assunto batia |
| 16/11/2026 | Navegação completa só com teclado em todas as páginas | Contorno de foco amarelo; cabeçalho deixou de ser fixo porque cobria o campo focado |
| 16/11/2026 | Código reescrito no estilo da equipe (CSS e JS dentro de cada página) | A primeira versão vinda da IA usava um CSS único e nomes de classe novos; não aceitamos |
| 16/11/2026 | Telefone e idade aceitando só números, com máscara no telefone (prompt 1) | — |
| 16/11/2026 | Validação em JavaScript com mensagens e borda vermelha; rascunho e lista de enviados no localStorage | Atende o item "formulário validado com JavaScript" da rubrica |
| 16/11/2026 | Notícias com filtro, área de doações, vídeo explicativo e transições | Atende o item "funcionalidades da ONG" |
| 16/11/2026 | Correção do W3C: o VLibras passou a ser criado pelo JavaScript | Antes, os atributos `vw` geravam erro no validador |
| 16/11/2026 | Versão final do site enviada ao repositório oficial | A pasta antiga foi substituída pela nova |
| 16/11/2026 | Deploy no Railway com HTTPS | Railway publica sozinho a cada commit; endereço final `saudemais.up.railway.app` |
| 16/11/2026 | Documentação da pasta `docs`: diário, escopo, orçamento, testes, melhorias do MVP e plano de contexto | Documentação fica dentro de `SaudeMais/` para também abrir pelo site |
| 16/11/2026 | Atualização no README | [preencher] |
| 17/11/2026 | Lighthouse no celular e no computador: Acessibilidade 100 | Links do rodapé ganharam área de toque maior (a nota era 96) |
| 17/11/2026 | Ajustes nos slides da apresentação | [preencher] |

---

## 🤖 Uso de IA

**Ferramentas usadas:** Claude (Anthropic). O projeto também tem regras para o Cursor na pasta `cursor/rules/`, que descrevem o estilo de código e os limites do projeto.

### Prompt 1 — Telefone e idade só com números

| | |
|---|---|
| **Data** | 16/11/2026 |
| **Prompt** | "Nessa parte de idade e telefone você consegue me ajudar a colocar para só poder digitar números nessa parte" (enviado junto com um print do formulário *Preciso de Ajuda*) |
| **Resposta da IA** | Um script em cada formulário que apaga tudo o que não é número (`replace(/\D/g, '')`) e monta a máscara do telefone com a função `formatarTelefone()`, além de `inputmode="numeric"` e `maxlength` nos campos |
| **O que aceitamos** | A máscara `(11) 98765-4321`, que funciona com celular e com fixo; o teclado numérico no celular; o limite de 3 dígitos na idade |
| **O que corrigimos ou conferimos** | Testamos digitando letras e símbolos: `abc11x9 8765-4321zz99` virou `(11) 98765-4321` e `7a0anos99` virou `709`. Depois, a checagem de telefone incompleto passou para a validação em JavaScript, com mensagem própria. |

### Prompt 2 — Organizar o escopo no README do GitHub

| | |
|---|---|
| **Data** | 13/11/2026 [conferir] |
| **Prompt** | "Você consegue organizar isso para eu colocar no read-me do github" (enviado junto com o arquivo *ESCOPO_COMPLETO.docx*) |
| **Resposta da IA** | Um `README.md` com sumário com links, selos (badges) de status e dos ODS 3, 10 e 11, e tabelas no lugar dos textos longos (problemas × soluções, tipos de acessibilidade, as 10 páginas, paleta de cores e canais de apoio) |
| **O que aceitamos** | A organização em seções, o sumário, os selos e as tabelas |
| **O que corrigimos ou conferimos** | Conferimos o texto com o escopo original (*ESCOPO_COMPLETO.docx*). [preencher: o que a equipe mudou no texto] |

### Regras que seguimos ao usar IA

- Toda sugestão foi testada no navegador antes de entrar no site.
- Quando o código não seguia o nosso padrão, pedimos para refazer.
- Cada integrante precisa saber explicar o código que apresenta.
