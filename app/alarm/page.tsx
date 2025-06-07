import Alarm from '@/components/pages/alarm-client'
import { neon } from '@neondatabase/serverless'
import { AlarmSettingRow, AlarmRow } from "@/types"

export default async function Home() {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const alarmData = await sql`SELECT * FROM alarm ORDER BY id ASC`
    const alarmSettingData = await sql`SELECT * FROM alarm_setting ORDER BY id ASC`
    const alarm = alarmData as AlarmRow[]
    const alarmSetting = alarmSettingData as AlarmSettingRow[]

  return (
    <>
      <Alarm alarmSetting={alarmSetting[0]} alarm={alarm} />
    </>
  )
}