import { CircularProgress } from "@mui/material";
import ButtonCP from "@mui/material/Button";
import clsx from "clsx";

import ButtonStyledContainer from "./Button.style";

type ButtonType = JSX.IntrinsicElements["button"]["type"];

interface ButtonPropsI {
  children: React.ReactElement | string;
  className?: string;
  type?: ButtonType;
  primaryColor?: string;
  secondaryColor?: string;
  color?:
    | "primary"
    | "ghost"
    | "secondary"
    | "success"
    | "error"
    | "ghost-just-text";
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  containerClassName?: string;
  loading?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}

export default function Buttons({
  children,
  className,
  type = "button",
  color = "primary",
  onClick,
  disabled,
  containerClassName,
  loading,
  size = "md",
  primaryColor,
  secondaryColor,
}: ButtonPropsI) {
  return (
    <>
      {loading ? (
        <div
          className={clsx(
            "text-center items-center",
            containerClassName || className
          )}
        >
          <CircularProgress className="w-full" />
        </div>
      ) : (
        <ButtonStyledContainer
          className={clsx(containerClassName, {
            "disabled cursor-default": disabled,
          })}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          primary={primaryColor}
          secondary={secondaryColor}
          component="div"
        >
          <ButtonCP
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(className, {
              ghost: color === "ghost",
              primary: color === "primary",
              secondary: color === "secondary",
              success: color === "success",
              error: color === "error",
              "ghost-just-text": color === "ghost-just-text",
              "disabled cursor-default": disabled,
              [size]: size,
            })}
          >
            {children}
          </ButtonCP>
        </ButtonStyledContainer>
      )}
    </>
  );
}
