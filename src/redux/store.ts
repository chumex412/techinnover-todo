import { configureStore } from '@reduxjs/toolkit'

import { tasksApiSlice } from './slice/task'
import actionSlice from './slice/actions'

export const store = configureStore({
  reducer: {
    [tasksApiSlice['reducerPath']]: tasksApiSlice.reducer,
    [actionSlice.reducerPath]: actionSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
