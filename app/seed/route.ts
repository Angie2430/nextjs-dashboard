import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await db.connect();

  try {
    // Código SQL para crear la tabla
    await client.sql`
      CREATE TABLE IF NOT EXISTS datos_sensor (
        id SERIAL PRIMARY KEY,
        sensor_value NUMERIC,
        timestamp TIMESTAMP DEFAULT NOW()
      );
    `;

    // Opcional: Insertar datos iniciales
    // await client.sql`
    //   INSERT INTO datos_sensor (sensor_value) VALUES (23.5), (27.1);
    // `;

    return NextResponse.json({
      message: "Tabla creada y datos iniciales insertados correctamente",
    });
  } catch (error) {
    // Verificación de tipo para manejar error
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error desconocido" },
      { status: 500 }
    );
  } finally {
    client.release();
  }
}