import { SVGProps } from 'react'

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className="close-icon"
    {...props}
  >
    <path
      stroke="#848585"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="M4 20 20 4m0 16L4 4"
    />
  </svg>
)
export default CloseIcon
