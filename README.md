# React. Prime

App de filmes feito com Expo e React Native, consumindo a API do
[The Movie Database (TMDB)](https://www.themoviedb.org/).

A tela inicial lista filmes em três categorias — em cartaz, populares e mais
votados — cada uma num carrossel horizontal com pôster, título e nota.

## Tecnologias

- [Expo](https://docs.expo.dev/) SDK 57
- React Native 0.86
- [React Navigation](https://reactnavigation.org/) (drawer + native stack)
- [styled-components](https://styled-components.com/)
- [axios](https://axios-http.com/)

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
[Expo Go](https://expo.dev/go) pelo QR code.

> O arquivo `.env` é lido quando o servidor inicia. Se você editá-lo com o
> projeto rodando, reinicie o `npx expo start`.

## Estrutura

```
src/
├── components/    Header e SliderItem
├── pages/         Home e Movies
├── routes/        drawer e stack
├── services/      cliente da API da TMDB
└── utils/         funções auxiliares
```

## Licença

[MIT](LICENSE)
