import * as Yup from 'yup'

export const taskFormSchema = Yup.object({
  taskName: Yup.string().required('Please a task name'),
  taskDesc: Yup.string(),
})

export type TaskFormType = Yup.InferType<typeof taskFormSchema>
