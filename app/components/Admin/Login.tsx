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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8z"
          ></path>
        </svg>
        Sign in
      </button>
    </form>
  );
}
