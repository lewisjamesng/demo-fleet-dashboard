import _ from 'lodash';

export interface VehicleReading {
  vehicleId: string;
  region: string;
  odometerKm: number;
  batteryPct: number;
  lastSeen: string;
}

export interface RegionSummary {
  region: string;
  label: string;
  vehicles: number;
  avgBatteryPct: number;
  totalOdometerKm: number;
  lowBattery: string[];
}

export const LOW_BATTERY_PCT = 20;

/** Keep only the newest reading per vehicle. */
export function latestReadings(readings: VehicleReading[]): VehicleReading[] {
  const byVehicle = _.groupBy(readings, 'vehicleId');
  return _.sortBy(
    _.map(byVehicle, (rows) => _.maxBy(rows, (r) => Date.parse(r.lastSeen)) as VehicleReading),
    'vehicleId',
  );
}

/** Build the per-region tiles shown on the dashboard. */
export function summariseByRegion(readings: VehicleReading[]): RegionSummary[] {
  const latest = latestReadings(readings);
  return _.sortBy(
    _.map(_.groupBy(latest, 'region'), (rows, region) => ({
      region,
      label: _.startCase(region),
      vehicles: rows.length,
      avgBatteryPct: _.round(_.meanBy(rows, 'batteryPct'), 1),
      totalOdometerKm: _.sumBy(rows, 'odometerKm'),
      lowBattery: _.map(_.filter(rows, (r) => r.batteryPct < LOW_BATTERY_PCT), 'vehicleId'),
    })),
    'region',
  );
}

/** Split a vehicle list into fixed-size pages for the dashboard table. */
export function paginate<T>(items: T[], pageSize: number): T[][] {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new Error('pageSize must be a positive integer');
  }
  return _.chunk(items, pageSize);
}

export function formatKm(km: number): string {
  return `${km.toLocaleString('en-GB')} km`;
}
