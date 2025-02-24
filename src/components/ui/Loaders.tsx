import clsx from 'clsx'

import '@/styles/ui.css'

export const SpinnerLoader = ({ className }: { className?: string }) => {
  return (
    <div className="spinner_container">
      <div className={clsx('spinner', className)}></div>
    </div>
  )
}
