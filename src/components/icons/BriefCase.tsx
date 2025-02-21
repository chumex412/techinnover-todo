import { SVGProps } from 'react'
const BriefCase = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="sidebar-link h-6 w-6 lg:h-[30px] lg:w-[30px] xl:h-9 xl:w-9"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      stroke="#65676D"
      strokeMiterlimit={10}
      strokeWidth={2.25}
      d="M31.5 11.2H3.75V30H31.5V11.2Z"
    />
    <path
      stroke="#65676D"
      strokeMiterlimit={10}
      strokeWidth={2.25}
      d="M23.73 17.6H11.52v6.01h12.21v-6.02Zm-12.1-6.4V5.25h12v5.96"
    />
  </svg>
)
export default BriefCase
