import React, { ReactNode } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { DragNDropProps } from '@/domain/types/types-ui'

export function Droppable(props: DragNDropProps<ReactNode>) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })
  const style = {
    color: isOver ? 'green' : undefined,
  }

  return (
    <div ref={setNodeRef} className="w-full flex-1" style={style}>
      {props.children}
    </div>
  )
}
