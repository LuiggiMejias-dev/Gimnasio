import React, { useState, useEffect } from 'react'; // Importamos useEffect junto a useState
import { Navbar } from './Components/Navbar/Navbar';
import { Hero } from './Components/Hero/Hero';
import { Clases } from './Components/Clases/Clases'; 
import { Precios } from './Components/Precios/Precios';
import { Tienda } from './Components/Tienda/Tienda'; 
import { PromocionModal } from './Components/Promocion/PromocionModal'; 
import { Footer } from './Components/Footer/Footer'; 
import './index.css';

function App() {
  const [vistaActiva, setVistaActiva] = useState('inicio');

  useEffect(() => {
    const titulos = {
      inicio: 'FitZone | Forja tu Cuerpo',
      clases: 'Clases & Disciplinas | FitZone',
      precios: 'Membresías & Planes | FitZone',
      tienda: 'Suplementación Oficial | FitZone'
    };
    document.title = titulos[vistaActiva] || 'FitZone';

    if (vistaActiva === 'inicio') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.history.pushState(null, '', `#${vistaActiva}`);
    }
  }, [vistaActiva]); 

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar setVistaActiva={setVistaActiva} vistaActiva={vistaActiva} />
      <main style={{ flexGrow: 1 }}>
        {vistaActiva === 'inicio' && <Hero setVistaActiva={setVistaActiva} />}
        {vistaActiva === 'clases' && <Clases />} 
        {vistaActiva === 'precios' && <Precios />}
        {vistaActiva === 'tienda' && <Tienda />} 
      </main>
      <PromocionModal iniciarContador={vistaActiva === 'precios'} />
      
      <Footer />
    </div>
  );
}

export default App;