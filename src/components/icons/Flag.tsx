import { SVGProps } from 'react'
const Flag = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className="flag"
    {...props}
  >
    <path
      fill={fill || '#6E7C87'}
      fillRule="evenodd"
      d="M5 8a3 3 0 0 1 3-3h10a1 1 0 0 1 .8 1.6L16.25 10l2.55 3.4A1 1 0 0 1 18 15H8a1 1 0 0 0-1 1v3a1 1 0 1 1-2 0V8Z"
      clipRule="evenodd"
      opacity={0.5}
    />
  </svg>
)
export default Flag
