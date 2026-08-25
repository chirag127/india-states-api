# Security Policy

## Reporting Vulnerabilities

If you discover a security issue in this API or its infrastructure, please:

1. **DO NOT** open a public issue
2. Email: security@oriz.in (or DM @chirag127 on relevant platforms)
3. Allow 48 hours for initial response
4. Responsible disclosure appreciated

## Scope

This repository contains:
- Static JSON data (public domain / CC-BY-4.0)
- Static website (client-side only)
- GitHub Actions workflows

## What is NOT a vulnerability

- Data accuracy issues → open a regular issue
- Missing data → open a regular issue
- Schema disagreements → open a regular issue

## What IS a vulnerability

- Secrets or credentials in repository
- Personal data (PII) in published datasets
- Malicious code in scrapers or scripts
- Infrastructure misconfiguration exposing non-public data

## Data Sensitivity

This API publishes only public-domain or CC-BY-4.0 data.
No personal data, authentication credentials, or private information
should ever be committed or published.

If you find PII in any dataset, report immediately.
