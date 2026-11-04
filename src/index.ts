import { createServer } from 'node:http';
import { summariseByRegion, VehicleReading } from './format';

// Synthetic sample readings, for demo purposes only.
const sample: VehicleReading[] = [
  { vehicleId: 'VH-001', region: 'north-depot', odometerKm: 12040, batteryPct: 81, lastSeen: '2026-03-01T08:00:00Z' },
  { vehicleId: 'VH-002', region: 'north-depot', odometerKm: 8800, batteryPct: 15, lastSeen: '2026-03-01T08:05:00Z' },
  { vehicleId: 'VH-003', region: 'south-depot', odometerKm: 30210, batteryPct: 64, lastSeen: '2026-03-01T07:55:00Z' },
];

const port = Number(process.env.PORT ?? 3001);
createServer((_req, res) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify(summariseByRegion(sample)));
}).listen(port, () => console.log(`demo-fleet-dashboard listening on :${port}`));
