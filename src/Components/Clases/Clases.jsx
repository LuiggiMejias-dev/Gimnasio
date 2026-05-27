import React, { useState } from 'react';
import { Dumbbell, Users, Activity, Flame, Clock, User, ChevronRight } from 'lucide-react';
import { CuposModal } from './CuposModal'; // Importación del modal
import styles from './Clases.module.css';

export const Clases = () => {
  // 1. Estado para controlar la categoría activa en el filtro
  const [filtroActivo, setFiltroActivo] = useState('Todos');

  // Estados para controlar la visibilidad del modal y la clase seleccionada
  const [modalOpen, setModalOpen] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  const listaClases = [
    {
      id: 1,
      disciplina: 'Crossfit',
      categoria: 'Fuerza', // Simplificado para que el filtro matchee exacto
      categoriaLabel: 'Fuerza & Alta Intensidad', // Lo que ve el usuario en la tarjeta
      horario: 'Lun-Vie: 06:00 AM / 07:00 PM',
      coach: 'Carlos Mendoza',
      icon: <Flame size={18} />,
      descripcion: 'Supera tus límites con entrenamientos funcionales de alta intensidad combinando halterofilia y gimnasia.'
    },
    {
      id: 2,
      disciplina: 'Power Lifting',
      categoria: 'Fuerza',
      categoriaLabel: 'Fuerza Pura',
      horario: 'Lun-Mie-Vie: 08:00 PM',
      coach: 'Marcos Torres',
      icon: <Dumbbell size={18} />,
      descripcion: 'Enfocado en perfeccionar la técnica y romper tus récords personales en sentadilla, press banca y peso muerto.'
    },
    {
      id: 3,
      disciplina: 'Spinning Pro',
      categoria: 'Cardio',
      categoriaLabel: 'Cardio & Resistencia',
      horario: 'Mar-Jue: 07:00 AM / 06:00 PM',
      coach: 'Ana Ruiz',
      icon: <Activity size={18} />,
      descripcion: 'Sesiones de ciclismo de alta energía diseñadas para quemar calorías, mejorar tu resistencia cardiovascular y ritmo.'
    },
    {
      id: 4,
      disciplina: 'Functional Training',
      categoria: 'Quema de Grasa',
      categoriaLabel: 'Quema de Grasa',
      horario: 'Lun a Vie: 08:00 AM / 05:00 PM',
      coach: 'Lucía Gómez',
      icon: <Users size={18} />,
      descripcion: 'Movimientos multiarticulares dinámicos adaptados a todos los niveles para mejorar la agilidad, fuerza y estabilidad.'
    }
  ];

  // Listado único de categorías para renderizar la botonera
  const categoriasFiltro = ['Todos', 'Fuerza', 'Cardio', 'Quema de Grasa'];

  // 2. Filtrado lógico del array antes de mapearlo
  const clasesFiltradas = filtroActivo === 'Todos'
    ? listaClases
    : listaClases.filter(clase => clase.categoria === filtroActivo);

  // Función para abrir el modal con la clase seleccionada
  const abrirModalCupos = (clase) => {
    setClaseSeleccionada(clase);
    setModalOpen(true);
  };

  return (
    <section id="clases" className={styles.clasesSection}>
      <div className={styles.container}>
        
        {/* Encabezado de la Sección */}
        <div className={styles.header}>
          <span className={styles.tagline}>Entrenamientos grupales</span>
          <h2 className={styles.title}>Nuestras Disciplinas</h2>
          <p className={styles.subtitle}>
            Clases guiadas por profesionales diseñadas para llevar tu rendimiento físico y mental al siguiente nivel.
          </p>
        </div>

        {/* 3. Botonera de Filtros Minimalista */}
        <div className={styles.filterBar}>
          {categoriasFiltro.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filtroActivo === cat ? styles.filterBtnActive : ''}`}
              onClick={() => setFiltroActivo(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Clases Dinámico */}
        <div className={styles.clasesGrid}>
          {clasesFiltradas.map((clase) => (
            <div key={clase.id} className={styles.claseCard}>
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {clase.icon}
                </div>
                <span className={styles.categoriaTag}>{clase.categoriaLabel}</span>
              </div>

              <h3 className={styles.claseTitle}>{clase.disciplina}</h3>
              <p className={styles.claseDesc}>{clase.descripcion}</p>

              <div className={styles.metaData}>
                <div className={styles.metaItem}>
                  <Clock size={14} className={styles.metaIcon} />
                  <span>{clase.horario}</span>
                </div>
                <div className={styles.metaItem}>
                  <User size={14} className={styles.metaIcon} />
                  <span>Coach: {clase.coach}</span>
                </div>
              </div>

              {/* Botón con el evento onClick configurado correctamente */}
              <button 
                className={styles.bookBtn}
                onClick={() => abrirModalCupos(clase)}
              >
                Ver Cupos Disponibles <ChevronRight size={14} className={styles.arrowIcon} />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* El modal ahora está correctamente ubicado dentro del return y de la etiqueta de la sección */}
      <CuposModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        clase={claseSeleccionada} 
      />
    </section>
  );
};