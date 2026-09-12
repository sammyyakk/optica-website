import { neon, NeonQueryFunction } from "@neondatabase/serverless";

let _sql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    _sql = neon<false, false>(process.env.DATABASE_URL!);
  }
  return _sql;
}
