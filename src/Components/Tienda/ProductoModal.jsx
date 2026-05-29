import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Plus, Minus, ShieldCheck, Tag } from 'lucide-react';
import styles from './ProductoModal.module.css';

export const ProductoModal = ({ isOpen, onClose, producto }) => {
  const [cantidad, setCantidad] = useState(1);

  // Reiniciar la cantidad a 1 cada vez que cambie de producto
  useEffect(() => {
    if (isOpen) setCantidad(1);
  }, [isOpen, producto]);

  if (!isOpen || !producto) return null;

  // LÓGICA DE PRECIOS Y DESCUENTOS
  const precioNumerico = parseInt(producto.precio.replace('S/', '').trim());
  const tieneDescuento = cantidad >= 2;
  
  // Si lleva 2 o más, aplicamos 10% de descuento
  const porcentajeDescuento = 0.10; 
  const precioSubtotal = precioNumerico * cantidad;
  const montoDescuento = tieneDescuento ? precioSubtotal * porcentajeDescuento : 0;
  const precioFinalTotal = Math.round(precioSubtotal - montoDescuento);

  // Configuración de WhatsApp
  const WHATSAPP_NUMERO = '51999999999'; // Cambia por tu número real de FitZone

  const handleConsultar = () => {
    let detalleDescuento = '';
    if (tieneDescuento) {
      detalleDescuento = `\n🎁 *¡Aplica Descuento Especial del 10%!* (Ahorro: S/ ${Math.round(montoDescuento)} PEN)`;
    }

    const mensajeOriginal = `¡Hola FitZone! Me interesa adquirir el producto *${producto.nombre}* (${producto.categoria}).\n\n- *Cantidad:* ${cantidad} unidades.${detalleDescuento}\n- *Total final a pagar:* S/ ${precioFinalTotal} PEN.\n\n¿Tienen stock disponible en barra para recogerlo hoy?`;
    const mensajeCodificado = encodeURIComponent(mensajeOriginal);
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMERO}?text=${mensajeCodificado}`;
    
    window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {/* Botón Cerrar */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="Cerrar modal">
          <X size={20} />
        </button>

        <div className={styles.modalBody}>
          {/* Lado Izquierdo: Visual de Imagen */}
          <div className={styles.imageSection}>
            <span className={styles.categoryTag}>{producto.categoria}</span>
            <img src={producto.imagen} alt={producto.nombre} className={styles.modalImg} />
          </div>

          {/* Lado Derecho: Detalles */}
          <div className={styles.infoSection}>
            <span className={styles.brandName}>{producto.marca}</span>
            <h3 className={styles.productName}>{producto.nombre}</h3>
            
            <div className={styles.priceContainer}>
              <span className={styles.label}>Precio Unitario:</span>
              <span className={styles.price}>{producto.precio} <span className={styles.currency}>PEN</span></span>
            </div>

            <hr className={styles.divider} />

            {/* Selector de Cantidad */}
            <div className={styles.quantitySection}>
              <div className={styles.quantityLeft}>
                <span className={styles.sectionLabel}>Seleccionar Cantidad</span>
                <span className={styles.promoHint}>Lleva 2 o más y obtén 10% desc.</span>
              </div>
              
              <div className={styles.counterWrapper}>
                <button 
                  className={styles.counterBtn} 
                  onClick={() => setCantidad(prev => Math.max(1, prev - 1))}
                  disabled={cantidad <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className={styles.quantityNumber}>{cantidad}</span>
                <button 
                  className={styles.counterBtn} 
                  onClick={() => setCantidad(prev => prev + 1)}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Caja de Garantía / Aviso de Descuento Dinámico */}
            {tieneDescuento ? (
              <div className={styles.promoActiveBox}>
                <Tag size={16} className={styles.promoIcon} />
                <span>¡Promoción Activada! Se aplicó un 10% de descuento por volumen.</span>
              </div>
            ) : (
              <div className={styles.guaranteeBox}>
                <ShieldCheck size={16} className={styles.shieldIcon} />
                <span>Producto original sellado con lote verificado.</span>
              </div>
            )}

            {/* Footer con Precios Tachados si aplica */}
            <div className={styles.modalFooter}>
              <div className={styles.totalWrapper}>
                <span className={styles.totalLabel}>Total a Pagar:</span>
                <div className={styles.totalPriceContainer}>
                  {tieneDescuento && (
                    <span className={styles.oldPrice}>S/ {precioSubtotal}</span>
                  )}
                  <span className={styles.totalPrice}>S/ {precioFinalTotal}</span>
                </div>
              </div>

              <button className={styles.whatsappBtn} onClick={handleConsultar}>
                <MessageCircle size={18} /> Pedir por WhatsApp
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};