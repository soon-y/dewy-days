export const dynamic = "force-dynamic"

import Cups from '@/components/pages/cup-client'
import { neon } from '@neondatabase/serverless'
import { CupRow } from "@/types"
import Alert from "@/components/alert"

export default async function Home() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const cupIndex = await sql`SELECT cup_index FROM main WHERE id = 1`
    const cupData = await sql`SELECT * FROM cup ORDER BY id ASC`
    const main = cupIndex as { cup_index: number }[]
    const cups = cupData as CupRow[]

    if (!cupIndex.length || !cupData.length) {
      throw new Error("Missing main or timeline data")
    }

    return (
      <>
        <Cups cups={cups} main={main[0]} />
      </>
    )
  } catch (error) {
    console.error("Error loading data:", error)
    return (
      <div className={`w-full h-full fixed gradient`}>
        <Alert />
      </div>
    )
  }
}