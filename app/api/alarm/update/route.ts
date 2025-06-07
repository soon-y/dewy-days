'use server'

import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

const sql = neon(`${process.env.DATABASE_URL}`)

export async function POST(req: NextRequest) {
  try {
    const {
      on,
      tabIndex,
      repeatMon,
      repeatTue,
      repeatWed,
      repeatThu,
      repeatFri,
      repeatSat,
      repeatSun,
      timeRange,
      interval,
    } = await req.json()

    await sql`
      UPDATE alarm_setting
      SET 
        "on" = ${on},
        tab_index = ${tabIndex},
        repeat_mon = ${repeatMon},
        repeat_tue = ${repeatTue},
        repeat_wed = ${repeatWed},
        repeat_thu = ${repeatThu},
        repeat_fri = ${repeatFri},
        repeat_sat = ${repeatSat},
        repeat_sun = ${repeatSun},
        range_start = ${timeRange[0]},
        range_end = ${timeRange[1]},
        interval = ${interval}
      WHERE id = 1
    `
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('UPDATE ERROR:', error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
