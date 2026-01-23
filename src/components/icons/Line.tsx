type Props = {
  className?: string
}

export default function Line({ className }: Props) {
  return (
    <svg
      viewBox="0 0 2 100"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <line
        x1="1"
        y1="1"
        x2="1"
        y2="99"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}