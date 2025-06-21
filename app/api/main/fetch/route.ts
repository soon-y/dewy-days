'use server'

import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const main = await sql`SELECT * FROM main WHERE id = 1`
    const timelineData = await sql`SELECT date FROM timeline ORDER BY id DESC LIMIT 1`
    const lastDate = new Date(timelineData[0].date).toLocaleDateString()
    const today = new Date().toLocaleDateString()
    const reset: boolean = today.includes(lastDate) ? false : true

    if(reset){
      const updateAmount = await sql`UPDATE main SET current_amount = 0 WHERE id = 1`
      if(!updateAmount.length) new Error("Update error")
    }

    let cupAmount = null
    if (main.length) {
      const cupData = await sql`SELECT amount FROM cup WHERE id = ${main[0].cup_index + 1}`
      cupAmount = cupData[0]?.amount || null
    }

    return NextResponse.json({ main, cupAmount, reset })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}