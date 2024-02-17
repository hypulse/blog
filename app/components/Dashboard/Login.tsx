import PocketBase, { cookieParse } from "pocketbase";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export default function Login() {
  async function signIn(formData: FormData) {
    "use server";
    try {
      const usernameOrEmail = formData.get("usernameOrEmail") ?? "";
      const password = formData.get("password") ?? "";
      if (
        usernameOrEmail === "" ||
        password === "" ||
        typeof usernameOrEmail !== "string" ||
        typeof password !== "string"
      ) {
        return;
      }
      const pb = new PocketBase(process.env.POCKETBASE_URL);
      await pb.collection("users").authWithPassword(usernameOrEmail, password);
      const cookieString = pb.authStore.exportToCookie();
      const { Path, Expires, SameSite } = cookieParse(cookieString);
      cookies().set("auth", cookieString, {
        path: Path,
        sameSite: SameSite,
        expires: new Date(Expires),
      });
    } catch (err) {
      console.error(err);
    }
    revalidatePath("/dashboard");
  }

  return (
    <form className="flex flex-col" action={signIn}>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Username or Email</span>
        </div>
        <input
          type="text"
          placeholder="Username or Email"
          className="input input-bordered"
          name="usernameOrEmail"
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Password</span>
        </div>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered"
          name="password"
        />
      </label>
      <button type="submit" className="btn btn-primary mt-5">
        Sign in
      </button>
    </form>
  );
}
