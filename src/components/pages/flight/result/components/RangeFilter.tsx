import { useFlightSearchResultContext } from "@/context";
import { Box, Slider, styled } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { useState, useEffect } from "react";

interface PriceFilterPropsI {
  currency?: string;
  className?: string;
  minValue: number;
  maxValue: number;
  loading?: boolean;
}

interface PriceFilterStylePropsI {
  primary?: string;
  secondary?: string;
}

const PriceFilterContainerStyled = styled(Box)<PriceFilterStylePropsI>`
  .MuiSlider-root {
    color: ${(props: PriceFilterStylePropsI) => props.primary};
  }
  .MuiSlider-thumb:hover {
    box-shadow: ${(props: PriceFilterStylePropsI) =>
      `0px 0px 0px 8px ${props.secondary as string}`} !important;
  }
  .Mui-active {
    box-shadow: ${(props: PriceFilterStylePropsI) =>
      `0px 0px 0px 8px ${props.secondary as string}`} !important;
  }
` as typeof Box;

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeFilter({
  className,
  currency,
  maxValue,
  minValue,
  loading,
}: PriceFilterPropsI) {
  const { setPriceFilter } = useFlightSearchResultContext();
  const [value, setValue] = useState<number[]>([minValue, maxValue]);

  const handleChange = (_: any, newValue: number | number[]) => {
    setValue(newValue as number[]);
    setPriceFilter(newValue as number[]);
  };

  useEffect(() => {
    setValue([minValue, maxValue]);
  }, [minValue, maxValue]);

  return (
    <PriceFilterContainerStyled className={className}>
      {loading ? (
        <Stack>
          <Skeleton
            variant="text"
            className="w-full"
            sx={{ animationDuration: "0.6s" }}
          />
        </Stack>
      ) : (
        <>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="off"
            getAriaValueText={valuetext}
            min={minValue}
            max={maxValue}
          />
          <div className="flex justify-between flex-row-reverse">
            <span className="text-sm font-medium text-gray-400">
              {value?.[0]?.toLocaleString()}
            </span>
            <span className="text-sm font-medium text-gray-400">
              {value?.[1]?.toLocaleString()}
            </span>
          </div>
        </>
      )}
    </PriceFilterContainerStyled>
  );
}
