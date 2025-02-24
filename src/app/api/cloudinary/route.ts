import { NextResponse } from 'next/server'

import { cloudinary } from '../utils'

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
