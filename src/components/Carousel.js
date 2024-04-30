import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import image1 from '../assets/chainlink.png';
import image2 from '../assets/chainlink2.png';
import image3 from '../assets/scroll1.png';
import image4 from '../assets/scroll2.png';
import image5 from '../assets/OpenZeppelin.png';

// Imágenes del carrusel
const images = [image1, image2, image3, image4, image5];

const CarouselContainer = styled.div`
margin-bottom: 30px; /* Márgen inferior de 20px */
  overflow: hidden;
  width: 100%; /* Ancho deseado del contenedor */
  height: 300px; /* Alto deseado de las imágenes */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Sombra */
  background: linear-gradient(90deg, #7700DD, #0077DD); /* Gradiente de fondo */
  padding: 1cm 0; /* Espacio de 1cm arriba y abajo de los márgenes */
`;

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.5s ease; /* Transición suave del desplazamiento */
`;

const CarouselImage = styled.img`
  width: 250px; /* Ancho deseado de las imágenes */
  height: 250px; /* Alto deseado de las imágenes */
  object-fit: cover;
`;

// Definir la animación del título
const bounceAnimation = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

// Estilos del título
const Title = styled.h1`
margin:10px;
  font-size: 40px;
  font-family: 'Comic Sans MS';
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
  animation: ${bounceAnimation} 2s infinite; /* Aplicar la animación al título */
`;

const Carousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Función para cambiar la imagen actual
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Efecto para cambiar automáticamente la imagen cada cierto tiempo
  useEffect(() => {
    const interval = setInterval(nextImage, 1500); // Cambia la imagen cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <CarouselContainer>
      <Title>You can win very special NFT prizes!!!</Title>
      <ImageSlider
        style={{ transform: `translateX(-${currentImageIndex * 200}px)` }}
      >
        {/* Duplica las imágenes para que el carrusel se repita infinitamente */}
        {images.map((image, index) => (
          <CarouselImage key={index} src={image} alt={`Image ${index + 1}`} />
        ))}
        {images.map((image, index) => (
          <CarouselImage key={index + images.length} src={image} alt={`Image ${index + 1}`} />
        ))}
      </ImageSlider>



    </CarouselContainer>
  );
};

export default Carousel;
