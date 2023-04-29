
import { getFeed } from './get-feed';
import fetchMock from 'fetch-mock';

describe.skip('getFeed', () => {
    afterEach(() => {
      fetchMock.restore();
    });
  
    it('should return transactions without a cursor', async () => {
      const mockedResponse = {
        data: {
            transactions: {
              edges: [
                {
                  cursor: "cursor1",
                  node: {
                    id: "id1",
                    owner: { address: "address1" },
                    block: { timestamp: "timestamp1", height: 100 },
                    tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                  },
                },
                {
                  cursor: "cursor2",
                  node: {
                    id: "id2",
                    owner: { address: "address2" },
                    block: { timestamp: "timestamp2", height: 200 },
                    tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                  },
                },
              ],
            },
          },
      };
  
      fetchMock.post('https://arweave.net/graphql', mockedResponse);
      const transactions = await getFeed();
  
      expect(transactions).toHaveLength(mockedResponse.data.transactions.edges.length);
    });
  
    it('should return different transactions with a cursor', async () => {
   
        const mockedResponse1 = {
          data: {
            transactions: {
              edges: [
                {
                  cursor: "cursor1",
                  node: {
                    id: "id1",
                    owner: { address: "address1" },
                    block: { timestamp: "timestamp1", height: 100 },
                    tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                  },
                },
                {
                  cursor: "cursor2",
                  node: {
                    id: "id2",
                    owner: { address: "address2" },
                    block: { timestamp: "timestamp2", height: 200 },
                    tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                  },
                },
              ],
            },
          },
        };
  
        const mockedResponse2 = {
            data: {
              transactions: {
                edges: [
                  {
                    cursor: "cursor3",
                    node: {
                      id: "id3",
                      owner: { address: "address3" },
                      block: { timestamp: "timestamp3", height: 300 },
                      tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                    },
                  },
                  {
                    cursor: "cursor4",
                    node: {
                      id: "id4",
                      owner: { address: "address4" },
                      block: { timestamp: "timestamp4", height: 400 },
                      tags: [{ name: "Permafacts-Version", value: "Alpha-2" }],
                    },
                  },
                ],
              },
            },
          };
  
      fetchMock.post('https://arweave.net/graphql', mockedResponse1);
      const transactions1 = await getFeed();
  
      fetchMock.restore();

      fetchMock.post('https://arweave.net/graphql', mockedResponse2);
      const mockCursor = 'cursor4';
      const transactions2 = await getFeed(undefined, mockCursor);
      console.log('transaction1', transactions1, 'transactions2', transactions2);
    });
}); 