import { formatKm, latestReadings, paginate, summariseByRegion, VehicleReading } from '../src/format';

const readings: VehicleReading[] = [
  { vehicleId: 'VH-1', region: 'north-depot', odometerKm: 100, batteryPct: 90, lastSeen: '2026-01-01T08:00:00Z' },
  { vehicleId: 'VH-1', region: 'north-depot', odometerKm: 150, batteryPct: 70, lastSeen: '2026-01-01T09:00:00Z' },
  { vehicleId: 'VH-2', region: 'north-depot', odometerKm: 200, batteryPct: 10, lastSeen: '2026-01-01T09:00:00Z' },
  { vehicleId: 'VH-3', region: 'south-depot', odometerKm: 300, batteryPct: 55, lastSeen: '2026-01-01T09:00:00Z' },
];

describe('fleet formatting', () => {
  it('keeps only the newest reading per vehicle', () => {
    const latest = latestReadings(readings);
    expect(latest).toHaveLength(3);
    expect(latest.find((r) => r.vehicleId === 'VH-1')?.odometerKm).toBe(150);
  });

  it('summarises regions with averages and low-battery vehicles', () => {
    expect(summariseByRegion(readings)).toEqual([
      { region: 'north-depot', label: 'North Depot', vehicles: 2, avgBatteryPct: 40, totalOdometerKm: 350, lowBattery: ['VH-2'] },
      { region: 'south-depot', label: 'South Depot', vehicles: 1, avgBatteryPct: 55, totalOdometerKm: 300, lowBattery: [] },
    ]);
  });

  it('paginates and rejects invalid page sizes', () => {
    expect(paginate([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(() => paginate([1], 0)).toThrow();
  });

  it('formats kilometres', () => {
    expect(formatKm(12040)).toBe('12,040 km');
  });
});
