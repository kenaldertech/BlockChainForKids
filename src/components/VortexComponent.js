import React from 'react';
import styled, { keyframes } from 'styled-components';

import imageIntro from '../assets/image_intro.jpg';


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
  height: 100vh;
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

const ImageContainer = styled.div`
display: inline-block;
  margin: 30px;
  border-radius: 10px; /* Bordes redondeados */
  width: 250px; /* Ancho deseado del contenedor */
  height: 250px; /* Altura deseada del contenedor */
  overflow: hidden; /* Para asegurar que la imagen no sobresalga del contenedor */
  filter: brightness(1.2); /* Ajusta el brillo de la imagen */
  transition: filter 0.3s ease; /* Transición suave para el efecto de brillo */
  &:hover {
    filter: brightness(1.5); /* Cambia el brillo al pasar el mouse */
  }
  `;



// Componente de React que representa el título del sitio "VORTEx"
const VortexTitle = () => {
  return (
    <VortexComponent>
      <Title>
        VORTEx        
      </Title>
      <Subtitle>by Kenneth Alvarenga</Subtitle>
      
      <ImageContainer>
        <img src={imageIntro} alt="Introducción" />
      </ImageContainer>
    </VortexComponent>
  );
};

export default VortexTitle;
