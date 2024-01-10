import { Box, styled } from '@mui/material';

const PriceTableContainer = styled(Box)`
  [disabled] {
    color: #98a2b3;
    background: white;
  }
  .first-col-dates[disabled] {
    color: #344054;
  }
  .first-col[disabled] {
    color: #667085;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
` as typeof Box;

export default PriceTableContainer;
