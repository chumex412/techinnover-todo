import Image from 'next/image'
import { Trash2 } from 'lucide-react'

import { type PreviewProps } from '@/domain/types/types-ui'

import { Progress } from './Progress'

const PreviewZone = ({
  id,
  name,
  url,
  size,
  defaultUrl,
  progress,
  onDelete,
}: PreviewProps) => {
  return (
    <section className="preview-container flex h-32 w-full items-center rounded-lg border border-gray-200 p-4">
      <div className="w-[187px]">
        {(defaultUrl || url) && (
          <Image
            src={defaultUrl || url || ''}
            width={187}
            height={87}
            className="h-[87px] w-full rounded-lg object-cover"
            alt={`${name} image`}
          />
        )}
      </div>
      {defaultUrl && !url ? (
        <div></div>
      ) : (
        <>
          <div className="flex-1 pl-4 pr-1">
            <p className="font-inter text-sm font-medium leading-[150%] text-gray-500">
              {name}
            </p>
            <p className="mb-1.5 font-inter text-sm font-medium text-gray-200">
              {size}
            </p>
            <div className="flex items-center gap-x-3">
              <Progress value={progress} color="#4F35F3" className="h-2" />
              <p className="font-inter text-sm font-medium text-gray-500">
                {progress}%
              </p>
            </div>
          </div>
          <button onClick={() => onDelete(id || '')}>
            <Trash2 size={20} />
          </button>
        </>
      )}
    </section>
  )
}

export default PreviewZone
