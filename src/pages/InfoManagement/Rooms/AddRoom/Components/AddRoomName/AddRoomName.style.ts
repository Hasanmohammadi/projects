import { Box, styled } from '@mui/material';

const AddRoomNameContainer = styled(Box)`
  input {
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    padding: 10px 14px;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    height: 44px;
    max-width: 317px;
  }
  .phone-number-input {
    padding-left: 65px;
  }
  input:focus-visible {
    outline: none;
  }
  fieldset {
    border: none !important;
  }
  .MuiInputBase-root {
    border-radius: 8px;
  }
` as typeof Box;
export default AddRoomNameContainer;
