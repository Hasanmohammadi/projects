import { memo } from "react";
import { IconArgsI } from ".";

function MailIcon({ className, color = "#9B9B9B", size = 22 }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size - 3}
      height={size}
      viewBox="0 0 16 13"
      fill="none"
      className={className}
    >
      <g opacity="0.8">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.4 1H13.6C14.37 1 15 1.63 15 2.4V10.8C15 11.57 14.37 12.2 13.6 12.2H2.4C1.63 12.2 1 11.57 1 10.8V2.4C1 1.63 1.63 1 2.4 1Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 2.40039L8 7.30039L1 2.40039"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default memo(MailIcon);
