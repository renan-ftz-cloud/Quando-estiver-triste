# Quando estiver triste 💌

Um site romântico com 12 cartinhas para abrir nos dias difíceis.
Ela toca no envelope da capa, ele se abre e aparecem os envelopes. Cada um guarda uma mensagem.
Os envelopes já lidos ficam com o selo dourado.

## Estrutura

```
quando-estiver-triste/
├── index.html      → a página
├── css/style.css   → cores, fontes e animações
├── js/cartas.js    → OS TEXTOS DAS CARTINHAS (edite aqui)
├── js/app.js       → funcionamento (abrir, fechar, navegar)
└── preview.png     → imagem que aparece ao compartilhar o link
```

## Como publicar no GitHub Pages

1. Crie um repositório público chamado `quando-estiver-triste` no GitHub.
2. Envie todos os arquivos desta pasta para ele (botão **Add file → Upload files**, arraste tudo e clique em **Commit changes**).
3. Vá em **Settings → Pages**.
4. Em **Branch**, escolha `main`, pasta `/ (root)`, e clique em **Save**.
5. Depois de 1 a 2 minutos, o site estará em:
   `https://SEU-USUARIO.github.io/quando-estiver-triste/`

## Pré-visualização no WhatsApp

No `index.html`, troque `SEU-USUARIO` pelo seu usuário do GitHub nas linhas `og:url` e `og:image`.
Assim, ao mandar o link, aparece a imagem `preview.png` com o título.

## Como mudar os textos

Abra `js/cartas.js`. Cada cartinha tem:

- `nome`: o que aparece embaixo do envelope
- `texto`: a mensagem dentro da carta

Pode adicionar ou remover cartinhas, o site se ajusta sozinho.

## Testar no computador

Basta abrir o `index.html` no navegador (dois cliques no arquivo).
