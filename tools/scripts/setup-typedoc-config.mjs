const project = process.argv[2];

const root = '../../';
import { readFile, writeFile } from 'fs/promises';
const json = JSON.parse(
  await readFile(
    new URL(`${root}packages/${project}/typedoc.json`, import.meta.url)
  )
);
await writeFile(
  `packages/${project}/typedoc.json`,
  JSON.stringify({
    ...json,
    gitRevision: 'main',
  })
);

console.log(`Typedoc branch update to main.`);
