import React from 'react';
import { Dumbbell, Trophy, Flame, MapPin, Phone, Mail, Clock } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        {/* Columna 1: Marca (Alineada a la izquierda por defecto) */}
        <div className={styles.brandColumn}>
          <div className={styles.logo}>
            <Dumbbell size={24} />
            FIT<span>ZONE</span>
          </div>
          <p className={styles.description}>
            Optimiza tu rendimiento, mejora tu salud y alcanza tus objetivos con el mejor equipamiento y asesoramiento profesional.
          </p>
          <div className={styles.socials}>
            <Flame size={20} className={styles.socialIcon} title="Comunidad" />
            <Trophy size={20} className={styles.socialIcon} title="Logros" />
          </div>
        </div>

        {/* Columna 2: Horarios (Asigna la clase de centrado) */}
        <div className={styles.columnWrapperCenter}>
          <h3 className={styles.columnTitle}>Horarios</h3>
          <ul className={styles.linksList}>
            <li className={styles.contactItem}>
              <Clock size={16} className={styles.iconAccent} />
              <div>
                <strong>Lunes a Viernes</strong>
                <span className={styles.timeText}>8:00 AM - 10:00 PM</span>
              </div>
            </li>
            <li className={styles.contactItem}>
              <Clock size={16} className={styles.iconAccent} />
              <div>
                <strong>Sábados</strong>
                <span className={styles.timeText}>8:00 AM - 5:00 PM</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Columna 3: Contacto (Asigna la clase de alineación derecha) */}
        <div className={styles.columnWrapperRight}>
          <h3 className={styles.columnTitle}>Contacto</h3>
          <ul className={styles.linksList}>
            <li className={styles.contactItem}>
              <MapPin size={16} className={styles.iconAccent} />
              <span>Av. Fitness 123, Lima</span>
            </li>
            <li className={styles.contactItem}>
              <Phone size={16} className={styles.iconAccent} />
              <span>+51 987 654 321</span>
            </li>
            <li className={styles.contactItem}>
              <Mail size={16} className={styles.iconAccent} />
              <span>contacto@fitzone.com</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Barra de Copyright */}
      <div className={styles.bottomBar}>
        <p>&copy; {currentYear} FITZONE. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};