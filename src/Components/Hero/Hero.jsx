import React from 'react';
import styles from './Hero.module.css';

export const Hero = ({ setVistaActiva }) => {
  
  // Función que se dispara al pulsar el botón principal
  const handleStartToday = () => {
    if (setVistaActiva) {
      setVistaActiva('precios'); // Cambia la vista global en App.jsx
    }
  };

  return (
    <section className={styles.heroContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          FORJA TU <span className={styles.highlight}>CUERPO</span><br />
          DOMINA TU MENTE
        </h1>
        <p className={styles.subtitle}>
          Instalaciones de primer nivel, planes a tu medida y el ambiente que necesitas para romper tus límites.
        </p>
        
        {/* Botón interactivo conectado al estado de React */}
        <button 
          className={styles.ctaButton} 
          onClick={handleStartToday}
          aria-label="Ver planes y membresías disponibles"
        >
          Empieza hoy mismo
        </button>
      </div>
    </section>
  );
};