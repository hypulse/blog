import Dashboard from "@/components/Admin/Dashboard";
import Login from "@/components/Admin/Login";
import { auth } from "./actions";

export default async function Page() {
  const isAuth = await auth();

  if (!isAuth) {
    return <Login />;
  }

  return <Dashboard />;
}
