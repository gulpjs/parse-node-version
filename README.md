<p align="center">
  <a href="https://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# parse-node-version

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][ci-image]][ci-url] [![Coveralls Status][coveralls-image]][coveralls-url]

Turn node's process.version into something useful.

## Usage

```js
var nodeVersion = require('parse-node-version')(process.version);

console.log(
  nodeVersion.major,
  nodeVersion.minor,
  nodeVersion.patch,
  nodeVersion.pre,
  nodeVersion.build
);
```

## API

### parseVersion(nodeVersionString)

Takes a node version string (usually `process.version`) and returns an object with the `major`/`minor`/`patch` (which will all be numbers) and `pre`/`build` keys (which will always be a string). If the version doesn't contain any pre-release or build information, the properties will be returned as empty string.

## Strict No LLM / No AI Policy

No LLMs for issues.

No LLMs for patches / pull requests.

No LLMs for comments on the bug tracker, including translation.

English is encouraged, but not required. You are welcome to post in your native language and rely on others to have their own translation tools of choice to interpret your words.

## License

MIT

<!-- prettier-ignore-start -->
[downloads-image]: http://img.shields.io/npm/dm/parse-node-version.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/parse-node-version
[npm-image]: http://img.shields.io/npm/v/parse-node-version.svg?style=flat-square

[ci-url]: https://github.com/gulpjs/parse-node-version/actions/workflows/dev.yml
[ci-image]: https://img.shields.io/github/actions/workflow/status/gulpjs/parse-node-version/dev.yml?style=flat-square

[coveralls-url]: https://coveralls.io/r/gulpjs/parse-node-version
[coveralls-image]: https://img.shields.io/coveralls/gulpjs/parse-node-version/main.svg?style=flat-square
<!-- prettier-ignore-end -->
