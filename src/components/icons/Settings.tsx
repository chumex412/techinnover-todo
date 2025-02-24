import { SVGProps } from 'react'
const Settings = ({ fill, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="sidebar-link h-6 w-6 lg:h-[30px] lg:w-[30px] xl:h-9 xl:w-9"
    viewBox="0 0 36 36"
    {...props}
  >
    <path
      fill={fill || '#6E7C87'}
      d="M20.08 33h-4.16c-1.01 0-1.83-.82-1.83-1.82v-2.34a9.92 9.92 0 0 1-1.01-.41l-1.65 1.64c-.71.72-1.86.71-2.57 0l-2.93-2.93c-.71-.72-.71-1.87 0-2.58l1.65-1.65c-.16-.33-.3-.66-.42-1.01H4.82c-1 0-1.82-.82-1.82-1.82v-4.16c0-1.01.82-1.83 1.82-1.83h2.33c.13-.34.27-.68.42-1.01l-1.65-1.65c-.7-.71-.7-1.86 0-2.57l2.95-2.93c.7-.71 1.86-.71 2.57 0l1.65 1.65c.33-.16.67-.3 1.01-.42V4.82c0-1 .82-1.82 1.82-1.82h4.17c1 0 1.82.82 1.82 1.82v2.33c.34.13.68.27 1.01.42l1.65-1.65c.7-.7 1.86-.7 2.57 0l2.95 2.95c.7.72.7 1.86 0 2.58l-1.65 1.65c.16.33.3.66.42 1h2.34c1 0 1.82.83 1.82 1.83v4.16c0 1-.82 1.82-1.82 1.82h-2.34c-.12.35-.26.69-.42 1.02l1.65 1.65c.7.71.7 1.86 0 2.57l-2.95 2.94c-.71.71-1.86.71-2.57 0l-1.65-1.65c-.33.16-.67.3-1.01.42v2.34c-.01.98-.83 1.8-1.83 1.8Zm-3.73-2.25h3.3v-2.22c0-.79.51-1.48 1.26-1.73.43-.14.86-.31 1.26-.51a1.82 1.82 0 0 1 2.11.33l1.57 1.56 2.33-2.33-1.56-1.57a1.82 1.82 0 0 1-.33-2.11c.2-.4.37-.83.52-1.26a1.8 1.8 0 0 1 1.72-1.26h2.22v-3.3h-2.22c-.79 0-1.48-.51-1.73-1.26a9.26 9.26 0 0 0-.51-1.26 1.82 1.82 0 0 1 .33-2.12l1.56-1.56-2.33-2.33-1.57 1.56c-.55.56-1.4.7-2.11.33-.4-.2-.83-.37-1.26-.52a1.83 1.83 0 0 1-1.26-1.72V5.25h-3.3v2.22c0 .79-.51 1.48-1.26 1.73-.44.14-.86.31-1.26.51-.71.36-1.56.23-2.12-.33l-1.56-1.57-2.33 2.34 1.56 1.56c.56.56.7 1.4.33 2.12-.2.4-.37.82-.52 1.26a1.83 1.83 0 0 1-1.72 1.26H5.25v3.3h2.22c.79 0 1.48.51 1.73 1.26.14.43.31.86.51 1.26.36.71.23 1.56-.33 2.11l-1.57 1.57 2.34 2.33 1.56-1.56c.56-.56 1.4-.7 2.12-.33.4.2.82.37 1.25.52a1.8 1.8 0 0 1 1.26 1.72v2.22h.01ZM18 23.98A6 6 0 1 1 18.01 12 6 6 0 0 1 18 23.98Zm0-9.71a3.74 3.74 0 1 0 .01 7.48 3.74 3.74 0 0 0-.01-7.48Z"
    />
  </svg>
)
export default Settings
