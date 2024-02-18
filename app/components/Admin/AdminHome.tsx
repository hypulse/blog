"use client";

import Link from "next/link";

export default function AdminHome() {
  return (
    <ul className="menu bg-base-200 rounded-box">
      <li>
        <Link href="/admin/write">Write Post</Link>
      </li>
      <li>
        <Link href="/admin/posts">Manage Posts</Link>
      </li>
      <li>
        <Link href="/admin/tags">Manage Tags</Link>
      </li>
      <li>
        <Link href="/admin/sync">Sync with GitHub</Link>
      </li>
    </ul>
  );
}
