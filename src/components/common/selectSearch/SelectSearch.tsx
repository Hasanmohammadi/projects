/* eslint-disable react/jsx-props-no-spreading */
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import clsx from "clsx";

import { ChevronDown } from "react-feather";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import SelectSearchContainerStyled from "./SelectSearch.style";

interface SelectSearchPropsI<T extends FieldValues, U> {
  className?: string;
  label?: string;
  placeholder?: string;
  items?: U[];
  name: Path<T>;
  control: Control<T>;
  setTextSearched: React.Dispatch<React.SetStateAction<string>>;
  textSearched: string;
  loading?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  icon?: React.ReactElement;
  initialValue: U[];
  hasBorder?: boolean;
  direction?: "rtl" | "ltr";
}

export default function SelectSearch<T extends FieldValues, U>({
  className,
  label,
  placeholder,
  items,
  name,
  control,
  setTextSearched,
  loading,
  errorMessage,
  disabled,
  textSearched,
  icon,
  hasBorder = true,
  initialValue,
  direction = "ltr",
}: SelectSearchPropsI<T, U>) {
  return (
    <Box className={className}>
      {!!label && (
        <p className="text-sm font-medium mb-2 text-gray-700">{label}</p>
      )}
      <SelectSearchContainerStyled className="cursor-pointer relative">
        <div className="absolute top-2.5 left-3">{icon}</div>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Autocomplete
              className="w-full"
              disabled={disabled}
              {...field}
              placeholder={placeholder}
              id="combo-box-demo"
              options={items || initialValue}
              sx={{
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "1px solid black",
                },
                ".MuiAutocomplete-endAdornment": {
                  position: direction === "rtl" ? "initial" : "absolute",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={placeholder}
                  onChange={(e) => setTextSearched(e.target.value)}
                  value={textSearched}
                  className={clsx({
                    hasIcon: icon,
                    deleteBorder: !hasBorder,
                    "direction-rtl": direction === "rtl",
                  })}
                />
              )}
              popupIcon={
                <ChevronDown
                  className="mt-0.5 cursor-pointer text-gray-500"
                  size={20}
                />
              }
              loading={loading as boolean}
              onChange={(e, data) => field.onChange(data)}
            />
          )}
        />
      </SelectSearchContainerStyled>
      <p className="w-full text-center text-red-600 text-sm">{errorMessage}</p>
    </Box>
  );
}
