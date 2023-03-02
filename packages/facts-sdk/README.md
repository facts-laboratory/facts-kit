# facts-sdk

This library was generated with [Nx](https://nx.dev).

## Install

`npm i @facts-kit/facts-sdk@latest`

## Use

Import Warp / Arweave in your `index.html`.

```html
<!-- index.html -->

<head>
  <script src="https://unpkg.com/arweave@1.13.1/bundles/web.bundle.min.js"></script>
  <script src="https://unpkg.com/warp-contracts@1.2.53/bundles/web.iife.bundle.min.js"></script>
</head>
```

Import `@facts-kit/facts-sdk` and use.

```js
// some-file.ts

import { assert, attach, buy, sell } from '@facts-kit/facts-sdk';

// attach
const factMarket = await attachFactMarket({
  tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
  wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
});

console.log(factMarket.tx);

// TODO: attach
// TODO: buy
// TODO: sell
```

## Test

Run `nx test node-facts-sdk` to execute the unit tests via [Jest](https://jestjs.io).

## Lint

Run `nx lint node-facts-sdk` to execute the lint via [ESLint](https://eslint.org/).

## More

- https://facts.g8way.io
- https://github.com/permafacts/facts-kit
