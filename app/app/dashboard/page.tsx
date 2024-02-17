import Dashboard from "@/components/Dashboard/Dashboard";
import Login from "@/components/Dashboard/Login";
import PocketBase from "pocketbase";
import { cookies } from "next/headers";

export default async function Page() {
  async function auth(): Promise<boolean> {
    "use server";
    let isValid = false;
    const cookieString = cookies().get("auth")?.value ?? "";
    if (cookieString === "") {
      return false;
    }
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    try {
      pb.authStore.loadFromCookie(cookieString);
      pb.authStore.isValid && (await pb.collection("users").authRefresh());
      isValid = pb.authStore.isValid;
    } catch (err) {
      console.error(err);
      pb.authStore.clear();
    }
    return isValid;
  }

  const isAuth = await auth();

  if (isAuth) {
    return <Dashboard />;
  }

  return <Login />;
}
