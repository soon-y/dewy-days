'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const currentAmount = await sql`SELECT current_amount FROM main WHERE id = 1`

    return NextResponse.json({ currentAmount })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}