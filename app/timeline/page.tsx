import Timeline from "@/pages/timetline-client"
import { neon } from '@neondatabase/serverless'
import { TimelineRow, MainRow } from "@/types"

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`)
  const timelineData = await sql`SELECT * FROM timeline`
  const timeline = timelineData as TimelineRow[]
  const currentAmountData = await sql`SELECT * FROM main WHERE id = 1`
  const currentAmount = currentAmountData as MainRow[]

  return (
    <>
      <Timeline data={timeline} main={currentAmount[0]} />
    </>
  )
}