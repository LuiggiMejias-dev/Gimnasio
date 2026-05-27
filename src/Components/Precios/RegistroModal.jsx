import React, { useState } from 'react';
import { X, User, Mail, Phone, ArrowRight } from 'lucide-react';
import styles from './RegistroModal.module.css';

export const RegistroModal = ({ isOpen, onClose, planSeleccionado }) => {
  // Si el modal no está abierto o no hay un plan seleccionado, no renderiza nada
  if (!isOpen || !planSeleccionado) return null;

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes conectar tu base de datos o API en el futuro
    console.log('Registro para el plan:', planSeleccionado.nombre, formData);
    
    alert(`¡Felicidades! Te has registrado en el ${planSeleccionado.nombre}. Nos comunicaremos contigo al número ${formData.telefono} muy pronto.`);
    onClose(); // Cierra el modal automáticamente
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* Botón de cerrar (X) */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        {/* Encabezado dinámico */}
        <div className={styles.header}>
          <span className={styles.planBadge}>{planSeleccionado.nombre}</span>
          <h3 className={styles.title}>Estás a un paso de iniciar</h3>
          <p className={styles.subtitle}>
            Completa tus datos para procesar tu registro al plan de <span className={styles.priceHighlight}>{planSeleccionado.precio}</span>.
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nombre">Nombre Completo</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                placeholder="Juan Pérez"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="correo">Correo Electrónico</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input
                type="email"
                id="correo"
                name="correo"
                required
                placeholder="juan@ejemplo.com"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="telefono">Número de Celular</label>
            <div className={styles.inputWrapper}>
              <Phone size={18} className={styles.inputIcon} />
              <input
                type="tel"
                id="telefono"
                name="telefono"
                required
                placeholder="999 999 999"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirmar Registro <ArrowRight size={16} />
          </button>
        </form>

      </div>
    </div>
  );
};