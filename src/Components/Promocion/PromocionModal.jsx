import React, { useEffect, useState } from 'react';
import { X, Flame } from 'lucide-react';
import styles from './PromocionModal.module.css';

export const PromocionModal = ({ iniciarContador }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (iniciarContador) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [iniciarContador]);

  if (!isOpen) return null;

  return (
    /* Al darle clic al fondo (overlay), se cierra el modal */
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      
      {/* stopPropagation evita que el modal se cierre si haces clic dentro del cuadro negro */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Botón Cerrar */}
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <X size={18} />
        </button>

        {/* Contenido del Anuncio */}
        <div className={styles.badge}>
          <Flame size={14} /> Oferta Relámpago
        </div>
        
        <h2 className={styles.title}>
          ¡ENTRENA EN DUPLA! <br />
          <span>PROMO 2X1</span>
        </h2>
        
        <p className={styles.description}>
          No entrenes solo. Matricúlate con un amigo este mes y <br />
          <strong>paguen solo una membresía</strong> durante los primeros 30 días.
        </p>

        <div className={styles.actionBox}>
          <button className={styles.claimBtn} onClick={() => setIsOpen(false)}>
            Reclamar 2x1
          </button>
          <span className={styles.countdown}>*Válido solo por hoy</span>
        </div>
      </div>
    </div>
  );
};