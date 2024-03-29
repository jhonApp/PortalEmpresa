import { css } from '@mui/system';

const textEllipsis = css`
  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    font-family: Roboto;
  }
`;

export { textEllipsis };