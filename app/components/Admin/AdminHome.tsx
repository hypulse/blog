import { signOut } from "@/app/admin/actions";
import Link from "next/link";

export default function AdminHome() {
  return (
    <ul className="menu bg-base-200 rounded-box">
      <li>
        <a href="/admin/write">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"
            ></path>
          </svg>
          Write Post
        </a>
      </li>
      <li>
        <Link href="/admin/posts">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 19.11L12.11 17H7v-2h7v.12L16.12 13H7v-2h10v1.12l1.24-1.23c.48-.48 1.11-.75 1.8-.75c.33 0 .66.07.96.19V5a2 2 0 0 0-2-2H5c-1.11 0-2 .89-2 2v14a2 2 0 0 0 2 2h5zM7 7h10v2H7zm14.7 7.35l-1 1l-2.05-2.05l1-1a.55.55 0 0 1 .77 0l1.28 1.28c.21.21.21.56 0 .77M12 19.94l6.06-6.06l2.05 2.05L14.06 22H12z"
            ></path>
          </svg>
          Manage Posts
        </Link>
      </li>
      <li>
        <Link href="/admin/tags">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12.41 2.58l9 9c.36.36.59.86.59 1.42c0 .55-.22 1.05-.59 1.41l-7 7c-.36.36-.86.59-1.41.59c-.55 0-1.05-.23-1.42-.59l-2.13-2.13l1.25-1.25v.01l2.41-2.42c1-.99 1-2.62 0-3.62l-1.28-1.26c-.99-.99-2.6-.99-3.59 0l-.17.17h-.01L4.57 14.4l-1.98-1.99C2.22 12.05 2 11.55 2 11V4c0-1.11.89-2 2-2h7c.55 0 1.05.22 1.41.58M4.44 6.56a1.499 1.499 0 1 0 2.12-2.12a1.499 1.499 0 1 0-2.12 2.12m6.26 8.79l1-1a.55.55 0 0 0 0-.77l-1.28-1.28a.55.55 0 0 0-.77 0l-1 1zm-2.64-1.47L2 19.94V22h2.06l6.05-6.07z"
            ></path>
          </svg>
          Manage Tags
        </Link>
      </li>
      <li>
        <Link href={`${process.env.POCKETBASE_URL}/_`} target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M14 3v2h3.59l-9.83 9.83l1.41 1.41L19 6.41V10h2V3m-2 16H5V5h7V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7h-2z"
            ></path>
          </svg>
          Open in PocketBase
        </Link>
      </li>
      <form action={signOut}>
        <li>
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5M4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4z"
              ></path>
            </svg>
            Sign out
          </button>
        </li>
      </form>
    </ul>
  );
}
