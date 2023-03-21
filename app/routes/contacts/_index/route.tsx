import {Link, Outlet} from "@remix-run/react";

export default function ContactsDasboard() {
  console.log("contacts/2");

  return (
    <main style={{ padding: "1rem" }}>
      ContactsDasboard
        <Link to="/contacts/edit/123/main">Edit</Link>

        <Outlet />
    </main>
  );
}
