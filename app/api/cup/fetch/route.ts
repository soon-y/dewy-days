'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  const sql = neon(`${process.env.DATABASE_URL}`)

  try {
    const main = await sql`SELECT cup_index FROM main WHERE id = 1`
    const cups = await sql`SELECT * FROM cup ORDER BY id ASC`


    return NextResponse.json({main, cups})
  } catch (error) {
    console.error('FETCH ERROR:', error)
    return NextResponse.json({ error: 'Failed to fetch alarm data' }, { status: 500 })
  }
}  