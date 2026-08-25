/**
 * Generate static search index for client-side search
 * Run: node scripts/generate-search-index.cjs
 */
const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/v1/states.json'), 'utf8'));

// Build prefix index for fast client-side search
const index = {
  byName: {},
  byCapital: {},
  byId: {}
};

for (const state of states) {
  // Index by name prefixes
  const name = state.name.toLowerCase();
  for (let i = 1; i <= name.length; i++) {
    const prefix = name.slice(0, i);
    if (!index.byName[prefix]) index.byName[prefix] = [];
    if (!index.byName[prefix].includes(state.id)) {
      index.byName[prefix].push(state.id);
    }
  }

  // Index by capital prefixes
  const capital = state.capital.toLowerCase();
  for (let i = 1; i <= capital.length; i++) {
    const prefix = capital.slice(0, i);
    if (!index.byCapital[prefix]) index.byCapital[prefix] = [];
    if (!index.byCapital[prefix].includes(state.id)) {
      index.byCapital[prefix].push(state.id);
    }
  }

  // Index by ID
  index.byId[state.id] = state;
}

const outDir = path.join(__dirname, '../api/v1');
fs.writeFileSync(path.join(outDir, 'search-index.json'), JSON.stringify(index, null, 2) + '\n');

console.log(`Generated search index with ${Object.keys(index.byName).length} name prefixes and ${Object.keys(index.byCapital).length} capital prefixes`);
