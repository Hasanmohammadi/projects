import { Box, styled } from '@mui/material';

interface ButtonPropsI {
  primary?: string;
  secondary?: string;
}

const TabsStyledContainer = styled(Box)<ButtonPropsI>`
  .ejSmPP {
    font-weight: 500;
    font-size: 14px;
    text-transform: capitalize;
  }
  .sc-bcXHqe {
    padding: 0;
  }

  .Mui-selected {
    color: ${(props: ButtonPropsI) => props.primary};
  }

  .MuiTabs-indicator {
    background-color: ${(props: ButtonPropsI) => props.primary};
  }

  .tabs-position-center > .MuiTabs-scroller > .MuiTabs-flexContainer {
    place-content: center;
  }
  .tabs-position-end > .MuiTabs-scroller > .MuiTabs-flexContainer {
    place-content: end;
  }
` as typeof Box;

export default TabsStyledContainer;
