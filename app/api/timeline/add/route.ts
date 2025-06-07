'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const {
      cupIndex, amount, today, goal, currentAmount
    } = await req.json()

    await sql`
      INSERT INTO timeline ( date, cup_index, amount, goal )
      VALUES (
        ${today}, ${cupIndex}, ${amount}, ${goal}
      )`

    await sql`UPDATE main SET current_amount =  ${currentAmount} WHERE id = 1`

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}