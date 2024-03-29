# facts-kit

The JS kit for the Facts Protocol. (TODO: link to wiki)

- [Contributing](./CONTRIBUTING.md)

## Setup

- `npm i`

## Playbooks

- build
- test
- lint
- deploy
- docs
- version

## Packages

- [facts-sdk](./packages/facts-sdk/README.md)
- [contract-kit](./packages/contract-kit/README.md) (wip)

## Versioning

- https://github.com/jscutlery/semver

```
npm run nx -- run workspace:version --releaseAs=major
npm run nx -- run workspace:version --releaseAs=minor
npm run nx -- run workspace:version --releaseAs=patch
npm run nx -- run workspace:version --releaseAs=prerelease --preid=alpha
npm run nx -- run workspace:version --releaseAs=prerelease --preid=beta
```

## Resources

- https://facts.g8way.io
- https://js_facts.g8way.io
- https://facts-protocol.g8way.io
- https://cookbook.g8way.io

## NX help

Visit the [Nx Documentation](https://nx.dev) to learn more.
