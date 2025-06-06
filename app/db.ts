import { neon } from "@neondatabase/serverless";

interface MainRow {
  id: number
  goal: number
  cup_index: number
  current_amount: number
}

const sql = neon(`${process.env.DATABASE_URL}`)

export async function checkDbConnection() {

    const result = await sql`SELECT version()`
    console.log("Pg version:", result)

    const rawMainData = await sql`SELECT * FROM main WHERE id = 1`
    const data = rawMainData as MainRow[]
    console.log(rawMainData)
    return data[0].current_amount

}
