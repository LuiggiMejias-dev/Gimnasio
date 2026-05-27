import React, { useState, useEffect } from 'react'; // Importamos useEffect junto a useState
import { Navbar } from './Components/Navbar/Navbar';
import { Hero } from './Components/Hero/Hero';
import { Clases } from './components/Clases/Clases'; 
import { Precios } from './components/Precios/Precios';
import { Tienda } from './components/Tienda/Tienda'; 
import { PromocionModal } from './Components/Promocion/PromocionModal'; 
import { Footer } from './Components/Footer/Footer'; 
import './index.css';

function App() {
  // Estado que controla qué sección se renderiza en pantalla
  const [vistaActiva, setVistaActiva] = useState('inicio');

  // Efecto inteligente para sincronizar el título de la pestaña y el Hash de la URL
  useEffect(() => {
    // 1. Mapeo de títulos profesionales para la pestaña del navegador
    const titulos = {
      inicio: 'FitZone | Forja tu Cuerpo',
      clases: 'Clases & Disciplinas | FitZone',
      precios: 'Membresías & Planes | FitZone',
      tienda: 'Suplementación Oficial | FitZone'
    };

    // Aplicamos el título dinámico
    document.title = titulos[vistaActiva] || 'FitZone';

    // 2. Sincronizamos la barra de direcciones de forma silenciosa (sin recargar la página)
    if (vistaActiva === 'inicio') {
      // Limpia el hash en la página de inicio para dejar la URL impecable (localhost:5173/)
      window.history.pushState(null, '', window.location.pathname);
    } else {
      // Inyecta el hash correcto correspondiente a la vista actual
      window.history.pushState(null, '', `#${vistaActiva}`);
    }
  }, [vistaActiva]); // Escucha atentamente cada cambio en 'vistaActiva'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Pasamos la función setVistaActiva al Navbar para la navegación superior */}
      <Navbar setVistaActiva={setVistaActiva} vistaActiva={vistaActiva} />
      
      {/* Contenedor dinámico principal */}
      <main style={{ flexGrow: 1 }}>
        {/* Pasamos la función modificadora de estado al Hero como Prop */}
        {vistaActiva === 'inicio' && <Hero setVistaActiva={setVistaActiva} />}
        {vistaActiva === 'clases' && <Clases />} 
        {vistaActiva === 'precios' && <Precios />}
        {vistaActiva === 'tienda' && <Tienda />} 
      </main>

      {/* El modal de la oferta se abre al instante únicamente en la vista 'precios' */}
      <PromocionModal iniciarContador={vistaActiva === 'precios'} />
      
      <Footer />
    </div>
  );
}

export default App;