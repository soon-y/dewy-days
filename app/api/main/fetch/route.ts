'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const main = await sql`SELECT * FROM main WHERE id = 1`
    const RawlastDate = await sql`SELECT date FROM timeline ORDER BY id DESC LIMIT 1`
    const lastDate = new Date(RawlastDate[0].date).toLocaleDateString()
    const today = new Date().toLocaleDateString()
    const reset = today !== lastDate

    let cupAmount = null
    if (main.length) {
      const cupResult = await sql`SELECT amount FROM cup WHERE id = ${main[0].cup_index + 1}`
      cupAmount = cupResult[0]?.amount || null
    }

    return NextResponse.json({ main, cupAmount, reset })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}