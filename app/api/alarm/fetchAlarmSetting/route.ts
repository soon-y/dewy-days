'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  const sql = neon(`${process.env.DATABASE_URL}`)

  try {
    const setting = await sql`SELECT * FROM alarm_setting`
    return NextResponse.json(setting)
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch alarm data' }, { status: 500 })
  }
}