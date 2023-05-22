import { suite } from 'uvu';
import * as assert from 'uvu/assert';
const test = suite('el-cap-kit');

test.before(async () => {});

test('should not allow claiming without txId', () => {
  assert.is(1, 1);
});

test.after(async () => {});

test.run();
