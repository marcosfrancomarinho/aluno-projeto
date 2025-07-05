const { build } = require('esbuild');
const { dependencies , devDependencies} = require('./package.json');
const { main } = require('./package.json');

build({
  entryPoints: [main],
  bundle: true,
  outfile: './dist/bundle.js',
  minify: true,
  platform: 'node',
  external: [...Object.keys(dependencies), ...Object.keys(devDependencies)],
  target: ["ES2015"],
}).catch(() => process.exit(1));
