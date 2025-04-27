const { build } = require('esbuild');
const { dependencies } = require('./package.json');
const { main } = require('./package.json');
build({
  entryPoints: [main],
  bundle: true,
  outfile: './dist/bundle.js',
  minify: true,
  external: Object.keys(dependencies),
  target:["ES2016"]
}).catch(() => process.exit(1));

