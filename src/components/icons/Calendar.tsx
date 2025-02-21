import { SVGProps } from 'react'
const Calendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="sidebar-link h-6 w-6 lg:h-[30px] lg:w-[30px] xl:h-9 xl:w-9"
    viewBox="0 0 36 36"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#65676D"
        strokeMiterlimit={10}
        strokeWidth={2.25}
        d="M31.88 9.75H4.13v20.63h27.75V9.75ZM9.75 4.5v9m16.5-9v9"
      />
      <path
        fill="#65676D"
        d="M12.75 15h-6v6h6v-6Zm6.75 0h-3v3h3v-3Zm4.88 0h-3v3h3v-3Zm4.87 0h-3v3h3v-3Zm-9.75 4.5h-3v3h3v-3Zm4.88 0h-3v3h3v-3Zm4.87 0h-3v3h3v-3ZM19.5 24h-3v3h3v-3Zm-4.87 0h-3v3h3v-3Zm-4.88 0h-3v3h3v-3Zm14.63 0h-3v3h3v-3Zm4.87 0h-3v3h3v-3Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M3 4.5h30v27H3z" />
      </clipPath>
    </defs>
  </svg>
)
export default Calendar
