import { cookies } from "next/headers";
import PocketBase from "pocketbase";

export default function Dashboard() {
  async function signOut() {
    "use server";
    const pb = new PocketBase(process.env.POCKETBASE_URL);
    pb.authStore.clear();
    cookies().delete("auth");
  }

  return (
    <div className="flex flex-col">
      <form action={signOut}>
        <button type="submit" className="btn btn-primary">
          Sign out
        </button>
      </form>
    </div>
  );
}
