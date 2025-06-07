import Cups from "@/pages/cup-client"
import { neon } from '@neondatabase/serverless'
import { CupRow } from "@/types"

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`)
  const cupIndex = await sql`SELECT cup_index FROM main WHERE id = 1`
  const cupData = await sql`SELECT * FROM cup ORDER BY id ASC`
  const main = cupIndex as {cup_index: number}[]
  const cups = cupData as CupRow[]

  return (
    <>
      <Cups cups={cups} main={main[0]}/>
    </>
  )
}