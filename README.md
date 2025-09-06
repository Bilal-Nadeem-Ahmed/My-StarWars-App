# starwars

A basic web application built with vue 3 and vuetify. It uses the starwars api found here : https://swapi.info/people. It displays a list of characters, allows users to view more details and submit a review. Currently when submitting a review , it goes to a nonexistant endpoint so returns an error. There is also a branch named 'my-api' which can be used with the backend found here: https://github.com/Bilal-Nadeem-Ahmed/StarWarsApi. 

This has a basic endpoint called characters that returns the same data. It is just a small application that demonstrates a simple controller and in memory caching with a few simple tests. if i had time id organise the data coming back and add more to the front end to that a user could view more information about things like vehicles, species and so on. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
