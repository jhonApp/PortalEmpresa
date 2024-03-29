import React from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { textEllipsis } from './StyledHelp';

const TextWithEllipsis = ({ text, maxLength, valueWeigth }) => {

  if (text == null) {
    return "";
  }

  let textString = String(text);

  // Verifica se textString é uma string antes de tentar chamar o método trim()
  if (typeof textString === 'string' && textString.trim().length <= maxLength) {
    return (
      <Typography variant="h6" component="span" style={{ fontWeight: valueWeigth, fontSize: 18 }}>
        {textString}
      </Typography>
    );
  }

  const truncatedText = `${textString.slice(0, maxLength)}...`;
  return (
    <Tooltip title={textString} placement="top" arrow>
      <Typography variant="h6" component="span" style={{ ...textEllipsis, fontWeight: valueWeigth, fontSize: 18 }}>
        {truncatedText}
      </Typography>
    </Tooltip>
  );
};

export default TextWithEllipsis;