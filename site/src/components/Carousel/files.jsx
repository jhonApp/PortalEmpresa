import { useState, useEffect } from 'react';
import { Paper } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function Test3({ attachment }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Verifica se o attachment é uma lista antes de processá-lo
    if (Array.isArray(attachment) && attachment.length > 0) {
      const loadImages = async () => {
        const loadedImages = [];
        for (const anexo of attachment) {
          const image = await loadImage(anexo);
          loadedImages.push(image);
        }
        setImages(loadedImages);
      };
      loadImages();
    }
  }, [attachment]);

  const loadImage = async (anexo) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
  
      // Verifica se o anexo é um objeto com dados de imagem
      if (anexo.data) {
        const imageData = anexo.data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        img.src = `data:${anexo.type};base64,${imageData}`;
      } else {
        // Se não for um objeto com dados de imagem, assume que é um URL direto
        img.src = anexo;
      }
    });
  };
  

  return (
    <div className="Example3" style={{ maxWidth: "715px", padding: "20px", marginTop: "30px", color: "#494949" }}>
      <Carousel animation="fade" navButtonsAlwaysVisible autoPlay={false}>
        {images.map((image, index) => (
          <Paper key={index} style={{ justifyContent: "center", display: "flex", boxShadow: 'none', height: 500 }} className="HeightItem">
            <img src={image.src} alt="Anexo" style={{ maxWidth: '100%', maxHeight: '550px' }} />
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}