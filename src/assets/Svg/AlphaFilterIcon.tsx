import { memo } from 'react';

function AlphaFilterIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="15"
      viewBox="0 0 19 15"
      fill="none"
      className={className}
    >
      <path
        d="M18.0012 5.36426H13.0918"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0012 1H13.0918"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0012 9.72754H13.0918"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0012 14.0918H13.0918"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.90918 1V14.0918"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.81882 9.18262L4.90941 14.092L0 9.18262"
        stroke="#808080"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(AlphaFilterIcon);
