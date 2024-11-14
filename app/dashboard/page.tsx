"use client";

import { Card } from "@/app/ui/dashboard/cards";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "@/app/ui/dashboard/latest-invoices";
import { lusitana } from "@/app/ui/fonts";
import { useEffect, useState } from "react";

type SensorData = {
  id: number;
  sensor_value: number; // Asegúrate de que el tipo sea correcto según tu base de datos (número, cadena, etc.)
  timestamp: string; // Usa el tipo adecuado; si es una fecha, puedes usar Date o string
};

export default function Page() {
  const [data, setData] = useState<SensorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Función para obtener datos del endpoint
    async function fetchData() {
      try {
        const response = await fetch("/api/data_sensor/get"); // Cambié la ruta aquí
        const result = await response.json();
        setData(result);
        setLoading(false); // Cambiar el estado a 'false' cuando los datos estén cargados
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Cambiar el estado en caso de error
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
  Datos sensor
          </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Valor Sensor</th>
              <th className="border px-4 py-2">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.sensor_value}</td>
                <td className="border px-4 py-2">{item.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
  
}