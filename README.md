# India States API

All 28 states and 8 union territories of India as a free, static JSON API. ISO 3166-2 codes,
capitals, population, area, district counts, official languages and region.

No authentication. No server. No rate limit. The committed JSON is the database.

```bash
curl https://chirag127.github.io/india-states-api/api/v1/states.json
```

```javascript
const res = await fetch("https://chirag127.github.io/india-states-api/api/v1/states.json");
const states = await res.json();

// 28 states + 8 union territories, real census figures
const karnataka = states.find((s) => s.id === "IN-KA");
// { id: "IN-KA", name: "Karnataka", capital: "Bengaluru", population: 61095297,
//   area_km2: 191791, districts: 31, official_languages: ["Kannada"], region: "south" }
```

## What you get

| Field | Example | Notes |
|---|---|---|
`id` | `IN-KA` | ISO 3166-2 subdivision code |
`name` | `Karnataka` | Official English name |
`capital` | `Bengaluru` | Seat of government |
`status` | `state` or `union_territory` | Which of the two it is |
`population` | `61095297` | Census 2011 — the last complete count |
`area_km2` | `191791` | Land area in square kilometres |
`districts` | `31` | Number of districts |
`official_languages` | `["Kannada"]` | Constitutional official languages |
`region` | `south` | north / south / east / west / central / northeast |

## Endpoints

| Endpoint | Description | Size |
|---|---|---|
`GET /api/v1/states.json` | Every state and UT | 36 records |
`GET /api/v1/states/{id}.json` | One subdivision by ISO code | 1 record |
`GET /api/v1/search?q={query}` | Match on name or capital | filtered |
`GET /api/v1/meta.json` | Record count, source, freshness | metadata |

Single-state lookups are the reason this is an API and not a gist — no parsing a 36-record blob
when you need one:

```bash
curl https://chirag127.github.io/india-states-api/api/v1/states/IN-MH.json
# { "id": "IN-MH", "name": "Maharashtra", "capital": "Mumbai",
#   "population": 112374333, "area_km2": 307713, "districts": 36, ... }
```

## Aggregate figures

These are computed from the 36 records, not maintained separately — so they cannot drift.

| | |
|---|---|
Subdivisions | 36 (28 states, 8 union territories) |
Total population | 1,213,438,273 |
Total districts | 776 |
Largest by area | Rajasthan, 342,239 km² |
Most populous | Uttar Pradesh, 199,812,341 |

## Data source and accuracy

Population, area and district counts come from **Census of India 2011**, the last full enumeration.
District counts move as new districts are carved out, so `districts` reflects the count as of the
dataset's `updated` field in `meta.json` — check there before relying on it for compliance work.

ISO codes follow ISO 3166-2:IN. Official languages follow the Eighth Schedule and state
legislation. Where a state has more than one official language, all are listed.

## Contract

The full OpenAPI 3.1 description is in [`openapi.yaml`](./openapi.yaml). A JSON Schema for every
record is in [`schemas/`](./schemas/). Both are versioned with the data.

```javascript
// TypeScript users
type IndiaState = {
  id: string;               // ISO 3166-2, e.g. "IN-KA"
  name: string;
  capital: string;
  status: "state" | "union-territory";
  population: number;
  area_km2: number;
  districts: number;
  official_languages: string[];
  region: "north" | "south" | "east" | "west" | "central" | "northeast";
};
```

## Use it for

Address forms with a state dropdown · population or district analytics · election and census
dashboards · travel and logistics apps · anything that needs Indian subdivision codes without
signing up for a data licence.

## Limits, stated plainly

- **Population and area are Census 2011.** India has not had a complete enumeration since. Any
  figure claiming current population is an estimate, and this API does not pretend otherwise.
- **District counts change.** Telangana's reorganisation and new districts in several states mean
  this number ages. The `meta.json` timestamp is the authority.
- **It is not a pincode API.** For postal codes use
  [`india-pincode-api`](https://github.com/chirag127/india-pincode-api).

## Contributing

Data corrections are welcome and need a source: a government notification, a Census table, or an
ISO bulletin. Open an issue with the link. Unsourced edits to population or area will be rejected —
a wrong figure in a dataset is worse than a missing one.

## Licence

Data: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — attribution to Census of India /
data.gov.in. Code and documentation: MIT.

---

## About the author

**Chirag Singhal** — building free, open APIs and tools. Everything here is free, no authentication,
no rate limits, no telemetry. If it saves you time and you want to work together, that is exactly
what this is for.

- **Email — the fastest way to reach me:** [chirag@oriz.in](mailto:chirag@oriz.in)
- **GitHub:** [github.com/chirag127](https://github.com/chirag127)
- **LinkedIn:** [linkedin.com/in/chirag127](https://www.linkedin.com/in/chirag127/)
- **X:** [x.com/singhal127](https://x.com/singhal127)
- **YouTube:** [@ChiragSinghal127](https://www.youtube.com/@ChiragSinghal127)
- **Instagram:** [chiragsinghal127](https://www.instagram.com/chiragsinghal127/)
- **Reddit:** [Far_Macaron_9910](https://www.reddit.com/user/Far_Macaron_9910/)
- **Buy me a coffee:** [buymeacoffee.com/chirag127](https://buymeacoffee.com/chirag127)

**Hiring?** I build developer tooling, data APIs and web platforms. Email me — I reply to
everything.
