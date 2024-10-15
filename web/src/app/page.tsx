import Header from "./components/header";
import Link from "next/link";
import { getUser } from "./actions";

export default async function Home() {
  const user = await getUser();
  return (
    <div className={`bg-background h-screen min-w-80`}>
      <Header user={user} />
      <main className="flex flex-col justify-center items-center h-full bg-background">
        <h1 className="text-3xl text-text text-center my-3">Welcome to My One Mile <span role="img" aria-label="running">🏃</span></h1>
        <Link href="/activity"> Activites </Link>
      </main>
    </div>
  )
}
