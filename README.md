# demo-fleet-dashboard

Small data-formatting service that turns raw vehicle readings into dashboard tiles. **Synthetic demo repository.** All code and data are fictional sample material for a security-remediation demo.

**Owner:** `@demo-org/fleet-insights-team` (see `.github/CODEOWNERS`)

## What it does

- `latestReadings`: keeps the newest reading per vehicle
- `summariseByRegion`: per-region vehicle count, average battery, total km and low-battery list
- `paginate`, `formatKm`: table helpers

## Develop

```bash
npm ci
npm run build
npm test
```

## Security scanning

CI runs `npm audit --omit=dev` and `osv-scanner` in the `security-scan` job. Reports are uploaded as artifacts, and the SARIF goes to GitHub code scanning. `osv-scanner.toml` ignores only dev-only Jest tooling.

## Licence

MIT
