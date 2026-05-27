import React, { useState, useEffect } from 'react';
import { Clock, X, Calendar, BarChart3, AlertCircle } from 'lucide-react';
import styles from './HorariosModal.module.css';

export const HorariosModal = ({ isOpen, onClose }) => {
  // 1. DECLARACIÓN DE HOOKS (Siempre al inicio)
  const [statusInfo, setStatusInfo] = useState({ status: 'Cerrado', message: '', isFeriado: false });

  useEffect(() => {
    const checkStatus = () => {
      const ahora = new Date();
      const dia = ahora.getDay(); // 0: Domingo, 1: Lunes, ..., 6: Sábado
      const horaActual = ahora.getHours();
      const minutosActuales = ahora.getMinutes();
      const tiempoEnMinutos = horaActual * 60 + minutosActuales;

      const esFeriadoEspecial = false; 

      if (esFeriadoEspecial) {
        setStatusInfo({
          status: 'Feriado',
          message: 'Horario Especial Feriado: 08:00 AM - 01:00 PM',
          isFeriado: true
        });
        return;
      }

      // Domingo
      if (dia === 0) {
        setStatusInfo({ status: 'Cerrado', message: 'Hoy no se chambea. ¡A descansar!', isFeriado: false });
      } 
      // Sábado (8:00 AM a 5:00 PM -> 480 min a 1020 min)
      else if (dia === 6) {
        if (tiempoEnMinutos >= 480 && tiempoEnMinutos < 1020) {
          const minutosRestantes = 1020 - tiempoEnMinutos;
          const horasFaltantes = Math.floor(minutosRestantes / 60);
          setStatusInfo({
            status: 'Abierto',
            message: `Cierra en ${horasFaltantes > 0 ? `${horasFaltantes}h` : ''} ${minutosRestantes % 60} min`,
            isFeriado: false
          });
        } else {
          setStatusInfo({ status: 'Cerrado', message: 'Abre el Lunes a las 8:00 AM', isFeriado: false });
        }
      } 
      // Lunes a Viernes (8:00 AM a 10:00 PM -> 480 min a 1320 min)
      else {
        if (tiempoEnMinutos >= 480 && tiempoEnMinutos < 1320) {
          const minutosRestantes = 1320 - tiempoEnMinutos;
          const horasFaltantes = Math.floor(minutosRestantes / 60);
          setStatusInfo({
            status: 'Abierto',
            message: `Cierra en ${horasFaltantes > 0 ? `${horasFaltantes}h` : ''} ${minutosRestantes % 60} min`,
            isFeriado: false
          });
        } else {
          setStatusInfo({ status: 'Cerrado', message: 'Abre mañana a las 8:00 AM', isFeriado: false });
        }
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  // 2. RETORNO CONDICIONAL (Evita el error de orden de Hooks)
  if (!isOpen) return null;

  // 3. DATOS DE AFLUENCIA
  const horasPico = [
    { hora: '8 AM', porcentaje: 40 },
    { hora: '10 AM', porcentaje: 25 },
    { hora: '12 PM', porcentaje: 50 },
    { hora: '4 PM', porcentaje: 65 },
    { hora: '7 PM', porcentaje: 95 },
    { hora: '9 PM', porcentaje: 30 }
  ];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeButton} onClick={onClose} aria-label="Cerrar">
          <X size={18} />
        </button>

        {/* Badge Dinámico en Tiempo Real */}
        <div className={styles.header}>
          <div className={`${styles.statusBadge} ${styles[statusInfo.status.toLowerCase()]}`}>
            <span className={styles.pulseDot}></span>
            {statusInfo.status} • {statusInfo.message}
          </div>
          <h3 className={styles.title}>Nuestros Horarios</h3>
        </div>

        {/* Bloques de Horarios (Estructura de 3 tarjetas) */}
        <div className={styles.scheduleGrid}>
          <div className={styles.scheduleCard}>
            <div className={styles.cardHeader}>
              <Calendar size={14} className={styles.iconAccent} />
              <h4>Lunes a Viernes</h4>
            </div>
            <span className={styles.timeHighlight}>08:00 AM - 10:00 PM</span>
          </div>

          <div className={styles.scheduleCard}>
            <div className={styles.cardHeader}>
              <Calendar size={14} className={styles.iconAccent} />
              <h4>Sábados</h4>
            </div>
            <span className={styles.timeHighlight}>08:00 AM - 05:00 PM</span>
          </div>

          {/* Tarjeta explícita de Domingo */}
          <div className={`${styles.scheduleCard} ${styles.domingoCard}`}>
            <div className={styles.cardHeader}>
              <Calendar size={14} className={styles.iconDanger} />
              <h4>Domingos</h4>
            </div>
            <span className={styles.closedText}>No atendemos (Cerrado)</span>
          </div>
        </div>

        {/* Sección Fija de Horas Pico (Sin pestañas, más limpio) */}
        <div className={styles.chartSection}>
          <div className={styles.chartTitle}>
            <BarChart3 size={14} className={styles.iconAccent} />
            <h4>Afluencia Estimada (Horas Pico)</h4>
          </div>
          <p className={styles.chartDescription}>Planifica tu entrenamiento evitando las horas con mayor concurrencia.</p>
          
          <div className={styles.barChart}>
            {horasPico.map((item, idx) => (
              <div key={idx} className={styles.chartColumn}>
                <div className={styles.barContainer}>
                  <div 
                    className={`${styles.barFill} ${item.porcentaje > 80 ? styles.barHigh : ''}`} 
                    style={{ height: `${item.porcentaje}%` }}
                  >
                    <span className={styles.barTooltip}>{item.porcentaje}%</span>
                  </div>
                </div>
                <span className={styles.barLabel}>{item.hora}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Informativo */}
        <div className={styles.modalFooter}>
          <AlertCircle size={12} />
          <p>Los feriados nacionales operamos en horario reducido de 8 AM a 1 PM.</p>
        </div>

      </div>
    </div>
  );
};