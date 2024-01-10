import { Box, styled } from "@mui/material";

interface RadioButtonPropsI {
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}

const RadioButtonStyled = styled(Box)<RadioButtonPropsI>`
  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      ". . ."
      ". . ."
      ". . .";
    gap: 14px;
  }
  .MuiFormControlLabel-root {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .MuiButtonBase-root {
    color: #9b9b9b;
  }
  .css-vqmohf-MuiButtonBase-root-MuiRadio-root.Mui-checked {
    color: #ffc107;
  }
  .MuiButtonBase-root:hover {
    background-color: rgb(133 133 133 / 4%);
  }
  .MuiFormControlLabel-root {
    margin: 0;
  }
  .MuiButtonBase-root {
    padding-right: 0px;
  }
  .MuiButtonBase-root:hover {
    background-color: transparent;
  }
  .MuiTouchRipple-root {
    right: -8px;
  }
` as typeof Box;

export default RadioButtonStyled;
