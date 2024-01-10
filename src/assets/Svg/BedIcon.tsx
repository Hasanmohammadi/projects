import { memo } from "react";
import { IconArgsI } from ".";

function BedIcon({ className, color = "#9B9B9B", size = 24 }: IconArgsI) {
  return (
    <svg
      width={(size as number) + 3}
      height={size}
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g style={{ mixBlendMode: "multiply" }}>
        <rect
          x="1.08337"
          y="11.5"
          width="23.8333"
          height="5.75"
          rx="1"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M1.08337 4.79199V20.1253"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M24.9166 15.333V20.1247"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M6.5 11.5V17.25"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M2.87078 7.66699H7.95161C8.42882 7.6818 8.87921 7.8659 9.20123 8.17781C9.52324 8.48971 9.68978 8.90315 9.66328 9.32491V9.80408C9.69373 10.6686 8.92876 11.3924 7.95161 11.4237H2.87078C1.89363 11.3924 1.12866 10.6686 1.15911 9.80408V9.32491C1.13261 8.90315 1.29915 8.48971 1.62116 8.17781C1.94318 7.8659 2.39357 7.6818 2.87078 7.66699V7.66699Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default memo(BedIcon);
