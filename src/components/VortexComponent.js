import React from 'react';
import styled, { keyframes } from 'styled-components';
import '../App.css';
import imageIntro from '../assets/intro_image_redu.png';



// Definir un keyframe para animar los colores de fondo
const backgroundAnimation = keyframes`
  0% { background-color: #7700DD; }
  50% { background-color: #0077DD; }
  100% { background-color: #7700DD; }
`;

// Estilo para el componente del título
const Title = styled.h1`
  font-family: sans-serif;
  font-size: 3rem;
  color: #ffffff; /* Color del texto blanco */
`;

// Estilo para el componente del título
const Subtitle = styled.h2`
  font-family: sans-serif;
  font-size: 1rem;
  family-weight:'100';
  color: #ffff33; /* Color del texto blanco */
`;

// Estilo para el componente principal
const VortexComponent = styled.div`
  width: 100%;
  height: 50%;
  display: inline-block;
  justify-content: center;
  align-items: center;
  background-color: #7700DD; /* Color de fondo inicial */
  animation: ${backgroundAnimation} 10s infinite; /* Aplicar la animación de fondo */

  `;

const Image = styled.img`
object-fit: contain;
  max-width: 100%; /* Establecer el ancho máximo para que la imagen no sea más grande que el contenedor */
  max-height: 100%; /* Establecer la altura máxima para que la imagen no sea más grande que el contenedor */
 /* Ajustar la imagen para que se ajuste completamente al contenedor sin recortarse */
 `;

 const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(5deg); /* Cambia el ángulo de rotación según tu preferencia */
  }
`;

const ImageContainer = styled.div`
  position: relative; /* Para que el pseudo-elemento se posicione relativo a este contenedor */
  display: inline-block;
  margin: 40px;
  margin-bottom:10px;
  border-radius: 10px; /* Bordes redondeados */
  width: 500px; /* Ancho deseado del contenedor */
  height: 500px; /* Altura deseada del contenedor */
  overflow: hidden; /* Para asegurar que la imagen no sobresalga del contenedor */
  filter: brightness(1.2); /* Ajusta el brillo de la imagen */
  transition: filter 0.3s ease, transform 0.3s ease; /* Transición suave para el efecto de brillo y rotación */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  &:hover {
    filter: brightness(1.5); /* Cambia el brillo al pasar el mouse */
    transform: rotate(5deg); /* Aplica la rotación al poner el mouse encima */
  }

  /* Agrega el pseudo-elemento para el efecto de chispa */
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.6) 20%, transparent 60%);
    opacity: 0;
    pointer-events: none; /* Evita que el pseudo-elemento afecte los eventos del mouse */
  }

  /* Define la animación para el efecto de chispa */
  &:hover::after {
    animation: spark-animation 1s infinite linear;
    opacity: 1;
  }

  /* Define la animación para el efecto de chispa */
  @keyframes spark-animation {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;



// Componente de React que representa el título del sitio "VORTEx"
const VortexTitle = () => {
  return (
 
    <VortexComponent>

      
      <ImageContainer>
        <img src={imageIntro} alt="Introducción" />
      </ImageContainer> 

    </VortexComponent>
   
  );
};

export default VortexTitle;
