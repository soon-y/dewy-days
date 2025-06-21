export const dynamic = "force-dynamic"

import App from '@/components/pages/app-client'
import { neon } from '@neondatabase/serverless'
import { MainRow } from "@/types"
import Alert from "@/components/alert"

export default async function Home() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)

    const [rawMainData, timelineData] = await Promise.all([
      sql`SELECT * FROM main WHERE id = 1`,
      sql`SELECT date FROM timeline ORDER BY id DESC LIMIT 1`
    ])

    if (!rawMainData.length || !timelineData.length) {
      throw new Error("Missing data")
    }

    const cupData = await sql`SELECT amount FROM cup WHERE id = ${rawMainData[0].cup_index + 1}`
    if (!cupData.length) throw new Error("Missing cup data")
    const cup = cupData[0] as { amount: number }
    const main = rawMainData[0] as MainRow
    const timeline = timelineData[0] as { date: Date }
    const lastDate = new Date(timeline.date).toLocaleDateString()
    const today = new Date().toLocaleDateString()
    const reset: boolean = today.includes(lastDate) ? false : true
    const waterHeight = reset? 100 : main.current_amount >= main.goal ? 0 : 100 - (main.current_amount / main.goal * 100)

    return <App main={main} cup={cup} reset={reset} waterHeightInit={waterHeight} />
  } catch (error) {
    console.error("Error loading data:", error)
    return (
      <div className={`w-full h-full fixed overflow-hidden p-6 bg-[url(/main/bg.jpg)]`}>
        <Alert />
      </div>
    )
  }
}