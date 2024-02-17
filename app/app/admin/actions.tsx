"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import PocketBase, { cookieParse } from "pocketbase";

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

async function signOut() {
  "use server";
  const pb = new PocketBase(process.env.POCKETBASE_URL);
  pb.authStore.clear();
  cookies().delete("auth");
}

async function auth() {
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

export { signIn, signOut, auth };
