# 📓 Diário de Bordo — SaúdeMais

Registro datado do que a equipe fez, das decisões tomadas e do uso de IA.

> **Como usar:** cada integrante acrescenta uma linha na tabela quando fizer algo no projeto. As linhas com `[preencher]` são da 1ª entrega (MVP) e precisam ser completadas pela equipe.

---

## 🗓️ Registro das atividades

| Data | Quem | O que foi feito | Decisões e dificuldades |
|------|------|-----------------|-------------------------|
| [preencher] | [preencher] | Definição do problema, do público-alvo e dos ODS (escopo) | [preencher] |
| [preencher] | [preencher] | MVP: 10 páginas em HTML e CSS (1ª entrega) | [preencher] |
| [preencher] | [preencher] | Recursos de acessibilidade: alto contraste, daltonismo, maiúsculas/minúsculas e VLibras | [preencher] |
| [preencher] | [preencher] | Formulário de contato salvando no localStorage | [preencher] |
| [preencher] | [preencher] | Escopo organizado no README do GitHub com ajuda de IA (prompt 2) | [preencher] |
| 16/11/2026 | [preencher] | Comparação do site com o escopo: o site agendava consultas, o que o escopo diz que o projeto não faz | Decidimos mudar o site para seguir o escopo, e não o contrário |
| 16/11/2026 | [preencher] | Novas páginas: Como Funciona, Preciso de Ajuda, Quero Ajudar, Mapa e Segurança; Sobre, Postos e Acessibilidade reescritas | Reaproveitamos os nomes de arquivo antigos sempre que o assunto batia |
| 16/11/2026 | [preencher] | Navegação completa só com teclado em todas as páginas | Contorno de foco amarelo; cabeçalho deixou de ser fixo porque cobria o campo focado |
| 16/11/2026 | [preencher] | Código reescrito no estilo da equipe (CSS e JS dentro de cada página) | A primeira versão vinda da IA usava um CSS único e nomes de classe novos; não aceitamos |
| 16/11/2026 | [preencher] | Telefone e idade aceitando só números, com máscara no telefone (prompt 1) | — |
| 16/11/2026 | [preencher] | Novo repositório e deploy no Railway com HTTPS | Railway publica sozinho a cada commit |
| 16/11/2026 | [preencher] | Validação em JavaScript com mensagens e borda vermelha; rascunho e lista de enviados no localStorage | Atende o item "formulário validado com JavaScript" da rubrica |
| 16/11/2026 | [preencher] | Notícias com filtro, área de doações, vídeo explicativo e transições | Atende o item "funcionalidades da ONG" |
| 16/11/2026 | [preencher] | Correção do W3C: o VLibras passou a ser criado pelo JavaScript | Antes, os atributos `vw` geravam erro no validador |
| 16/11/2026 | [preencher] | Slides da apresentação e documentação desta pasta | — |

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
| **O que corrigimos ou conferimos** | Testamos digitando letras e símbolos: `abc11x9 8765-4321zz99` virou `(11) 98765-4321` e `7a0anos99` virou `709`. Depois, a checagem de telefone incompleto passou para a validação em JavaScript, com mensagem própria. [preencher se a equipe mudou mais alguma coisa] |

### Prompt 2 — Organizar o escopo no README do GitHub

| | |
|---|---|
| **Data** | [preencher] |
| **Prompt** | "Você consegue organizar isso para eu colocar no read-me do github" (enviado junto com o arquivo *ESCOPO_COMPLETO.docx*) |
| **Resposta da IA** | Um `README.md` com sumário com links, selos (badges) de status e dos ODS 3, 10 e 11, e tabelas no lugar dos textos longos (problemas × soluções, tipos de acessibilidade, as 10 páginas, paleta de cores e canais de apoio) |
| **O que aceitamos** | A organização em seções, o sumário, os selos e as tabelas |
| **O que corrigimos ou conferimos** | [preencher: o que a equipe conferiu com o escopo original e o que mudou no texto] |

### Regras que seguimos ao usar IA

- Toda sugestão foi testada no navegador antes de entrar no site.
- Quando o código não seguia o nosso padrão, pedimos para refazer.
- Cada integrante precisa saber explicar o código que apresenta.
