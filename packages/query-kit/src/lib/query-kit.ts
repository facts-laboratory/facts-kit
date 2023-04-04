import { Transaction } from '@facts-kit/faces';
import { getPlayerFacts } from './functions/get-player-facts';
import { getFeed } from './functions/get-feed';
import { getPlayerPositions } from './functions/get-player-positions';
import { getById } from './functions/get-by-id';
import { getFactPositions } from './functions/get-fact-positions';
import { getFactRebuttals } from './functions/get-fact-rebuttals';
// TODO
// getPlayerStamps (player page), getPlayerRebuttals (player page)

export type Method =
  | 'feed'
  | 'player_positions'
  | 'fact_by_id'
  | 'player_facts'
  | 'fact_positions'
  | 'rebuttals'
  | 'rebuttal_by_id';

export async function query(
  method: Method,
  tx?: string,
  category?: string
): Promise<Transaction[]> {
  switch (method) {
    case 'feed':
      return await getFeed(category);
    case 'rebuttals':
      if (!tx) {
        throw new Error(
          'You must supply your user address to fetch your assertions.'
        );
      }
      return await getFactRebuttals(tx);
    case 'player_facts':
      if (!tx) {
        throw new Error(
          'You must supply your user address to fetch your assertions.'
        );
      }
      return await getPlayerFacts(tx);
    case 'fact_by_id':
      if (!tx) {
        throw new Error('You must supply a transaction id.');
      }
      return await getById(tx);
    case 'player_positions':
      if (!tx) {
        throw new Error(
          'You must supply your user tx to fetch your assertions.'
        );
      }
      return await getPlayerPositions(tx);
    case 'fact_positions':
      if (!tx) {
        throw new Error(
          'You must supply a assertion id to fetch your positions.'
        );
      }
      return await getFactPositions(tx);

    default:
      throw new Error(`The method ${method} has not been implemented.`);
  }
}
