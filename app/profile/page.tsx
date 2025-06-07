import Profile from '@/components/pages/profile-client'
import { neon } from '@neondatabase/serverless'
import { ProfileRow } from "@/types"

export default async function Home() {
  const sql = neon(`${process.env.DATABASE_URL}`)
  const profileData = await sql`SELECT * FROM profile WHERE id = 1`
  const goalData = await sql`SELECT goal FROM main WHERE id = 1`
  const data = profileData as ProfileRow[]
  const goal = goalData as {goal:number}[]

  return (
    <>
      <Profile data={data[0]} initial={goal[0]}/>
    </>
  )
}
