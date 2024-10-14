import Header from "./components/header";
import { getUser } from "./actions";

export default async function Home() {
  const user = await getUser();
  return (
    <div className={`bg-background h-screen min-w-80`}>
      <Header user={user} />
      <main className="flex justify-center items-center h-full bg-background">
        <h1 className="text-3xl text-text text-center ">Welcome to My One Mile <span role="img" aria-label="running">🏃</span></h1>
      </main>
    </div>
  )
}
