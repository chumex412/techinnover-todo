import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { UpdateTaskProps } from '@/domain/types/redux'

export const tasksApiSlice = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Tasks'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string | number>({
      query: () => `/tasks`,
      providesTags: ['Tasks'],
    }),
    addTask: builder.mutation({
      query: (task: Task) => ({
        url: `/tasks`,
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTask: builder.mutation({
      query: ({ id, task }: UpdateTaskProps) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Tasks'],
    }),
    removeTask: builder.mutation({
      query: (id: string) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
} = tasksApiSlice
