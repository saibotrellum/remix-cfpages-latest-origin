import { Outlet, useParams } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { nullDef } from "~/utils";
export const loader: LoaderFunction = ({ request, context, params }) => {
  const { contactId, _module, _invoke, _elementId } = params;
  console.log("redir", params);
  if (nullDef(contactId)) {
    console.log("edit error");
    return redirect("" + "./list");
  }
  return {};
};

export default function ContactEditContainer() {
  const { contactId, _module, _invoke, _elementId } = useParams();
  console.log("contacts/2");

  return (
    <main style={{ padding: "1rem" }}>
      Edit Sub Modul! - Menus & Einstellungen, gemeinsame Aktionen.
      <Outlet />
    </main>
  );
}
