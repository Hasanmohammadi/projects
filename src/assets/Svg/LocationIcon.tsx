import { memo } from "react";
import { IconArgsI } from ".";

function LocationIcon({ className, color = "#9B9B9B", size = 22 }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size - 2}
      height={size}
      viewBox="0 0 14 16"
      fill="none"
      className={className}
    >
      <g opacity="0.8">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.9039 6.47221C12.9039 11.0641 7.00004 15 7.00004 15C7.00004 15 1.09619 11.0641 1.09619 6.47221C1.09619 3.2116 3.73944 0.568359 7.00004 0.568359C10.2607 0.568359 12.9039 3.2116 12.9039 6.47221V6.47221Z"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="7"
          cy="7"
          r="2"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export default memo(LocationIcon);
