import React, { useState, useEffect } from 'react';
import { X, Calendar, User, MessageCircle, Check } from 'lucide-react';
import styles from './CuposModal.module.css';

export const CuposModal = ({ isOpen, onClose, clase }) => {
  // Estado para capturar el turno/horario seleccionado por el usuario
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);

  // Limpiar selección al cerrar/cambiar de clase
  useEffect(() => {
    setTurnoSeleccionado(null);
  }, [isOpen, clase]);

  // Bloquear scroll del fondo
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !clase) return null;

  // Mock de horarios semanales específicos por disciplina
  const horariosSemanales = [
    { id: 't1', dia: 'Lunes a Viernes', hora: '06:00 AM - 07:00 AM', cuposMax: 20, cuposLibres: 12 },
    { id: 't2', dia: 'Lunes a Viernes', hora: '09:00 AM - 10:00 AM', cuposMax: 20, cuposLibres: 19 },
    { id: 't3', dia: 'Lunes a Viernes', hora: '07:00 PM - 08:00 PM', cuposMax: 15, cuposLibres: 2 }, // Pocos cupos
    { id: 't4', dia: 'Sábados', hora: '08:00 AM - 09:30 AM', cuposMax: 25, cuposLibres: 0 }, // Lleno
  ];

  // Lógica de Redirección Automatizada a WhatsApp (Opción 2)
  const manejarReservaWhatsApp = () => {
    if (!turnoSeleccionado) return;

    const numeroTelefono = "51999999999"; // Reemplaza por el WhatsApp de tu gimnasio
    const mensaje = `¡Hola Vitta Gym! 👋 Me interesa reservar un cupo para la clase de *${clase.disciplina}* con el coach *${clase.coach}*.\n\n📅 *Turno seleccionado:* ${turnoSeleccionado.dia}\n⏰ *Horario:* ${turnoSeleccionado.hora}\n\n¿Me podrían confirmar la disponibilidad para asistir? ¡Muchas gracias!`;
    
    // Codificar el texto para la URL de la API de WhatsApp
    const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    
    // Abrir en pestaña nueva
    window.open(urlWhatsApp, '_blank');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBody} onClick={(e) => e.stopPropagation()}>
        
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar">
          <X size={20} />
        </button>

        {/* Cabecera */}
        <div className={styles.header}>
          <span className={styles.tagline}>{clase.categoriaLabel}</span>
          <h3 className={styles.title}>{clase.disciplina}</h3>
          <div className={styles.coachWrapper}>
            <User size={14} />
            <span>Coach: {clase.coach}</span>
          </div>
        </div>

        <p className={styles.instruction}>Selecciona el turno en el que deseas entrenar hoy:</p>

        {/* Horarios Inteligentes con Indicador de Capacidad Sutil */}
        <div className={styles.gridHorarios}>
          {horariosSemanales.map((turno) => {
            const estaLleno = turno.cuposLibres === 0;
            const pocosCupos = turno.cuposLibres <= 3 && turno.cuposLibres > 0;
            const esSeleccionado = turnoSeleccionado?.id === turno.id;

            // Calcular porcentaje de barra de progreso (cupos ocupados)
            const porcentajeOcupado = ((turno.cuposMax - turno.cuposLibres) / turno.cuposMax) * 100;

            return (
              <div 
                key={turno.id} 
                className={`${styles.cardTurno} ${estaLleno ? styles.turnoLleno : ''} ${esSeleccionado ? styles.turnoSeleccionado : ''}`}
                onClick={() => !estaLleno && setTurnoSeleccionado(turno)}
              >
                <div className={styles.turnoHeader}>
                  <span className={styles.diaText}>{turno.dia}</span>
                  <span className={styles.horaText}>{turno.hora}</span>
                </div>

                {/* Info de Disponibilidad e Indicadores */}
                <div className={styles.capacidadWrapper}>
                  <div className={styles.capacidadText}>
                    {estaLleno ? (
                      <span className={styles.statusLleno}>🔴 Clase Llena</span>
                    ) : pocosCupos ? (
                      <span className={styles.statusPocos}>🟡 ¡Últimos {turno.cuposLibres} cupos!</span>
                    ) : (
                      <span className={styles.statusLibre}>🟢 {turno.cuposLibres} / {turno.cuposMax} Disponibles</span>
                    )}
                  </div>
                  
                  {/* Barra de progreso sutil */}
                  <div className={styles.progressBg}>
                    <div 
                      className={`${styles.progressBar} ${estaLleno ? styles.bgLleno : pocosCupos ? styles.bgPocos : styles.bgLibre}`}
                      style={{ width: `${porcentajeOcupado}%` }}
                    />
                  </div>
                </div>

                {esSeleccionado && (
                  <div className={styles.checkIcon}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Acciones Finales */}
        <div className={styles.actions}>
          <button className={styles.backBtn} onClick={onClose}>Cancelar</button>
          <button 
            className={styles.submitBtn} 
            disabled={!turnoSeleccionado}
            onClick={manejarReservaWhatsApp}
          >
            <MessageCircle size={18} />
            {turnoSeleccionado ? 'Reservar por WhatsApp' : 'Selecciona un turno'}
          </button>
        </div>

      </div>
    </div>
  );
};