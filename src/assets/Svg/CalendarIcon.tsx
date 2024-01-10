import { memo } from "react";
import { IconArgsI } from ".";

function CalendarIcon({ className, color = "#9B9B9B", size = 16 }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size - 1}
      height={size}
      viewBox="0 0 15 16"
      fill="none"
      className={className}
    >
      <rect
        x="1"
        y="2"
        width="12.6"
        height="12.6"
        rx="2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 1V3.8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 1V3.8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 6H13.6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(CalendarIcon);
