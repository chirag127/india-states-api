# India States API

> All 28 states and 8 union territories of India with ISO codes, capitals, population, area, and districts count.

**Scope:** india-geo  
**Source:** data.gov.in / Census of India open data  
**License:** CC-BY-4.0  
**Update cadence:** manual (data changes only when states are reorganized)  
**Status:** active  
**Version:** 1.0.0  

## Quick Start

```bash
curl https://chirag127.github.io/india-states-api/api/v1/states.json
```

```javascript
const res = await fetch('https://chirag127.github.io/india-states-api/api/v1/states.json');
const states = await res.json();
```

## API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/v1/states.json` | All states and UTs |
| `GET /api/v1/states/{id}.json` | Single state/UT by ISO code (e.g. `IN-MH`) |
| `GET /api/v1/search?q={query}` | Search by name or capital |
| `GET /api/v1/meta.json` | Dataset metadata (freshness, record count, status) |

## Data Schema

See [`schemas/states.json`](schemas/states.json) for JSON Schema.

## Website

Interactive docs: https://chirag127.github.io/india-states-api/

## OpenAPI

See [`openapi.yaml`](openapi.yaml).

## Repository

https://github.com/chirag127/india-states-api

## Attribution

Data sourced from [data.gov.in](https://data.gov.in) and [Census of India](https://censusindia.gov.in).  
Licensed under CC-BY-4.0. This API is an independent aggregation and does not claim ownership of the underlying data.
