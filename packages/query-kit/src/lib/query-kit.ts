import { Transaction } from '@facts-kit/faces';
import playerFacts from './functions/get-player-facts';
import feedAssertions from './functions/get-feed-assertions';
import playerPositions from './functions/get-player-positions';
import byId from './functions/get-by-id';
import factPositions from './functions/get-fact-positions';
import getPlayerPositions from './functions/get-player-positions';
import rebuttals from './functions/get-fact-rebuttals';

export type Method =
  | 'feed'
  | 'playerPositions'
  | 'byId'
  | 'getPlayerPositions'
  | 'playerFacts'
  | 'factPositions'
  | 'rebuttals'
  | 'rebuttalById';

export async function query(
  method: Method,
  tx?: string,
  category?: string
): Promise<Transaction[]> {
  switch (method) {
    case 'feed':
      return await feedAssertions(category);
    case 'rebuttals':
      if (!tx) {
        throw new Error(
          'You must supply your user address to fetch your assertions.'
        );
      }
      return await rebuttals(tx);
    case 'playerFacts':
      if (!tx) {
        throw new Error(
          'You must supply your user address to fetch your assertions.'
        );
      }
      return await playerFacts(tx);
    case 'byId':
      if (!tx) {
        throw new Error('You must supply a transaction id.');
      }
      return await byId(tx);
    case 'playerPositions':
      if (!tx) {
        throw new Error(
          'You must supply your user tx to fetch your assertions.'
        );
      }
      return await playerPositions(tx);
    case 'factPositions':
      if (!tx) {
        throw new Error(
          'You must supply a assertion id to fetch your positions.'
        );
      }
      return await factPositions(tx);
    case 'getPlayerPositions':
      if (!tx) {
        throw new Error(
          'You must supply your user tx to fetch your assertions.'
        );
      }
      return await getPlayerPositions(tx);
    default:
      throw new Error(`The method ${method} has not been implemented.`);
  }
}
