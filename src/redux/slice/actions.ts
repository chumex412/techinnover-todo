import { TaskFilterAction } from '@/domain/types/redux'
import { createSlice } from '@reduxjs/toolkit'

const initialActionState = { date: new Date().toDateString(), search: '' }

const actionSlice = createSlice({
  name: 'actions',
  initialState: initialActionState,
  reducers: {
    trackTaskDate: (state, action: TaskFilterAction) => {
      state.date = action.payload
    },
    searchTask: (state, action: TaskFilterAction) => {
      state.search = action.payload
    },
  },
})

export const { trackTaskDate, searchTask } = actionSlice.actions

export default actionSlice
