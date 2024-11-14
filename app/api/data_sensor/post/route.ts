import { db } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    // Parsear el cuerpo de la solicitud para obtener los datos
    const { valor_sensor, timestamp } = await request.json();

    // Conectar a la base de datos y hacer el INSERT
    const client = await db.connect();
    await client.sql`
          INSERT INTO datos_sensor (sensor_value, timestamp)
          VALUES (${valor_sensor}, ${timestamp});
        `;

    return new Response(
      JSON.stringify({ message: "Data inserted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(JSON.stringify({ error: "Failed to insert data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}