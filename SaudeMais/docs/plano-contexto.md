# 🧭 Plano de Contexto para Uso de IA — SaúdeMais

Este plano explica **que informação a equipe passa para a IA** antes de pedir código, e **quais regras ela deve seguir**. A ideia é que a IA trabalhe dentro do escopo e do estilo do projeto, e não invente coisas.

---

## 1. O que a IA precisa saber do projeto

| Assunto | Onde está | Resumo |
|---------|-----------|--------|
| Escopo | [`../../README.md`](../../README.md) e [`escopo.md`](escopo.md) | Site que conecta idosos e PCDs a voluntários e transporte comunitário até os postos de saúde. **Não** marca consultas nem presta atendimento médico. |
| Contexto técnico | [`readme.md`](readme.md) | Stack, lista das 10 páginas e limites do projeto |
| Estilo de código | páginas existentes, como [`../index.html`](../index.html) | CSS em bloco `<style>` e JavaScript em `<script>` dentro de cada página; cores azul, branco e cinza; textos em português do Brasil |

---

## 2. Regras usadas (Cursor)

As regras ficam em [`../cursor/rules/`](../cursor/rules/). Uma cópia da regra geral fica em `.github/instructions/` para o VS Code.

| Arquivo | Quando vale | Para quê |
|---------|-------------|----------|
| `projeto-saudemais.mdc` | Sempre | Manter o código alinhado ao escopo; não inventar páginas, módulos ou dependências sem perguntar |
| `html-semantico.mdc` | Arquivos `.html` | HTML5 semântico e JavaScript dentro das páginas |
| `css-estilo.mdc` | Arquivos `.css` | Estilos legíveis, responsivos e coerentes com o visual atual |
| `acessibilidade.mdc` | `.html` e `.css` | Teclado, foco visível, contraste, `alt`, `lang="pt-BR"`; não remover recursos de acessibilidade |
| `commits.mdc` | Só quando pedido | Commits pequenos e ligados ao pedido |
| `cursor-rules.mdc` | Sempre | Como escrever e manter as próprias regras |
| `self-improvement.mdc` | Sempre | Revisar as regras quando um padrão se repete |

O arquivo `mcp.json` configura o acesso do Cursor ao GitHub e ao Railway. A chave do GitHub vem de uma variável de ambiente (`GITHUB_PAT`) e **não fica salva no repositório**.

---

## 3. Como pedimos ajuda para a IA

1. **Dar o contexto:** dizer qual página ou arquivo, e mandar um print quando ajudar (exemplo: o print do formulário no prompt do telefone e da idade).
2. **Pedir uma coisa por vez:** um pedido pequeno é mais fácil de conferir.
3. **Lembrar o estilo:** CSS e JavaScript dentro da página, nomes de classe que já existem, textos em português.
4. **Testar no navegador** antes de aceitar: teclado, celular, formulário e validador W3C.
5. **Registrar no [diário de bordo](diario-de-bordo.md):** o prompt, o que aceitamos e o que corrigimos.

---

## 4. Limites

- A IA não decide o escopo: quem decide é a equipe, com base no README.
- Nenhum dado pessoal real, senha ou chave vai nos prompts nem no repositório.
- Código que ninguém da equipe sabe explicar não entra no site.
- Quando a IA sugere algo fora do nosso padrão, pedimos para refazer. Exemplo: recusamos uma versão com CSS único e nomes de classe novos.
