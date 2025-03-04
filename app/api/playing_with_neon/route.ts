import { connectDatabase } from '@/configs/database';

export async function GET() {
  try {
    const sql = connectDatabase();
    const rows = await sql`SELECT * from playing_with_neon`;

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST() {
  try {
    const sql = connectDatabase();

    // Ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS playing_with_neon (
        id SERIAL PRIMARY KEY,
        name TEXT,
        value FLOAT
      )`;

    // Generate random data
    const randomName = Math.random().toString(36).substring(7); // Random string
    const randomValue = Math.random(); // Random float between 0 and 1

    // Insert into the table
    const insertedRow = await sql`
      INSERT INTO playing_with_neon (name, value)
      VALUES (${randomName}, null)
      RETURNING *`; // Return inserted row

    return new Response(JSON.stringify(insertedRow[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to insert data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
