import Image from 'next/image'
import Link from 'next/link'

import logo from '../../../public/images/logo.png'
import Calendar from '../icons/Calendar'
import BriefCase from '../icons/BriefCase'
import Notes from '../icons/Notes'
import FourBoxes from '../icons/FourBoxes'
import Settings from '../icons/Settings'

const navLinks = [
  {
    name: 'Calendar',
    icon: <FourBoxes />,
    path: '/',
  },
  {
    name: 'Inbox',
    icon: <BriefCase />,
    path: '/',
  },
  {
    name: 'Notes',
    icon: <Notes />,
    path: '/',
  },
  {
    name: 'Todo List',
    icon: <Calendar />,
    path: '/',
  },
  {
    name: 'Settings',
    icon: <Settings />,
    path: '/',
  },
]

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 flex h-screen basis-[276px] flex-col bg-white lg:sticky">
      <Image
        src={logo}
        className="mx-auto mb-[60px] mt-8 h-[38.9px] w-[172.7px]"
        alt="Techinnover logo"
      />
      <section className="flex flex-col">
        {navLinks.map((link) => (
          <Link
            href={link.path}
            className="flex items-center gap-x-5 p-5 font-sf-pro-text text-md font-semibold text-gray-400"
            key={link.name}
          >
            {link.icon} <span className="flex-1">{link.name}</span>
          </Link>
        ))}
      </section>
    </aside>
  )
}
