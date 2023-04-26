# facts-sdk

Free the Truth.

## Install

`npm i @facts-kit/facts-sdk@latest`

## Use

import `@facts-kit/facts-sdk` and use.

```js
// some-file.<ts | js>

import { assert, attach, getAssets, hasFactMarket, getPrice, buy, sell } from '@facts-kit/facts-sdk';

// hasFactMarket
// returns { tx: undefined, link: undefined } if no fact market exists.
const factMarket = await hasFactMarket('cbOtLP1GPOgFQgQxQVXiM-fV2rAC1H-QW4b9dJkRVgs'); // {tx: "<tx>", "link": "<link>"}

// getAssets
const factsets = getAssets();

// attach
const factMarket = await attach({
  tx: '07aXBLlXbo5onnWhBUOv20hpD3f6iSDfzcLo6uOwDtw',
  position: 'support',
  // This tells the SDK to use the wallet that's connected.
  // It's the callers responsibility to make sure the wallet
  // is connected.
  // useConnectedWallet: true,
});
console.log(factMarket.tx);

// assert
const factMarket = await assert({
  use: 'arweaveWallet',
  data: { test: 'data' }, // You define the shape of this -- it will be stringified
  tags: {
    type: 'fact-post',
    title: 'Test title',
    description: 'test description',
    topics: ['topic-1', 'topic-2'],
    renderWith: '<tx> or <arns>',
    cover: '<tx>', // The <tx> is a transaction ID of a photo you have uploaded
  },
  position: 'support',
  // This tells the SDK to use the wallet that's connected.
  // It's the callers responsibility to make sure the wallet
  // is connected.
  // useConnectedWallet: true,
});

console.log(factMarket.tx);

// buy
const position = await buy({
  contract: 'VDcJqs6_mfUTQuoTYvxTtzRDLFenHkaQUOVkmIJF4tA',
  positionType: 'support',
  qty: 1,
});
console.log(position.originalTxId);

// sell
const position = await sell({
  contract: 'VDcJqs6_mfUTQuoTYvxTtzRDLFenHkaQUOVkmIJF4tA',
  positionType: 'support',
  qty: 1,
});
console.log(position.originalTxId);
```

## Test

Run `nx test node-facts-sdk`

## Lint

Run `nx lint node-facts-sdk`

## More

- https://facts.g8way.io
- https://github.com/permafacts/facts-kit
