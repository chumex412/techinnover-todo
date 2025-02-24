import { NextRequest, NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_UPLOAD_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_UPLOAD_API_SECRET,
})

export async function GET() {
  const timestamp = Math.floor(Date.now() / 1000)

  try {
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
      },
      cloudinary.config().api_secret || ''
    )

    return NextResponse.json(
      { data: { signature, timestamp: String(timestamp) }, success: true },
      { status: 200 }
    )
  } catch (err) {
    console.error({ err })

    return NextResponse.json({ data: null, success: false }, { status: 400 })
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response: { result?: 'ok' } = await cloudinary.uploader.destroy(
      params.id || ''
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
