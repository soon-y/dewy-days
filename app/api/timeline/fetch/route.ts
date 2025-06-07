'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function GET() {
  try {
    const data = await sql `SELECT * FROM timeline`
    return NextResponse.json(data)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}