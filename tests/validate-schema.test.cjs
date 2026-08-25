/**
 * Schema validation tests
 * Run: npm test
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/states.json'), 'utf8'));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/v1/states.json'), 'utf8'));

function validateState(state, schema) {
  const errors = [];
  const required = schema.$defs.State.required;
  for (const field of required) {
    if (!(field in state)) errors.push(`Missing required field: ${field}`);
  }
  if (state.id && !/^IN-[A-Z]{2}$/.test(state.id)) {
    errors.push(`Invalid id format: ${state.id}`);
  }
  if (state.status && !['state', 'union-territory'].includes(state.status)) {
    errors.push(`Invalid status: ${state.status}`);
  }
  if (state.population !== undefined && (typeof state.population !== 'number' || state.population < 0)) {
    errors.push(`Invalid population: ${state.population}`);
  }
  if (state.area_km2 !== undefined && (typeof state.area_km2 !== 'number' || state.area_km2 < 0)) {
    errors.push(`Invalid area_km2: ${state.area_km2}`);
  }
  if (state.districts !== undefined && (typeof state.districts !== 'number' || state.districts < 1)) {
    errors.push(`Invalid districts: ${state.districts}`);
  }
  return errors;
}

let passed = 0;
let failed = 0;

// Test 1: All records validate
console.log('Test 1: Schema validation for all records');
for (const state of states) {
  const errors = validateState(state, schema);
  if (errors.length > 0) {
    console.error(`  FAIL: ${state.id || 'unknown'} — ${errors.join(', ')}`);
    failed++;
  } else {
    passed++;
  }
}

// Test 2: No duplicate IDs
console.log('Test 2: No duplicate IDs');
const ids = states.map(s => s.id);
const dupes = ids.filter((item, index) => ids.indexOf(item) !== index);
if (dupes.length > 0) {
  console.error(`  FAIL: Duplicate IDs: ${[...new Set(dupes)].join(', ')}`);
  failed++;
} else {
  console.log('  PASS');
  passed++;
}

// Test 3: Correct count
console.log('Test 3: Record count');
const expectedCount = 36; // 28 states + 8 UTs
if (states.length !== expectedCount) {
  console.error(`  FAIL: Expected ${expectedCount}, got ${states.length}`);
  failed++;
} else {
  console.log('  PASS');
  passed++;
}

// Test 4: States vs UTs count
console.log('Test 4: States vs UTs count');
const stateCount = states.filter(s => s.status === 'state').length;
const utCount = states.filter(s => s.status === 'union-territory').length;
if (stateCount !== 28) {
  console.error(`  FAIL: Expected 28 states, got ${stateCount}`);
  failed++;
} else if (utCount !== 8) {
  console.error(`  FAIL: Expected 8 UTs, got ${utCount}`);
  failed++;
} else {
  console.log('  PASS');
  passed++;
}

// Test 5: Individual files exist
console.log('Test 5: Individual state files generated');
const statesDir = path.join(__dirname, '../api/v1/states');
let filesOk = true;
for (const state of states) {
  const filePath = path.join(statesDir, `${state.id}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`  FAIL: Missing file for ${state.id}`);
    filesOk = false;
    failed++;
  }
}
if (filesOk) {
  console.log('  PASS');
  passed++;
}

// Test 6: Search index exists
console.log('Test 6: Search index generated');
const indexPath = path.join(__dirname, '../api/v1/search-index.json');
if (!fs.existsSync(indexPath)) {
  console.error('  FAIL: search-index.json not found');
  failed++;
} else {
  const idx = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
  if (Object.keys(idx.byName).length === 0) {
    console.error('  FAIL: Empty search index');
    failed++;
  } else {
    console.log('  PASS');
    passed++;
  }
}

// Test 7: Meta file
console.log('Test 7: Meta file');
const metaPath = path.join(__dirname, '../api/v1/meta.json');
if (!fs.existsSync(metaPath)) {
  console.error('  FAIL: meta.json not found');
  failed++;
} else {
  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  if (!meta.status || !meta.lastUpdated || !meta.recordCount) {
    console.error('  FAIL: Missing required meta fields');
    failed++;
  } else {
    console.log('  PASS');
    passed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
