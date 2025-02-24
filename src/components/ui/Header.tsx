'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { type Day, nextDay, previousDay } from 'date-fns'

import { getFormatedDate } from '@/utils/format'
import { searchTask, trackTaskDate } from '@/redux/slice/actions'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

import searchIcon from '../../../public/icons/Search.svg'
import arrowLeft from '../../../public/icons/arrow-left.svg'
import arrowRight from '../../../public/icons/arrow-right.svg'

export const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const [query] = useDebounce(searchTerm, 1500)

  const filterDate = useAppSelector((state) => state.actions.date)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(searchTask(query))
  }, [dispatch, query])

  const day = new Date(filterDate).getDay()

  const handleNextDay = () => {
    const next = (day + 1) as Day
    const result = nextDay(new Date(filterDate), next)

    dispatch(trackTaskDate(result.toDateString()))
  }

  const handlePrevDay = () => {
    const prev = (day - 1) as Day
    const result = previousDay(new Date(filterDate), prev)

    dispatch(trackTaskDate(result.toDateString()))
  }

  return (
    <header className="flex flex-col justify-between gap-x-2 gap-y-6 py-6 md:py-8 xs:flex-row xs:items-center">
      <section className="order-2 flex flex-wrap items-center gap-4 xs:order-1">
        <p className="font-sf-pro-text text-xl font-semibold leading-[120%] text-black">
          {getFormatedDate(filterDate)}
        </p>
        <div className="flex items-center gap-x-4">
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-shadow duration-300 hover:shadow-md"
            onClick={handlePrevDay}
          >
            <Image src={arrowLeft} alt="Arrow left icon" />
          </button>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-shadow duration-300 hover:shadow-md"
            onClick={handleNextDay}
          >
            <Image src={arrowRight} alt="Arrow right icon" />
          </button>
        </div>
      </section>
      <section className="order-1 xs:order-2">
        <div className="flex w-full items-center gap-x-2 rounded-[6px] border border-gray-100 bg-white p-2 shadow-sm xs:w-auto xs:max-w-[236px]">
          <Image src={searchIcon} alt="Search icon" />
          <input
            type="text"
            className="w-full flex-1 border-0 outline-none"
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
          />
        </div>
      </section>
    </header>
  )
}
