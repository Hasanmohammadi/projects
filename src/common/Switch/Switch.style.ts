import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const SwitchStyledContainer = styled(Box)`
  .MuiSwitch-track {
    height: 26px;
    border-radius: 26px;
  }
  .MuiButtonBase-root {
    top: 6px;
    left: 7px;
    color: #ffffff;
  }
  .MuiButtonBase-root.Mui-checked {
    left: 5px;
  }
  .MuiSwitch-root {
    width: 70px;
  }
  .iKbKBS.Mui-checked + .MuiSwitch-track {
    opacity: 1;
  }
  &.disabled > .MuiSwitch-root > .iKbKBS.Mui-checked + .MuiSwitch-track {
    background-color: #ffa27d;
  }

  .Mui-checked.Mui-disabled {
    color: white;
  }
` as typeof Box;

export default SwitchStyledContainer;
