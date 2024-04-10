import { Paper, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";

export default function Test3({ attachment }) {
  return (
    <div className="Example3" style={{ marginTop: "50px", color: "#494949" }}>
      <Carousel animation="fade" navButtonsAlwaysVisible autoPlay={false}>
        {attachment.map((anexo, index) => (
          <Paper key={index} style={{ justifyContent: "center", display: "flex", boxShadow: 'none', height: 500 }} className="HeightItem">
            {anexo.contentType && anexo.contentType.startsWith('image/') ? (
              <img src={`data:${anexo.contentType};base64,${anexo.data}`} alt="Anexo" style={{ maxWidth: '100%', maxHeight: '550px' }} />
            ) : (
              <embed src={`data:${anexo.contentType};base64,${anexo.data}`} type={anexo.contentType} width="100%" height="600px" />
            )}
          </Paper>
        ))}
      </Carousel>
    </div>
  );
}