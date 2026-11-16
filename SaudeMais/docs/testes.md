# 🧪 Evidências de Testes — SaúdeMais

Testes feitos em **16/11/2026** na versão publicada em https://app-4173dfaf98f69675.up.railway.app/index.html e na cópia local.

Os prints ficam na pasta [`evidencias/`](evidencias/).

---

## 1. Validador W3C (HTML)

| Teste | Ferramenta | Resultado |
|-------|------------|-----------|
| As 10 páginas no validador oficial | Nu Html Checker (W3C), versão 26.11.14 | ✅ **0 erros** em todas as páginas |

Páginas testadas: `index.html`, `sobre-nos.html`, `como-funciona.html`, `preciso-de-ajuda.html`, `quero-ajudar.html`, `mapa.html`, `unidades.html`, `configuracoes.html`, `seguranca.html`, `contato.html`.

> Erros que existiam e foram corrigidos: atributos `vw`, `vw-access-button` e `vw-plugin-wrapper` do VLibras (agora criados pelo JavaScript) e `autocomplete="street-address"` no endereço (trocado por `address-line1`).
>
> [preencher: print do validator.w3.org com "No errors" em uma das páginas publicadas]

---

## 2. Navegação só com teclado

| Teste | Resultado |
|-------|-----------|
| Tab passa por todos os links, botões e campos das 10 páginas (computador e celular) | ✅ |
| Todo item focado mostra o contorno amarelo e preto | ✅ |
| 1º Tab mostra "Pular para o conteúdo"; Enter leva ao conteúdo | ✅ |
| Opções de escolha única (ex.: "Ida e volta / Só ida") trocam com as setas | ✅ |
| Shift+Tab: nenhum campo fica escondido atrás do cabeçalho | ✅ |
| Menu do celular abre com Enter e fecha com Esc, voltando o foco ao botão | ✅ |
| Janela de Libras: foco vai para "Fechar"; Esc fecha | ✅ |
| Formulário *Preciso de Ajuda* preenchido e enviado só pelo teclado | ✅ |

Print: [`evidencias/teclado-foco.png`](evidencias/teclado-foco.png)

---

## 3. Formulários (validação em JavaScript e localStorage)

| Caso de teste | Esperado | Resultado |
|---------------|----------|-----------|
| Enviar *Preciso de Ajuda* vazio | Resumo "Falta corrigir 8 campos", borda vermelha e mensagem em cada campo, foco no primeiro erro | ✅ |
| Telefone `(11) 99` | "Telefone incompleto. Digite com DDD…" | ✅ |
| Data da consulta 01/01/2020 | "Escolha hoje ou uma data futura." | ✅ |
| Digitar letras no telefone e na idade | Letras não aparecem | ✅ |
| Preencher o nome e recarregar a página | Aviso "Recuperamos o que você tinha preenchido" com o nome de volta | ✅ |
| Enviar o formulário certo | Caixa verde com protocolo e pedido na lista "Pedidos enviados neste aparelho" | ✅ |
| Recarregar depois de enviar | Pedido continua na lista (localStorage); rascunho apagado | ✅ |
| Enviar *Quero Ajudar* vazio | "Falta corrigir 5 campos" | ✅ |
| Enviar *Contato* vazio | "Falta corrigir 4 campos" | ✅ |
| E-mail sem @ em *Quero Ajudar* | "E-mail inválido. Exemplo: nome@email.com." | ✅ |

Prints: [`evidencias/form-erros.png`](evidencias/form-erros.png) e [`evidencias/form-rascunho.png`](evidencias/form-rascunho.png)

---

## 4. Outras interações (DOM e eventos)

| Teste | Resultado |
|-------|-----------|
| Filtro de notícias (Saúde mostra "1 notícia") | ✅ |
| "Ler mais" mostra e esconde o resto da notícia | ✅ |
| Botão "Copiar chave PIX" mostra "Chave copiada!" | ✅ |
| Filtro de postos por acessibilidade (Libras mostra 2 postos) | ✅ |
| Alto contraste, A+ e A− valem em todas as páginas e ficam salvos | ✅ |
| Vídeo da página *Como Funciona* toca (25 s) | ✅ |
| Console do navegador sem erros de JavaScript | ✅ (fora o VLibras quando não há internet) |

Prints: [`evidencias/noticias.png`](evidencias/noticias.png) e [`evidencias/doacoes.png`](evidencias/doacoes.png)

---

## 5. Layout responsivo

| Tela | Resultado |
|------|-----------|
| Computador (1280 e 1440 px) | ✅ Menu em uma faixa, cartões em grade |
| Celular (390 px) | ✅ Menu vira botão "☰ Menu", conteúdo em uma coluna |

Prints: [`evidencias/home-desktop.png`](evidencias/home-desktop.png) e [`evidencias/home-celular.png`](evidencias/home-celular.png)

---

## 6. Site publicado

| Teste | Resultado |
|-------|-----------|
| Site abre com HTTPS | ✅ |
| As 10 páginas abrem pela URL publicada | ✅ |
| Teste no celular de verdade | ✅ |
| Lighthouse (F12 › Lighthouse › Acessibilidade) | ✅ |
