import { db } from "@vercel/postgres";

export async function GET() {
  const client = await db.connect();
  const result = await client.sql`SELECT * FROM datos_sensor`;

  console.log(result.rows); // Para depuración

  return new Response(JSON.stringify(result.rows), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}