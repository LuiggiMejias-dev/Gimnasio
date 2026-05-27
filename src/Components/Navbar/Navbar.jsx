import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { HorariosModal } from './HorariosModal'; 
import styles from './Navbar.module.css';

export const Navbar = ({ setVistaActiva, vistaActiva }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div 
          className={styles.logo} 
          onClick={() => setVistaActiva('inicio')} 
          style={{ cursor: 'pointer' }}
        >
          <Dumbbell size={24} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
          FIT<span>ZONE</span>
        </div>
        
        <ul className={styles.navLinks}>
          {/* Enlace Inicio */}
          <li>
            <a 
              href="#inicio" 
              className={vistaActiva === 'inicio' ? styles.activeLink : ''}
              onClick={(e) => {
                e.preventDefault();
                setVistaActiva('inicio');
              }}
            >
              Inicio
            </a>
          </li>
          
          {/* Enlace Clases */}
          <li>
            <a 
              href="#clases" 
              className={vistaActiva === 'clases' ? styles.activeLink : ''}
              onClick={(e) => {
                e.preventDefault();
                setVistaActiva('clases');
              }}
            >
              Clases
            </a>
          </li>

          {/* Enlace Tienda (Nuevo) */}
          <li>
            <a 
              href="#tienda" 
              className={vistaActiva === 'tienda' ? styles.activeLink : ''}
              onClick={(e) => {
                e.preventDefault();
                setVistaActiva('tienda');
              }}
            >
              Tienda
            </a>
          </li>
          
          {/* Enlace Precios */}
          <li>
            <a 
              href="#precios" 
              className={vistaActiva === 'precios' ? styles.activeLink : ''}
              onClick={(e) => {
                e.preventDefault();
                setVistaActiva('precios');
              }}
            >
              Precios
            </a>
          </li>

          {/* Botón Horarios */}
          <li>
            <a 
              href="#horarios" 
              role="button"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              Horarios
            </a>
          </li>
        </ul>

        <div className={styles.navActions}>
          <button className={styles.joinButton}>Socio VIP</button>
        </div>
      </nav>

      <HorariosModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};