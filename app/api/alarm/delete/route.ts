'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()
    await sql`DELETE FROM alarm WHERE id = ${id}`
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('DELETE ERROR:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
