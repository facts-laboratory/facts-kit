# facts-sdk

Currently `attach` and `assert` are the only tested functions.

## Install

`npm i @facts-kit/facts-sdk@latest`

## Use

import `@facts-kit/facts-sdk` and use.

```js
// some-file.ts

import { assert, attach } from '@facts-kit/facts-sdk';

// attach
const factMarket = await attachFactMarket({
  tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
  wallet: '9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4',
});

console.log(factMarket.tx);

// Deploy
const factMarket = await deployAtomicFactMarket({
  use: 'arweaveWallet',
  data: { test: 'data' }, // You define the shape of this -- i twill be stringified
  tags: {
    type: 'fact-post',
    title: 'Test title',
    description: 'test description',
    topics: ['topic-1', 'topic-2'],
  },
  position: 'support',
});

console.log(factMarket.tx);
```

## Test

Run `nx test node-facts-sdk` to execute the unit tests via [Jest](https://jestjs.io).

## Lint

Run `nx lint node-facts-sdk` to execute the lint via [ESLint](https://eslint.org/).

## More

- https://facts.g8way.io
- https://github.com/permafacts/facts-kit
