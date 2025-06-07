'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const { id, val } = await req.json()
    await sql`UPDATE alarm SET "on" = ${val} WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}