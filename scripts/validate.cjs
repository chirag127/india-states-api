/**
 * Data validation script
 * Run: node scripts/validate.cjs
 */
const fs = require('fs');
const path = require('path');

const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/states.json'), 'utf8'));
const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/v1/states.json'), 'utf8'));

let errors = 0;

for (const state of states) {
  for (const field of schema.$defs.State.required) {
    if (!(field in state)) {
      console.error(`Missing required field "${field}" in ${state.id || 'unknown'}`);
      errors++;
    }
  }
  if (state.id && !/^IN-[A-Z]{2}$/.test(state.id)) {
    console.error(`Invalid id format: ${state.id}`);
    errors++;
  }
}

// Check for duplicates
const ids = states.map(s => s.id);
const dupes = [...new Set(ids.filter((item, index) => ids.indexOf(item) !== index))];
if (dupes.length > 0) {
  console.error(`Duplicate IDs: ${dupes.join(', ')}`);
  errors++;
}

// Anomaly: record count
if (states.length !== 36) {
  console.error(`Anomaly: Expected 36 records, got ${states.length}`);
  errors++;
}

// Anomaly: states vs UTs
const stateCount = states.filter(s => s.status === 'state').length;
const utCount = states.filter(s => s.status === 'union-territory').length;
if (stateCount !== 28 || utCount !== 8) {
  console.error(`Anomaly: Expected 28 states + 8 UTs, got ${stateCount} + ${utCount}`);
  errors++;
}

if (errors > 0) {
  console.error(`\n${errors} validation errors found`);
  process.exit(1);
} else {
  console.log('All validations passed');
}
