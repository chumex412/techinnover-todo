import { NextRequest, NextResponse } from 'next/server'

import { cloudinary } from '../../utils'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    const response: { result?: 'ok' } = await cloudinary.uploader.destroy(
      params.taskId || ''
    )

    if (!response.result) {
      throw new Error('Failed to delete image')
    }

    return NextResponse.json(
      { success: true, message: 'Successfully deleted image' },
      { status: 200 }
    )
  } catch (error) {
    console.error({ error })

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred',
      },
      { status: 400 }
    )
  }
}
