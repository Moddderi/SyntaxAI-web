interface LogoProps {
  className?: string;
}

export function Logo({ className = 'h-9 w-9' }: LogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill="#00eaff" height="40" rx="10" width="40" />
      <rect
        fill="#0d0d0f"
        height="18"
        rx="4"
        stroke="#00eaff"
        strokeWidth="2"
        width="18"
        x="11"
        y="11"
      />
    </svg>
  );
}
