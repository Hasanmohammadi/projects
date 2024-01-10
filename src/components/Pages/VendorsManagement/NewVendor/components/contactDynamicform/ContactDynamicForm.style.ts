import { Box, styled } from '@mui/material';

const ContactDynamicFormContainer = styled(Box)`
  input {
    border-radius: 8px;
    border: 1px solid #d0d5dd;
    padding: 10px 14px;
    width: 244px;
    font-weight: 400;
    font-size: 16px;
    height: 44px;
  }
  input:focus-visible {
    outline: none;
  }
  .MuiInputBase-root {
    position: absolute;
  }
  fieldset {
    border: none !important;
  }
` as typeof Box;
export default ContactDynamicFormContainer;
