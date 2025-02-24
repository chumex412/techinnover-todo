import { SVGProps } from 'react'
const Notes = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="sidebar-link h-6 w-6 lg:h-[30px] lg:w-[30px] xl:h-9 xl:w-9"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      stroke={fill || '#6E7C87'}
      strokeMiterlimit={10}
      strokeWidth={2.25}
      d="M6 10.5h24M6 18h24M6 25.5h24"
    />
  </svg>
)
export default Notes
