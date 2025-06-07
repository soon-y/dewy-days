'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const {
      time, selectMon, selectTue, selectWed, selectThu, selectFri, selectSat, selectSun
    } = await req.json()

    await sql`
      INSERT INTO alarm (
        time,
        "on",
        alarm_mon,
        alarm_tue,
        alarm_wed,
        alarm_thu,
        alarm_fri,
        alarm_sat,
        alarm_sun
      )
      VALUES (
        ${time},
        ${true},
        ${selectMon},
        ${selectTue},
        ${selectWed},
        ${selectThu},
        ${selectFri},
        ${selectSat},
        ${selectSun}
      )
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}