import { Outlet, useLocation, useParams } from "@remix-run/react";
import { LoaderFunction } from "@remix-run/cloudflare";

export default function Contacts() {
  console.log("contacts/params", useParams());
  console.log("contacts/loc", useLocation());

  return (
    <main style={{ padding: "1rem" }}>
      Kontakte Modul! - Menus & Einstellungen.
      <Outlet />
    </main>
  );
}
