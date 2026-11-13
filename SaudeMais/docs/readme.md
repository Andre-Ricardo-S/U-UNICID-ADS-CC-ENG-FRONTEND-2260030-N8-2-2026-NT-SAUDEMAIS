# Contexto do projeto SaudeMais

## Objetivo
Plataforma que conecta idosos e pessoas com deficiencia (PCDs) de comunidades a voluntarios e transporte comunitario (vans e caronas gratuitas ou de baixo custo) para chegar aos postos de saude.
O site NAO marca consultas, NAO presta atendimento medico e NAO substitui servicos de emergencia.
ODS da ONU relacionados: 3, 10 e 11.

## Stack observada
- HTML5 nas paginas.
- CSS3 compartilhado em `css/styles.css` e `css/acessibilidade.css`.
- JavaScript em `js/acessibilidade.js` (preferencias, tamanho da fonte, contraste) e `js/site.js` (menu mobile, validacao de formularios, localStorage), alem de scripts inline por pagina.
- Sem back-end: formularios salvam no `localStorage`.
- Recursos externos: widget VLibras e mapa embutido do OpenStreetMap (iframe).

## Paginas (menu principal)
- `index.html` (Inicio)
- `sobre-nos.html` (Sobre)
- `como-funciona.html` (Como Funciona)
- `preciso-de-ajuda.html` (Preciso de Ajuda)
- `quero-ajudar.html` (Quero Ajudar)
- `mapa.html` (Mapa)
- `unidades.html` (Postos de Saude)
- `configuracoes.html` (Acessibilidade)
- `seguranca.html` (Seguranca)
- `contato.html` (Contato e Parcerias)

## Paginas extras (links no rodape)
- `perfil.html` (meus pedidos de ajuda)
- `prevencao.html`
- `sus.html`
- `agendar.html` e `emergencia.html`: apenas redirecionam para `preciso-de-ajuda.html` e `seguranca.html#emergencia`.

## Chaves do localStorage
- `saudemais_pedidos`, `saudemais_perfil`, `saudemais_voluntarios`, `saudemais_mensagens`
- `saudeMais_contrast`, `saudeMais_case`, `saudeMais_daltonism`, `saudeMais_fontSize`, `saudeMais_avisos`

## Limites
- Idioma da interface: portugues do Brasil (`pt-BR`).
- Identidade visual: azul (confianca), preto (seriedade) e branco (clareza).
- Nao incluir novas paginas, modulos ou dependencias sem confirmacao.
- Nao registrar nomes, dados pessoais, tokens ou identificadores privados neste plano.
