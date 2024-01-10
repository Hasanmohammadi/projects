import { memo } from "react";
import { IconArgsI } from ".";

function PhoneIcon({ className, color = "#9B9B9B", size = 22 }: IconArgsI) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 22 22"
      fill="none"
      className={className}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M21 15.9201V18.9201C21.0023 19.4832 20.767 20.0213 20.3521 20.402C19.9371 20.7827 19.3809 20.9708 18.82 20.9201C15.7428 20.5857 12.787 19.5342 10.19 17.8501C7.77383 16.3148 5.72534 14.2663 4.19 11.8501C2.49998 9.2413 1.44824 6.27109 1.12 3.1801C1.06947 2.62097 1.25627 2.06635 1.63477 1.65172C2.01326 1.23709 2.5486 1.00063 3.11 1.0001H6.11C7.11387 0.990218 7.9695 1.72607 8.11 2.7201C8.23662 3.68016 8.47145 4.62283 8.81 5.5301C9.08474 6.26097 8.90902 7.0849 8.36 7.6401L7.09 8.9101C8.51356 11.4136 10.5865 13.4865 13.09 14.9101L14.36 13.6401C14.9152 13.0911 15.7391 12.9154 16.47 13.1901C17.3773 13.5286 18.3199 13.7635 19.28 13.8901C20.2856 14.032 21.0252 14.9049 21 15.9201Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default memo(PhoneIcon);
