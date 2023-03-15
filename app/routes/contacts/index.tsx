import { Link, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { t } from "~/utils";

export const loader: LoaderFunction = async ({ request }) => {
  let loaderData = {
    title: t("ContactControl Eventmanagement"),
    url: request.url,
  };

  return json(loaderData);
};
export default function Index() {
  console.log("contacts/index");
  return (
    <main style={{ padding: "1rem" }}>
      <p>
        <Link to="/contacts/edit/1234">
          Kontakte Dashboard! - -
          {/*          {t(
            "Simuliere Kontaktsuche und -auswahl, gehe zu Bearbeitungs-Ansicht"
          )}*/}
        </Link>
      </p>
    </main>
  );
}
