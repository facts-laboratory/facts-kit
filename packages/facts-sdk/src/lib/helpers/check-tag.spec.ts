import { checkTag } from './check-tag';

describe.skip('check tag', () => {
  it('should work', async () => {
    const tag = checkTag('Type', { name: 'type', value: 'test' });
    expect(tag).toEqual({ name: 'type', value: 'test' });
  });

  it('should throw', async () => {
    expect(() => {
      checkTag('Type', undefined);
    }).toThrow('Missing tag Type from ANS-110.');
  });
});
