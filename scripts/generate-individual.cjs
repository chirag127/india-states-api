/**
 * Generate individual state JSON files from the master states.json
 * Run: node scripts/generate-individual.js
 */
const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/v1/states.json'), 'utf8'));
const outDir = path.join(__dirname, '../api/v1/states');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const state of states) {
  const filePath = path.join(outDir, `${state.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(state, null, 2) + '\n');
}

console.log(`Generated ${states.length} individual state files in ${outDir}`);
