import React from 'react';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import { textEllipsis } from './StyledHelp';

const TextWithEllipsis = ({ text, maxLength }) => {
  const truncatedText = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <Tooltip title={text} placement="top" arrow>
      <Typography variant="h6" component="span" style={{ ...textEllipsis, fontWeight: 600, fontSize: 18 }}>
        {truncatedText}
      </Typography>
    </Tooltip>
  );
};

export default TextWithEllipsis;