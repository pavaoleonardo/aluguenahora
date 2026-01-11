import * as migration_20260111_171246 from './20260111_171246';

export const migrations = [
  {
    up: migration_20260111_171246.up,
    down: migration_20260111_171246.down,
    name: '20260111_171246'
  },
];
