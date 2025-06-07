'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function GET() {
  try {
    const data = await sql`SELECT * FROM alarm ORDER BY id ASC`
    return NextResponse.json(data)
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch alarm data' }, { status: 500 })
  }
}