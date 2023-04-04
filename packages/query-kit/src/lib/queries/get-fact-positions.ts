/* eslint-disable no-useless-escape */
import { Transaction } from '@facts-kit/faces';

// TODO: CONVERT THIS TO -
export async function getFactPositions(
  tx: string
  // this doesnt do anything yet but should paginate
  // cursor?: string
): Promise<Transaction[]> {
  const res = await fetch(
    `https://gateway.warp.cc/gateway/interactions?contractId=${tx}`
  );
  const data = await res.json();
  return data;
}
