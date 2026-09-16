# React. Prime

App de filmes feito com Expo e React Native, consumindo a API do
[The Movie Database (TMDB)](https://www.themoviedb.org/).

A tela inicial lista filmes em três categorias — em cartaz, populares e mais
votados — cada uma num carrossel horizontal com pôster, título e nota.

## Funcionalidades

- Busca de filmes por nome
- Tela de detalhes com sinopse, gêneros e nota em estrelas
- Lista de favoritos na tela "Meus Filmes", salva no próprio aparelho
- Site oficial do filme aberto num modal, sem sair do app

## Tecnologias

- [Expo](https://docs.expo.dev/) SDK 57
- React Native 0.86
- [React Navigation](https://reactnavigation.org/) (drawer + native stack)
- [styled-components](https://styled-components.com/)
- [axios](https://axios-http.com/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) para a lista de favoritos
- [react-native-webview](https://github.com/react-native-webview/react-native-webview) para o modal do site oficial
- [react-native-stars](https://github.com/djchie/react-native-stars) para a nota em estrelas

## Como rodar

**1. Instale as dependências**

```bash
npm install
```

**2. Configure a chave da API**

Crie uma chave gratuita em [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api),
copie o arquivo de exemplo e preencha:

```bash
cp .env.example .env
```

```
EXPO_PUBLIC_TMDB_KEY=sua_chave_aqui
```

**3. Inicie o projeto**

```bash
npx expo start
```

Abra no emulador Android, no simulador iOS ou no
[Expo Go](https://expo.dev/go) pelo QR code. Para rodar no navegador,
use `npm run web`.

> O arquivo `.env` é lido quando o servidor inicia. Se você editá-lo com o
> projeto rodando, reinicie o `npx expo start`.

## Estrutura

```
src/
├── components/    Header, SliderItem, SearchItem, FavoriteItem,
│                  Genres, ModalLink, Loading, Toast e ErrorMessage
├── pages/         Home, Detail, Search e Movies
├── routes/        drawer e stack
├── services/      cliente da API da TMDB
└── utils/         funções auxiliares
```

## Decisões técnicas

**React Navigation no lugar do Expo Router.** O projeto nasceu do template
com Expo Router, mas a navegação aqui é simples: um drawer de duas telas e uma
stack dentro da primeira. No React Navigation isso fica explícito em dois
arquivos, em vez de espalhado pela estrutura de pastas.

**Favoritos no AsyncStorage, sem backend.** A lista é pessoal e não precisa
sincronizar entre aparelhos. Subir um servidor só para guardar ids de filmes
seria peso sem retorno.

**A chave da API vai embutida no bundle — e tudo bem.** A chave v3 do TMDB só
lê o catálogo público, e qualquer app que chama a API direto do aparelho acaba
carregando a chave junto. Ela fica fora do versionamento e cada pessoa usa a
sua; esconder de verdade exigiria um proxy próprio, que não se justifica num
app desse tamanho.

**Um `styles.js` por componente.** Mantém o JSX legível e deixa óbvio onde
mexer no visual de cada tela.

## Atribuição

<img src="assets/images/tmdb-logo.svg" alt="The Movie Database" width="180">

Este projeto usa a API do [TMDB](https://www.themoviedb.org/), mas não é
endossado nem certificado pelo TMDB.

## Licença

[MIT](LICENSE)
