import Profile from '@/components/pages/profile-client'
import { neon } from '@neondatabase/serverless'
import { ProfileRow } from "@/types"
import Alert from "@/components/alert"

export default async function Home() {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`)
    const profileData = await sql`SELECT * FROM profile WHERE id = 1`
    const goalData = await sql`SELECT goal FROM main WHERE id = 1`
    const data = profileData as ProfileRow[]
    const goal = goalData as { goal: number }[]

    if (!profileData.length || !goalData.length) {
      throw new Error("Missing data")
    }

    return (
      <>
        <Profile data={data[0]} initial={goal[0]} />
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