import { setupGlobals } from '../mock/setup-globals';
import { newReadState } from './read-state';

describe('read-state', () => {
  beforeAll(() => {
    setupGlobals();
  });
  test('should calculate fee', async () => {
    const contract = 'gUyxs7pM-D15jBV64WYB-qOzwT8n-AzFmA5gjSA4kTs';
    const state = await newReadState(contract);
    expect((state as any).canEvolve).toBeTruthy();
  });
});
