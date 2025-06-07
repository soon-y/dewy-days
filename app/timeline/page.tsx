import Timeline from "@/pages/timeline-client"
import { neon } from '@neondatabase/serverless'
import { TimelineRow, MainRow } from "@/types"
import Alert from "@/components/alert"

export default async function Home() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const [timelineData, currentAmountData] = await Promise.all([
      sql`SELECT * FROM timeline`,
      sql`SELECT 'current_amount' FROM main WHERE id = 1`
    ])

    const timeline = timelineData as TimelineRow[]
    const currentAmount = currentAmountData as {current_amount: number}[]

    if (!timeline.length || !currentAmount.length) {
      throw new Error("Timeline or main data not found")
    }

    return (
      <Timeline data={timeline} main={currentAmount[0]} />
    )
  } catch (error) {
    console.error("Failed to fetch data:", error)
    return (
      <div className={`w-full h-full fixed overflow-hidden p-6 gradient`}>
        <Alert />
      </div>
    )
  }
}
