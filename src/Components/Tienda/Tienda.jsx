import React, { useState } from 'react';
import { Zap, Shield, Sparkles, Star, ShoppingBag } from 'lucide-react';
import { ProductoModal } from './ProductoModal'; // Importamos el nuevo modal
import styles from './Tienda.module.css';

import imgProteina from '/src/assets/proteina.png';
import imgCreatina from '/src/assets/creatina.png';
import imgVitaminas from '/src/assets/vitaminas.png';

export const Tienda = () => {
  // Estados para controlar la apertura del modal y el producto activo
  const [modalOpen, setModalOpen] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: '100% Whey Protein',
      marca: 'Optimum Performance',
      categoria: 'Proteínas',
      precio: 'S/ 249',
      tag: 'Más Vendido',
      imagen: imgProteina, 
      icon: <Sparkles size={16} />,
      beneficios: ['24g de proteína pura', 'Acelera la recuperación', 'Bajo en carbohidratos'],
    },
    {
      id: 2,
      nombre: 'Creatina Monohidratada',
      marca: 'Pure Power',
      categoria: 'Fuerza',
      precio: 'S/ 119',
      tag: 'Calidad Premium',
      imagen: imgCreatina, 
      icon: <Zap size={16} />,
      beneficios: ['100% Micronizada (5g por scoop)', 'Aumenta la fuerza explosiva', 'Mejora el rendimiento'],
    },
    {
      id: 3,
      nombre: 'Multivitamínico Sports Pack',
      marca: 'VitaZone Labs',
      categoria: 'Vitaminas',
      precio: 'S/ 89',
      tag: 'Salud',
      imagen: imgVitaminas, 
      icon: <Shield size={16} />,
      beneficios: ['Complejo A, C, D3 y Zinc', 'Refuerza el sistema inmune', 'Mayor energía diaria'],
    }
  ];

  // Función al pulsar Adquirir en cualquier tarjeta
  const handleOpenModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  return (
    <section id="tienda" className={styles.tiendaSection}>
      <div className={styles.container}>
        
        {/* Encabezado */}
        <div className={styles.header}>
          <span className={styles.tagline}>Suplementación Oficial</span>
          <h2 className={styles.title}>Nutrición & Rendimiento</h2>
          <p className={styles.subtitle}>
            Optimiza tus resultados con suplementos seleccionados de la más alta calidad y pureza certificada.
          </p>
        </div>

        {/* Grid de Productos */}
        <div className={styles.productosGrid}>
          {productos.map((prod) => (
            <div key={prod.id} className={styles.productCard}>
              
              <div className={styles.cardHeader}>
                <span className={styles.productTag}>
                  {prod.icon} {prod.tag}
                </span>
                <span className={styles.categoryName}>{prod.categoria}</span>
              </div>

              <div className={styles.imageWrapper}>
                <img src={prod.imagen} alt={prod.nombre} className={styles.productImage} />
              </div>

              <div className={styles.infoBox}>
                <h3 className={styles.productName}>{prod.nombre}</h3>
                
                <ul className={styles.benefitsList}>
                  {prod.beneficios.map((ben, idx) => (
                    <li key={idx}>
                      <Star size={10} className={styles.starIcon} /> {ben}
                    </li>
                  ))}
                </ul>

                <div className={styles.footerBox}>
                  <div className={styles.priceWrapper}>
                    <span className={styles.price}>{prod.precio}</span>
                    <span className={styles.currency}>PEN</span>
                  </div>

                  {/* El botón ahora abre el modal pasando la info del producto */}
                  <button 
                    className={styles.buyBtn}
                    onClick={() => handleOpenModal(prod)}
                  >
                    <ShoppingBag size={14} className={styles.buyIcon} /> Adquirir
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Render del Modal de Producto */}
      <ProductoModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        producto={productoSeleccionado} 
      />
    </section>
  );
};