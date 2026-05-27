import React, { useState } from 'react';
import { Check, Flame, Zap, Award } from 'lucide-react';
import styles from './Precios.module.css';
import { RegistroModal } from './RegistroModal'; // Asegúrate de que la ruta apunte correctamente a donde guardes tu modal

export const Precios = () => {
  // Estados para controlar la visibilidad del modal y almacenar el plan seleccionado
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  // Manejador que se ejecuta al darle clic a "Elegir Plan"
  const handleElegirPlan = (plan) => {
    setPlanSeleccionado(plan);
    setIsModalOpen(true);
  };

  const planes = [
    {
      id: 'diario',
      nombre: 'Pase Diario',
      precio: 'S/ 15',
      periodo: 'por día',
      descripcion: 'Ideal para entrenamientos esporádicos o viajeros.',
      icon: <Zap size={20} />,
      caracteristicas: [
        'Acceso completo a la sala de musculación',
        'Uso de casilleros y duchas',
        'Válido por 1 ingreso en el día'
      ],
      destacado: false,
      botonText: 'Elegir Plan'
    },
    {
      id: 'intermedio',
      nombre: 'Plan Funcional',
      precio: 'S/ 120',
      periodo: 'al mes',
      descripcion: 'Perfecto para mantener el ritmo 3 veces por semana.',
      icon: <Flame size={20} />,
      caracteristicas: [
        'Acceso 3 veces por semana (12 sesiones/mes)',
        'Acceso a clases grupales incluidas',
        'Asesoría inicial con Coach',
        'Uso de casilleros y duchas'
      ],
      destacado: true, // Este plan resalta visualmente
      botonText: 'Elegir Plan'
    },
    {
      id: 'full',
      nombre: 'Socio VIP',
      precio: 'S/ 180',
      periodo: 'al mes',
      descripcion: 'Acceso total e ilimitado sin restricciones.',
      icon: <Award size={20} />,
      caracteristicas: [
        'Acceso ilimitado de Lunes a Sábado',
        'Todas las clases grupales libres',
        'Evaluación física mensual',
        '1 pase de invitado gratis al mes',
        'Descuentos en suplementos de la barra'
      ],
      destacado: false,
      botonText: 'Elegir Plan'
    }
  ];

  return (
    <section id="precios" className={styles.preciosSection}>
      <div className={styles.container}>
        
        {/* Encabezado de la Sección */}
        <div className={styles.header}>
          <span className={styles.tagline}>Membresías</span>
          <h2 className={styles.title}>Planes a tu Medida</h2>
          <p className={styles.subtitle}>
            Elige el formato que mejor se adapte a tu rutina y objetivos sin contratos forzosos.
          </p>
        </div>

        {/* Grid de Tarjetas */}
        <div className={styles.pricingGrid}>
          {planes.map((plan) => (
            <div 
              key={plan.id} 
              className={`${styles.priceCard} ${plan.destacado ? styles.destacadoCard : ''}`}
            >
              {plan.destacado && <div className={styles.popularBadge}>Más Vendido</div>}
              
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>{plan.icon}</div>
                <h3 className={styles.planName}>{plan.nombre}</h3>
                <p className={styles.planDesc}>{plan.descripcion}</p>
              </div>

              <div className={styles.priceWrapper}>
                <span className={styles.currencyAmount}>{plan.precio}</span>
                <span className={styles.period}>/ {plan.periodo}</span>
              </div>

              <ul className={styles.featuresList}>
                {plan.caracteristicas.map((feat, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <Check size={16} className={styles.checkIcon} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Botón con el evento onClick vinculado al estado del componente */}
              <button 
                className={`${styles.actionBtn} ${plan.destacado ? styles.btnAccent : styles.btnOutline}`}
                onClick={() => handleElegirPlan(plan)}
              >
                {plan.botonText}
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Componente del Modal inyectado al final de la sección */}
      <RegistroModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planSeleccionado={planSeleccionado}
      />
    </section>
  );
};