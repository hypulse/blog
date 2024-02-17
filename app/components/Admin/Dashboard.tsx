import { signOut } from "@/app/admin/actions";

export default function Dashboard() {
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
