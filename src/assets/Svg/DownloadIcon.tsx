import { memo } from "react";
import { IconArgsI } from ".";

function DownloadIcon({ className, color = "#9B9B9B" }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      className={className}
    >
      <path
        d="M1 12V17C1 18.1046 1.89543 19 3 19L19 19C20.1046 19 21 18.1046 21 17V12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 9L11 13L15 9"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 13L11 1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(DownloadIcon);
