import { signIn } from "@/app/admin/actions";

export default function Login() {
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
