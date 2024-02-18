import Login from "@/components/Admin/Login";
import { auth, signOut } from "./actions";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await auth();

  if (!isAuth) {
    return <Login />;
  }

  return (
    <>
      <form action={signOut}>
        <button type="submit" className="btn">
          Sign out
        </button>
      </form>
      <Link href="/admin" className="btn">
        Admin Home
      </Link>
      {children}
    </>
  );
}
