import Alarm from '@/components/pages/alarm-client'
import { neon } from '@neondatabase/serverless'
import { AlarmSettingRow, AlarmRow } from "@/types"
import Alert from "@/components/alert"

export default async function Home() {
  try{
    const sql = neon(`${process.env.DATABASE_URL}`)

    const [alarmData, alarmSettingData] = await Promise.all([
      sql`SELECT * FROM alarm ORDER BY id ASC`,
      sql`SELECT * FROM alarm_setting WHERE id = 1`
    ])
    const alarm = alarmData as AlarmRow[]
    const alarmSetting = alarmSettingData as AlarmSettingRow[]

    if (!alarmData.length || !alarmSettingData.length) {
      throw new Error("Missing data")
    }

  return (
    <>
      <Alarm alarmSetting={alarmSetting[0]} alarm={alarm} />
    </>
  )} catch (error) {
    console.error("Error loading data:", error)
    return (
      <div className={`w-full h-full fixed`}>
        <Alert />
      </div>
    )
  }
}