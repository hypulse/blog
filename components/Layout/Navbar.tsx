import { BLOG_NAME } from "@/utils/constants";
import routes from "@/utils/routes";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 max-w-screen-md mx-auto">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
              ></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {routes.map((route, index) => (
              <li key={index}>
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {BLOG_NAME}
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {routes.map((route, index) => (
            <li key={index}>
              <Link href={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
