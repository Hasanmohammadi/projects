import { memo } from "react";
import { IconArgsI } from ".";

function SearchIcon({ className, color = "white", size = 22 }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 26 26"
      fill="none"
      className={className}
    >
      <circle
        cx="11.1053"
        cy="11.1053"
        r="10.1053"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
      <path
        d="M24.1791 23.9156L18.6843 18.4209"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={color}
      />
    </svg>
  );
}

export default memo(SearchIcon);
