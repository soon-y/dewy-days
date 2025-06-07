import App from "@/pages/app-client"
import { neon } from '@neondatabase/serverless'
import { MainRow } from "@/types"

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`)
  const rawMainData = await sql`SELECT * FROM main WHERE id = 1`
  const data = rawMainData as MainRow[]
  const cupData = await sql`SELECT amount FROM cup WHERE id = ${rawMainData[0].cup_index + 1}`
  const cup = cupData as {amount: number}[]
  const timelineData = await sql`SELECT date FROM timeline`
  const timeline = timelineData as {date: Date}[]
  const lastDate = new Date((timeline[timeline.length-1].date)).toLocaleDateString()
  const today = new Date().toLocaleDateString()
  const reset: boolean = today.includes(lastDate) ? false : true

  return (
    <>
      <App data={data[0]} cup={cup[0]} reset={reset}/>
    </>
  )
}