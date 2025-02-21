import { SVGProps } from 'react'
const FourBoxes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 36 36"
    className="sidebar-link h-6 w-6 lg:h-[30px] lg:w-[30px] xl:h-9 xl:w-9"
    {...props}
  >
    <path
      stroke="#4F35F3"
      strokeMiterlimit={10}
      strokeWidth={2.25}
      d="M15.75 6H6v9.75h9.75V6Zm15 0H21v9.75h9.75V6Zm-15 15H6v9.75h9.75V21Zm15 0H21v9.75h9.75V21Z"
    />
  </svg>
)
export default FourBoxes
