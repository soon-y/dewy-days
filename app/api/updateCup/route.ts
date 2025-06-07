'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const { cupIndex, value } = await req.json()

    await sql`UPDATE main SET cup_index = ${cupIndex} WHERE id = 1`
    await sql`UPDATE cup SET amount = ${value} WHERE id = ${cupIndex + 1}`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}