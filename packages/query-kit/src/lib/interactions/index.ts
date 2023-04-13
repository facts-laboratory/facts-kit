import Account, { ArAccount } from 'arweave-account';
const account = new Account({
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 3600000, // 3600000ms => 1 hour cache duration
});

export function getInteractionsUrl(tx: string, page?: number): string {
  return `https://gateway.warp.cc/gateway/interactions?contractId=${tx}&page=${
    page || 1
  }`;
}

export const sampleInteractionsResponse = {
  paging: { total: '2', limit: 5000, items: 2, page: 1, pages: 1 },
  interactions: [
    {
      status: 'confirmed',
      confirming_peers: 'https://node2.bundlr.network',
      confirmations: null,
      interaction: {
        id: 'AB4PS6cqBaxOu_BF131XK62h10hylVXiQfStavfCMRE',
        fee: { winston: '36937276' },
        vrf: null,
        tags: [
          { name: 'App-Name', value: 'SmartWeaveAction' },
          { name: 'App-Version', value: '0.3.0' },
          {
            name: 'Contract',
            value: 'R8xQCE-Y9ISjrrIE0Mo4l1lcI2TpixfAcnrixU89_nE',
          },
          {
            name: 'Input',
            value:
              '{"function":"buy","positionType":"oppose","amountToMint":500,"qtyBar":125000,"fee":6250,"txId":"scOvWuFnOUm_InSa2fwVLbqB8wVuVjo9G78MDwudACU"}',
          },
          { name: 'SDK', value: 'Warp' },
          { name: 'Permafacts-Type', value: 'Position' },
          {
            name: 'Permafacts-Position-AssertionId',
            value: 'R8xQCE-Y9ISjrrIE0Mo4l1lcI2TpixfAcnrixU89_nE',
          },
          { name: 'Permafacts-Position-Type', value: 'oppose' },
          { name: 'Permafacts-Position-Amount', value: '500' },
          { name: 'Signing-Client', value: 'ArConnect' },
          { name: 'Signing-Client-Version', value: '0.5.2' },
        ],
        block: {
          id: 'Q1_jEJTxrRXdUfpZ6BtfU_q4naH6IWEkb03I65RNcSO2TqxNRyb-K3Zu2FGvjOqe',
          height: 1120329,
          timestamp: 1676570779,
        },
        owner: { address: '9EIo8Qm0gPXIqMpzx8nrZ0YYDGaAnMWXhrPdvXIO0Fg' },
        source: 'redstone-sequencer',
        sortKey:
          '000001120329,1676571215715,561685c8a9700b05a9eb9da0993f48aa17e797ba801aa53955d7a6e68abbcb43',
        testnet: null,
        quantity: { winston: '0' },
        recipient: '',
        lastSortKey:
          '000001120286,1676565530727,5eeedb4cab3cdeeb85a8783857492e88375b23f5f02172f54bb413a9f979fafe',
        bundlerTxId: '0eYRNy_h3BeagdDzhOm522GzhmM8eOOczD8zklwwrBg',
      },
    },
    {
      status: 'confirmed',
      confirming_peers: 'https://node2.bundlr.network',
      confirmations: null,
      interaction: {
        id: '0UckIEa6pVvxFqAXk8IaNfakvhD4WedmVP3U6cuL9Dc',
        fee: { winston: '36937276' },
        vrf: null,
        tags: [
          { name: 'App-Name', value: 'SmartWeaveAction' },
          { name: 'App-Version', value: '0.3.0' },
          {
            name: 'Contract',
            value: 'R8xQCE-Y9ISjrrIE0Mo4l1lcI2TpixfAcnrixU89_nE',
          },
          {
            name: 'Input',
            value:
              '{"function":"buy","positionType":"support","amountToMint":0.1,"qtyBar":1,"fee":1,"txId":"9H064pYoRFnNyAUdK-TTTmZ7LvxDeuhz-dlJ4AYgXbQ"}',
          },
          { name: 'SDK', value: 'Warp' },
          { name: 'Permafacts-Type', value: 'Position' },
          {
            name: 'Permafacts-Position-AssertionId',
            value: 'R8xQCE-Y9ISjrrIE0Mo4l1lcI2TpixfAcnrixU89_nE',
          },
          { name: 'Permafacts-Position-Type', value: 'support' },
          { name: 'Permafacts-Position-Amount', value: '0.1' },
          { name: 'Signing-Client', value: 'ArConnect' },
          { name: 'Signing-Client-Version', value: '0.5.2' },
        ],
        block: {
          id: 'Ih41efri8bl712xaOEUJ1UcuQ3c-s7uZoKpoNFoZpKBmit8w50u2y2_c_d1YkoNs',
          height: 1120286,
          timestamp: 1676565315,
        },
        owner: { address: '9EIo8Qm0gPXIqMpzx8nrZ0YYDGaAnMWXhrPdvXIO0Fg' },
        source: 'redstone-sequencer',
        sortKey:
          '000001120286,1676565530727,5eeedb4cab3cdeeb85a8783857492e88375b23f5f02172f54bb413a9f979fafe',
        testnet: null,
        quantity: { winston: '0' },
        recipient: '',
        lastSortKey: null,
        bundlerTxId: 'FoXnujdLunQTPe2PJeNv_enFssJB9Oyrs-7vvCAjSFc',
      },
    },
  ],
};

export interface Paging {
  total: string;
  limit: number;
  items: number;
  page: number;
  pages: number;
}

export interface Fee {
  winston: string;
}

export interface Tag {
  name: string;
  value: string;
}

export interface Block {
  id: string;
  height: number;
  timestamp: number;
}

export interface Owner {
  address: string;
}

export interface Quantity {
  winston: string;
}

export interface Interaction {
  id: string;
  fee: Fee;
  vrf?: any;
  tags: Tag[];
  block: Block;
  owner: Owner;
  source: string;
  sortKey: string;
  testnet?: any;
  quantity: Quantity;
  recipient: string;
  lastSortKey: string;
  bundlerTxId: string;
}

export interface InteractionWithAccount extends Interaction {
  account: ArAccount;
}

export interface Interactions {
  status: string;
  confirming_peers: string;
  confirmations?: any;
  interaction: Interaction;
}

export interface InteracionsOutput {
  paging: Paging;
  interactions: Interactions[];
}

export async function fetchInteractions(
  tx: string,
  page?: number
): Promise<InteractionWithAccount[]> {
  const interactionsOutput = (await fetch(
    `${getInteractionsUrl(tx, page)}`
  ).then((res) => res.json())) as InteracionsOutput;
  const output: InteractionWithAccount[] = await Promise.all(
    interactionsOutput.interactions.map(async (i) => {
      return {
        ...i.interaction,
        account: await account.get(i.interaction.owner.address),
      };
    })
  );
  return output;
}
