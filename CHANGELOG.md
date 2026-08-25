# Changelog

## 1.0.0 — 2026-08-25

### Added
- Complete dataset: 28 states + 8 union territories
- JSON Schema validation (`schemas/states.json`)
- OpenAPI 3.1.0 specification (`openapi.yaml`)
- Individual state endpoints (`api/v1/states/{id}.json`)
- Search index for client-side search (`api/v1/search-index.json`)
- Metadata endpoint (`api/v1/meta.json`)
- Static website with interactive explorer (`website/index.html`)
- GitHub Actions: scheduled updates + Pages deployment
- Test suite: schema validation, duplicates, record counts, anomalies
- Last-known-good mechanism (data retained on failure)
- Source attribution and license documentation
