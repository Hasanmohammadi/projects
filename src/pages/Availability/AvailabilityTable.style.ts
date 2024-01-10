import { Box, styled } from '@mui/material';

const AvailabilityTableContainer = styled(Box)`
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
` as typeof Box;

export default AvailabilityTableContainer;
