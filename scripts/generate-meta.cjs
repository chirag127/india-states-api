/**
 * Generate meta.json from current data
 * Run: node scripts/generate-meta.cjs
 */
const fs = require('fs');
const path = require('path');

const states = JSON.parse(fs.readFileSync(path.join(__dirname, '../api/v1/states.json'), 'utf8'));

const meta = {
  status: 'healthy',
  lastUpdated: new Date().toISOString(),
  sourceUpdatedAt: new Date().toISOString(),
  retrievedAt: new Date().toISOString(),
  recordCount: states.length,
  version: '1.0.0',
  schemaVersion: '1.0.0',
  source: 'data.gov.in / Census of India',
  sourceUrl: 'https://data.gov.in',
  license: 'CC-BY-4.0',
  updateCadence: 'manual',
  nextUpdateDue: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
  lastFailedAt: null,
  failureReason: null
};

fs.writeFileSync(path.join(__dirname, '../api/v1/meta.json'), JSON.stringify(meta, null, 2) + '\n');
console.log('Generated meta.json:', meta);
