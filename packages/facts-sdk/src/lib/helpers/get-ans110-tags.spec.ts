import { getAns110Tags } from './get-ans110-tags';

describe.skip('get ans110 tags', () => {
  it('should throw', () => {
    expect(() => {
      getAns110Tags([{ name: 'test', value: 'test' }]);
    }).toThrow('Missing tag Title from ANS-110.');
  });
  it('should throw', () => {
    expect(() => {
      getAns110Tags([{ name: 'Title', value: 'test' }]);
    }).toThrow('Missing tag Type from ANS-110.');
  });
  it('should throw', () => {
    expect(() => {
      getAns110Tags([
        { name: 'Title', value: 'test' },
        { name: 'Type', value: 'test' },
      ]);
    }).toThrow('Missing tag Description from ANS-110.');
  });
  it.skip('should work', () => {
    const tx = getAns110Tags([
      {
        name: 'Permafacts-Type',
        value: 'Assertion-Alpha-v2-0.0.7',
      },
      {
        name: 'App-Name',
        value: 'SmartWeaveContract',
      },
      {
        name: 'Contract-Src',
        value: 'xLaL1bE6hYETzBdKZYzlyKJUhn7I5J-Oye609sW3qTU',
      },
      {
        name: 'App-Version',
        value: '0.3.0',
      },
      {
        name: 'Implements',
        value: 'ANS-110',
      },
      {
        name: 'Type',
        value: 'fact-post',
      },
      {
        name: 'Title',
        value: 'Compare tx value',
      },
      {
        name: 'Permafacts-Version',
        value: 'TODO',
      },
      {
        name: 'Render-With',
        value: 'facts-renderer',
      },
      {
        name: 'Content-Type',
        value: 'text/plain',
      },
      {
        name: 'Init-State',
        value:
          '{"creator":"9x24zjvs9DA5zAz2DmqBWAg6XcxrrE-8w3EkpwRm4e4","pf":0,"author":0,"balances":{},"oppositionBalances":{},"price":1,"pair":"VFr3Bk-uM-motpNNkkFg4lNW1BMmSfzqsVO551Ho4hA","canEvolve":true,"evolve":null,"name":"Compare tx value"}',
      },
      {
        name: 'Description',
        value: 'test',
      },
      {
        name: 'Signing-Client',
        value: 'ArConnect',
      },
      {
        name: 'Signing-Client-Version',
        value: '0.5.2',
      },
    ]);
  });
});
