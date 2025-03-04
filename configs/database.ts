import postgres from 'postgres';

export function connectDatabase() {
  const sql = postgres(process.env.DATABASE_URL ?? '', { ssl: 'require' });
  return sql;
}
