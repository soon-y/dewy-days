'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const { weight, duration, activity, manual, goal } = await req.json()

    await sql`
      UPDATE profile
      SET 
        weight = ${weight},
        duration = ${duration},
        activity_mode = ${activity},
        manual = ${manual}
      WHERE id = 1
    `
    await sql`UPDATE main SET goal = ${goal} WHERE id = 1`

    await sql`
      WITH last_row AS ( SELECT id, date FROM timeline ORDER BY id DESC LIMIT 1 )
      UPDATE timeline SET goal = ${goal} WHERE id = ( SELECT id FROM last_row WHERE DATE(date) = CURRENT_DATE )`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}