import { Box, styled } from '@mui/material';

const CopyPriceModalStyleContainer = styled(Box)`
  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #98a2b3;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
` as typeof Box;

export default CopyPriceModalStyleContainer;
