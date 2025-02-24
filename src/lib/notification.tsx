import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { toast, ToastOptions, ToastPosition } from 'react-toastify'

export const notify = (text: string, action: 'success' | 'error') => {
  const otherProps: ToastOptions<ToastPosition> = {
    position: 'top-right',
    autoClose: 3000,
  }

  if (action === 'success') {
    toast.success(text, {
      className: `text-white px-4 py-2 bg-green-500`,
      ...otherProps,
    })
  }

  if (action === 'error') {
    toast.error(text, {
      className: 'text-white bg-red-500 px-4 py-2',
      ...otherProps,
    })
  }
}

const NotifyContainer = () => {
  return <ToastContainer />
}

export default NotifyContainer
