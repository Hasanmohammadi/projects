import { memo } from "react";
import { IconArgsI } from ".";

function MinusCircleIcon({
  className,
  color = "#FFC107",
  size = 22,
}: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      className={className}
    >
      <circle
        cx="9"
        cy="9"
        r="8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.80005 9H12.2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(MinusCircleIcon);
