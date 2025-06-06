import { neon } from "@neondatabase/serverless";

interface MainRow {
  id: number
  goal: number
  cup_index: number
  current_amount: number
}

export async function checkDbConnection() {
  if (!process.env.DATABASE_URL) {
    return "No DATABASE_URL environment variable";
  }
  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`SELECT version()`;
    console.log("Pg version:", result);

    const rawMainData = await sql`SELECT * FROM main WHERE id = 1`
    const data = rawMainData as MainRow[]
    console.log(rawMainData)
    return data[0].current_amount
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return "Database not connected";
  }
}
