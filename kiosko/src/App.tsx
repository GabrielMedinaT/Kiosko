import { useState, useEffect } from "react";
import "./App.css";
import frasesData from "./assets/frases.json";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ConsumoData {
  hora: string;
  consumo: number;
  costo: number;
}

function App() {
  const [fraseLuz, setFraseLuz] = useState<string>("");
  const [fraseAgua, setFraseAgua] = useState<string>("");
  const [consumoLuz, setConsumoLuz] = useState<ConsumoData[]>([]);
  const [consumoAgua, setConsumoAgua] = useState<ConsumoData[]>([]);
  const [fechaActual, setFechaActual] = useState<string>("");
  const [mostrarHoy, setMostrarHoy] = useState<boolean>(true);

  useEffect(() => {
    const obtenerFrasesAleatorias = () => {
      const luzFrases =
        frasesData.categorias.find((cat) => cat.nombre === "luz")?.frases ?? [];

      const aguaFrases =
        frasesData.categorias.find((cat) => cat.nombre === "agua")?.frases ??
        [];

      if (luzFrases.length > 0) {
        setFraseLuz(
          luzFrases[Math.floor(Math.random() * luzFrases.length)].frase
        );
      }
      if (aguaFrases.length > 0) {
        setFraseAgua(
          aguaFrases[Math.floor(Math.random() * aguaFrases.length)].frase
        );
      }
    };

    const generarConsumo = () => {
      const horasPico = [7, 8, 9, 10, 11, 18, 19, 20, 21, 22];
      const consumoPlanoBase = 50;
      const variacion = () => Math.floor(Math.random() * 20) - 10;
      const horaActual = new Date().getHours();
      const limite = mostrarHoy ? horaActual + 1 : 24;

      const consumoLuzData: ConsumoData[] = Array.from(
        { length: limite },
        (_, i) => ({
          hora: `${i}:00`,
          consumo: horasPico.includes(i)
            ? Math.floor(Math.random() * 300) + 200
            : consumoPlanoBase + variacion(),
          costo: horasPico.includes(i)
            ? Math.random() * 15 + 5
            : Math.random() * 3,
        })
      );

      const consumoAguaData: ConsumoData[] = Array.from(
        { length: limite },
        (_, i) => ({
          hora: `${i}:00`,
          consumo: horasPico.includes(i)
            ? Math.floor(Math.random() * 100) + 50
            : consumoPlanoBase / 2 + variacion(),
          costo: horasPico.includes(i)
            ? Math.random() * 10 + 3
            : Math.random() * 2,
        })
      );

      setConsumoLuz(consumoLuzData);
      setConsumoAgua(consumoAguaData);
    };

    setFechaActual(
      mostrarHoy
        ? new Date().toLocaleDateString()
        : new Date(Date.now() - 86400000).toLocaleDateString()
    );

    obtenerFrasesAleatorias();
    generarConsumo();

    const interval = setInterval(() => {
      setMostrarHoy((prev) => !prev);
    }, 30000);

    return () => clearInterval(interval);
  }, [mostrarHoy]);

  const totalConsumoLuz = consumoLuz.reduce(
    (acc, item) => acc + item.consumo,
    0
  );
  const totalCostoLuz = consumoLuz.reduce((acc, item) => acc + item.costo, 0);
  const totalConsumoAgua = consumoAgua.reduce(
    (acc, item) => acc + item.consumo,
    0
  );
  const totalCostoAgua = consumoAgua.reduce((acc, item) => acc + item.costo, 0);

  return (
    <div className="container">
      <div className="cabecera">
        <div className="QR"></div>
        <div className="Consumo_Agua_y_Luz">
          <h1>
            Consumo de agua y luz - {fechaActual} ({mostrarHoy ? "Hoy" : "Ayer"}
            )
          </h1>
        </div>
        <div className="Logos">LOGO</div>
      </div>

      <div className="carteles">
        <div className="LUZ">
          <h1>💡Luz💡</h1>
        </div>
        <div className="Agua">
          <h1>💧Agua💧</h1>
        </div>
      </div>

      <div className="consumogeneral">
        <div className="Consumo">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumoLuz}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consumo" fill="#ffc107" name="Consumo kWh" />
              <Bar dataKey="costo" fill="#ff5722" name="Costo en €" />
            </BarChart>
          </ResponsiveContainer>
          <h4>
            Total consumo: {totalConsumoLuz} kWh - Costo acumulado:{" "}
            {totalCostoLuz.toFixed(2)} €
          </h4>
          <h3>{fraseLuz}</h3>
        </div>

        <div className="ConsumoAgua">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumoAgua}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hora" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="consumo" fill="#2196f3" name="Consumo litros" />
              <Bar dataKey="costo" fill="#4caf50" name="Costo en €" />
            </BarChart>
          </ResponsiveContainer>
          <h4>
            Total consumo: {totalConsumoAgua} litros - Costo acumulado:{" "}
            {totalCostoAgua.toFixed(2)} €
          </h4>
          <h3> {fraseAgua} </h3>
        </div>
      </div>
    </div>
  );
}

export default App;
