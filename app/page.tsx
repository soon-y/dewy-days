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
      sql`SELECT date FROM timeline`
    ])

    if (!rawMainData.length || !timelineData.length) {
      throw new Error("Missing data")
    }

    const main = rawMainData as MainRow[]

    const cupData = await sql`SELECT amount FROM cup WHERE id = ${rawMainData[0].cup_index + 1}`
    if (!cupData.length) throw new Error("Missing cup data")
    const cup = cupData as { amount: number }[]

    const timeline = timelineData as { date: Date }[]
    const lastDate = new Date(timeline[timeline.length - 1].date).toLocaleDateString()
    const today = new Date().toLocaleDateString()
    const reset: boolean = today.includes(lastDate) ? false : true
    const waterHeight = reset? 100 : main[0].current_amount >= main[0].goal ? 0 : 100 - (main[0].current_amount / main[0].goal * 100)


    return <App main={main[0]} cup={cup[0]} reset={reset} waterHeightInit={waterHeight} />
  } catch (error) {
    console.error("Error loading data:", error)
    return (
      <div className={`w-full h-full fixed overflow-hidden p-6 bg-[url(/main/bg.jpg)]`}>
        <Alert />
      </div>
    )
  }
}