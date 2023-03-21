import { Outlet } from "@remix-run/react";

export default function ContactsEditDasboard() {
  console.log("contacts/2");

  return (
    <main style={{ padding: "1rem" }}>
      <p>ContactsEditDasboard</p>
      <Outlet />
    </main>
  );
}
