'use client'

import Image from 'next/image'
import { ChangeEventHandler, useState } from 'react'

import { HeaderProps } from '@/domain/types/types-ui'

import searchIcon from '../../../public/icons/Search.svg'

export const Header = ({ onSearch }: HeaderProps) => {
  const [searchVal, setSearchVal] = useState('')

  const handleSearch: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const value = target.value
    setSearchVal(value)
  }

  return (
    <header className="container flex items-center justify-between py-8">
      <section></section>
      <section>
        <div className="flex max-w-[236px] items-center gap-x-2 rounded-[6px] border border-gray-50 bg-white p-2 shadow-sm">
          <Image src={searchIcon} alt="Search icon" />
          <input
            type="text"
            className="w-full flex-1 border-0 outline-none"
            value={searchVal}
            onChange={handleSearch}
          />
        </div>
      </section>
    </header>
  )
}
