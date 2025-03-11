import * as React from "react";

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="transition-transform rotate-0 lucide lucide-check duration-600"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export default CheckIcon;
