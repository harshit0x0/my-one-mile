import Header from "./components/header";
import { getUser } from "./actions";

export default async function Home() {
  const user = await getUser();
  return (
    <div className="bg-background h-screen">
      <Header user={user} />
    </div>
  )
}
