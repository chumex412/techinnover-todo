'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import logo from '../../../public/images/logo.png'
import Calendar from '../icons/Calendar'
import BriefCase from '../icons/BriefCase'
import Notes from '../icons/Notes'
import FourBoxes from '../icons/FourBoxes'
import Settings from '../icons/Settings'

const navLinks = [
  {
    name: 'Calendar',
    icon: (active: boolean) => (
      <FourBoxes fill={active ? '#4F35F3' : undefined} />
    ),
    path: '/',
  },
  {
    name: 'Inbox',
    icon: (active: boolean) => (
      <BriefCase fill={active ? '#4F35F3' : undefined} />
    ),
    path: '',
  },
  {
    name: 'Notes',
    icon: (active: boolean) => <Notes fill={active ? '#4F35F3' : undefined} />,
    path: '',
  },
  {
    name: 'Todo List',
    icon: (active: boolean) => (
      <Calendar fill={active ? '#4F35F3' : undefined} />
    ),
    path: '',
  },
  {
    name: 'Settings',
    icon: (active: boolean) => (
      <Settings fill={active ? '#4F35F3' : undefined} />
    ),
    path: '',
  },
]

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const currentPath = usePathname()

  return (
    <aside
      className={clsx(
        'fixed left-0 top-0 z-10 h-screen w-[276px] bg-white shadow-md transition-transform duration-300 lg:sticky lg:translate-x-0 lg:shadow-none',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <button
        className="absolute -right-3.5 top-20 flex h-7 w-7 items-center justify-center rounded-full border border-gray-100 bg-gray-100 shadow-sm lg:hidden"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>
      <section className="flex flex-col">
        <Image
          src={logo}
          className="mx-auto mb-[60px] mt-8 h-[38.9px] w-[172.7px]"
          alt="Techinnover logo"
        />

        <section className="flex flex-col">
          {navLinks.map((link) => (
            <Link
              href={link.path}
              className={clsx(
                'flex items-center gap-x-5 p-5 font-sf-pro-text text-md font-semibold text-gray-400',
                link.path === currentPath &&
                  'border-r-[6px] border-primary-500 text-primary-500'
              )}
              key={link.name}
            >
              {link.icon(link.path === currentPath)}{' '}
              <span className="flex-1">{link.name}</span>
            </Link>
          ))}
        </section>
      </section>
    </aside>
  )
}
