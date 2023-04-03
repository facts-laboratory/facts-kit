import { calculatePriceBits, calculateFeeBits } from './calculate-price';

describe.skip('calculate price', () => {
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 0, 1);
    expect(price).toEqual(1);
  });
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 1, 2);
    expect(price).toEqual(2);
  });
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 2, 3);
    expect(price).toEqual(3);
  });
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 3, 4);
    expect(price).toEqual(4);
  });
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 4, 5);

    expect(price).toEqual(5);
  });
  it('should calculate price', async () => {
    const price = calculatePriceBits(1, 1, 5, 6);
    expect(price).toEqual(6);
  });
  it('should calculate fee', async () => {
    const price = 100;
    const fee = calculateFeeBits(price);
    expect(fee).toEqual(5);
  });
});
