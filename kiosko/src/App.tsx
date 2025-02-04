import React, { useState, useEffect } from "react";
import "./App.css";
import frasesData from "./assets/frases.json";

function App() {
  const [fraseLuz, setFraseLuz] = useState("");
  const [fraseAgua, setFraseAgua] = useState("");

  useEffect(() => {
    const obtenerFrasesAleatorias = () => {
      const luzFrases = frasesData.categorias.find((cat) => cat.nombre === "luz").frases;
      const aguaFrases = frasesData.categorias.find((cat) => cat.nombre === "agua").frases;

      setFraseLuz(luzFrases[Math.floor(Math.random() * luzFrases.length)].frase);
      setFraseAgua(aguaFrases[Math.floor(Math.random() * aguaFrases.length)].frase);
    };

    obtenerFrasesAleatorias();
    const interval = setInterval(obtenerFrasesAleatorias, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <div className="cabecera">
        <div className="QR"></div>
        <div className="Consumo_Agua_y_Luz">
          <h1>Consumo de agua y luz</h1>
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
        <div className="Consumo"><p>{fraseLuz}</p></div>
        <div className="ConsumoAgua"><p>{fraseAgua}</p></div>
      </div>
    </div>
  );
}

export default App;
