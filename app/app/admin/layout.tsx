import Login from "@/components/Admin/Login";
import { auth } from "./actions";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await auth();

  if (!isAuth) {
    return <Login />;
  }

  return <>{children}</>;
}
