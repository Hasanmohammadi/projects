import { Box, styled } from '@mui/material';

const TableTreeStyledContainer = styled(Box)`
  td {
    min-width: 180px;
  }

  th {
    padding: 12px 16px;
    color: #667085;
    background: #f9fafb;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
  }

  .sub-td {
    align-items: center;
    padding: 16px;
    background: #f9fafb;
    border-bottom: none;
    margin-top: 6px;
  }

  .eXkqnt {
    background: #f9fafb;
  }

  .sub-td-container {
    padding: 0;
  }

  .more {
    display: flex;
    flex-direction: row-reverse;
    padding-right: 35px;
  }

  .header {
    box-shadow: 0px 1px 3px 0px rgb(0 0 0 / 12%);
  }

  .first-col {
    min-width: 380px;
  }
` as typeof Box;

export default TableTreeStyledContainer;
