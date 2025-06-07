'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const profile = await sql`SELECT * FROM profile WHERE id = 1`
    const goal = await sql`SELECT goal FROM main WHERE id = 1`

    return NextResponse.json({ profile, goal })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}