import { SxProps, Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import clsx from "clsx";

import RadioButtonStyled from "./RadioButton.style";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface RadioButtonPropsI<T extends FieldValues> {
  className?: string;
  sx?: SxProps<Theme>;
  defaultValue?: string | Path<T>;
  label?: string;
  grid?: boolean;
  radios?: {
    value: string;
    radioText: string | React.ReactNode;
    size?: "small" | "medium";
    children?: React.ReactNode;
    className?: string;
  }[];
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string
  ) => void;
  value?: string;
  name: Path<T>;
  control: Control<T>;
}

export default function RadioButton<T extends FieldValues>({
  className,
  label,
  radios,
  defaultValue,
  onChange,
  grid,
  sx,
  value,
  control,
  name,
}: RadioButtonPropsI<T>) {
  return (
    <RadioButtonStyled className={className} component="div">
      <FormControl className="w-full">
        {label && (
          <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={defaultValue}
              className={clsx("w-full", { grid })}
              sx={sx}
              {...field}
            >
              {radios?.map(
                ({
                  value: radioValue,
                  radioText,
                  size,
                  children,
                  className: radioClassName,
                }) => (
                  <div className={radioClassName} key={radioValue}>
                    <FormControlLabel
                      value={radioValue}
                      control={<Radio size={size} />}
                      label={radioText}
                    />
                    {children}
                  </div>
                )
              )}
            </RadioGroup>
          )}
        />
      </FormControl>
    </RadioButtonStyled>
  );
}
