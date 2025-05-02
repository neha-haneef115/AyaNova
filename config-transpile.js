// config-transpile.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Transpile the TypeScript config to JavaScript
console.log('Transpiling Next.js config from TypeScript...');
execSync('npx tsc next.config.ts --moduleResolution node --esModuleInterop --target es2022');

// Create the loader file that requires the transpiled JS file
const loaderContent = `// This file is auto-generated
module.exports = require('./next.config.js');
`;

fs.writeFileSync(path.join(__dirname, 'next.config.cjs'), loaderContent);
console.log('Config transpilation complete.');