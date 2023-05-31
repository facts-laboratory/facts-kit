import { forEach } from 'ramda';
import { getFeed } from './get-feed';
import { Transaction, TransactionEdge } from '@facts-kit/faces';

describe('getFeed function', () => {
  // Test 1: Network is active
  it('should successfully query the arweave network', async () => {
    // make a fetch request to Arweave network
    const res = await fetch('https://arweave.net/graphql', {
      headers: {
        'content-type': 'application/json',
      },
      body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 30) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n        owner {\\n          address\\n        }\\n        block {\\n          timestamp\\n          height\\n        }\\n        tags {\\n          name\\n          value\\n        }\\n      }\\n    }\\n  }\\n}\\n"}`,
      method: 'POST',
    });

    // check that the response status is 200
    expect(res.status).toEqual(200);

    // check that the response data is in the correct format
    const data = await res.json();
    expect(data).toHaveProperty('data.transactions.edges');
  });

  // Test 2: Pagination works (general)
  it('should return different results for different cursors', async () => {
    const firstBatchResponse = await fetch('https://arweave.net/graphql', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=-1.7',
        'content-type': 'application/json',
      },
      body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 30) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`,
      method: 'POST',
    });
    const firstBatch = await firstBatchResponse.json();
    console.log(
      'typeof ',
      typeof firstBatch,
      'firstBatch',
      firstBatch,
      'firstBatch.data.transactions.edges',
      firstBatch.data.transactions.edges
    );

    // Get the cursor from the last transaction in the first batch
    const cursor =
      firstBatch.data.transactions.edges[
        firstBatch.data.transactions.edges.length - 1
      ].cursor;

    const secondBatchResponse = await fetch('https://arweave.net/graphql', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=-1.7',
        'content-type': 'application/json',
      },
      body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 30, after: \\"${cursor}\\") {\\n    edges {\\n      cursor \\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`,
      method: 'POST',
    });
    const secondBatch = await secondBatchResponse.json();
    console.log('typeof ', typeof secondBatch);

    // Assert that the transaction objects have the correct shape
    const requiredFields = ['cursor', 'node'];
    const nodeFields = ['id'];

    firstBatch.data.transactions.edges.forEach(
      (transaction: TransactionEdge) => {
        requiredFields.forEach((field) => {
          expect(transaction).toHaveProperty(field);
        });
        nodeFields.forEach((field) => {
          console.log('transaction.node', transaction.node);
          expect(transaction.node).toHaveProperty(field);
        });
      }
    );

    secondBatch.data.transactions.edges.forEach(
      (transaction: TransactionEdge) => {
        requiredFields.forEach((field) => {
          expect(transaction).toHaveProperty(field);
        });
        nodeFields.forEach((field) => {
          expect(transaction.node).toHaveProperty(field);
        });
      }
    );

    // Extract transaction IDs
    const firstBatchTxIds = firstBatch.data.transactions.edges.map(
      (edge: TransactionEdge) => edge.node.id
    );
    const secondBatchTxIds = secondBatch.data.transactions.edges.map(
      (edge: TransactionEdge) => edge.node.id
    );

    // Assert that the two batches are different
    expect(firstBatchTxIds).not.toEqual(secondBatchTxIds);

    // Assert that no transaction is included in both batches
    const commonTransactions = firstBatchTxIds.filter((id: string) =>
      secondBatchTxIds.includes(id)
    );
    expect(commonTransactions.length).toBe(0);
  });

  // Test 3: Pagination works for our transactions
  it('should return different results for our transactions when different cursors are used', async () => {
    const firstBatchResponse = await fetch('https://arweave.net/graphql', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=-1.7',
        'content-type': 'application/json',
      },
      body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 30, tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`,
      method: 'POST',
    });
    const firstBatch = await firstBatchResponse.json();

    // Get the cursor from the last transaction in the first batch
    const cursor =
      firstBatch.data.transactions.edges[
        firstBatch.data.transactions.edges.length - 1
      ].cursor;

    const secondBatchResponse = await fetch('https://arweave.net/graphql', {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=-1.7',
        'content-type': 'application/json',
      },
      body: `{"operationName":null,"variables":{},"query":"{\\n  transactions(first: 30, after: \\"${cursor}\\", tags: [{name: \\"Permafacts-Version\\", values: [\\"Alpha-2\\"]}]) {\\n    edges {\\n      cursor \\n      node {\\n        id\\n      }\\n    }\\n  }\\n}\\n"}`,
      method: 'POST',
    });
    const secondBatch = await secondBatchResponse.json();

    // Assert that the transaction objects have the correct shape
    const requiredFields = ['cursor', 'node'];
    const nodeFields = ['id'];

    firstBatch.data.transactions.edges.forEach(
      (transaction: TransactionEdge) => {
        requiredFields.forEach((field) => {
          expect(transaction).toHaveProperty(field);
        });
        nodeFields.forEach((field) => {
          expect(transaction.node).toHaveProperty(field);
        });
      }
    );

    secondBatch.data.transactions.edges.forEach(
      (transaction: TransactionEdge) => {
        requiredFields.forEach((field) => {
          expect(transaction).toHaveProperty(field);
        });
        nodeFields.forEach((field) => {
          expect(transaction.node).toHaveProperty(field);
        });
      }
    );

    // Extract transaction IDs
    const firstBatchTxIds = firstBatch.data.transactions.edges.map(
      (edge: TransactionEdge) => edge.node.id
    );
    const secondBatchTxIds = secondBatch.data.transactions.edges.map(
      (edge: TransactionEdge) => edge.node.id
    );

    // Assert that the two batches are different
    expect(firstBatchTxIds).not.toEqual(secondBatchTxIds);

    // Assert that no transaction is included in both batches
    const commonTransactions = firstBatchTxIds.filter((id: string) =>
      secondBatchTxIds.includes(id)
    );
    expect(commonTransactions.length).toBe(0);
  });

  // Test 4: Different results are returned when cursor is provided
  it('testing our getFeed function', async () => {
    const firstBatch = await getFeed();
    console.log('firstBatch', firstBatch);

    // Get the cursor from the last transaction in the first batch
    const cursor = firstBatch[firstBatch.length - 1].cursor;

    const secondBatch = await getFeed(null, cursor);

    // Assert that the transaction objects have the correct shape
    const requiredFields = ['cursor', 'id', 'owner', 'block', 'tags'];
    const nodeFields = ['address'];

    firstBatch.forEach((transaction) => {
      requiredFields.forEach((field) => {
        expect(transaction).toHaveProperty(field);
      });
      nodeFields.forEach((field) => {
        expect(transaction.owner).toHaveProperty(field);
      });
    });

    secondBatch.forEach((transaction) => {
      requiredFields.forEach((field) => {
        expect(transaction).toHaveProperty(field);
      });
      nodeFields.forEach((field) => {
        expect(transaction.owner).toHaveProperty(field);
      });
    });

    // Extract transaction IDs
    const firstBatchTxIds = firstBatch.map((transaction) => transaction.id);
    const secondBatchTxIds = secondBatch.map((transaction) => transaction.id);

    // Assert that the two batches are different
    expect(firstBatchTxIds).not.toEqual(secondBatchTxIds);

    // Assert that no transaction is included in both batches
    const commonTransactions = firstBatchTxIds.filter((id) =>
      secondBatchTxIds.includes(id)
    );
    expect(commonTransactions.length).toBe(0);
  });
});
