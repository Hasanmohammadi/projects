import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const SelectSearchContainerStyled = styled(Box)`
  .MuiInputBase-root {
    font-family: IRANSansX;
    padding: 3px;
    border-radius: 8px;
    padding-left: 8px;
  }
  .hasIcon > .MuiInputBase-root {
    padding-left: 40px;
  }
  .deleteBorder > .MuiInputBase-root > fieldset {
    border: none;
  }
  .MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon.MuiAutocomplete-root-fQzWHe
    .MuiOutlinedInput-root {
    padding-right: 45px;
  }
  .direction-rtl > div {
    padding-right: 8px !important;
  }
` as typeof Box;

export default SelectSearchContainerStyled;
