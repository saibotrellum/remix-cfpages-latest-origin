import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { TSettings } from "~/components/contacts/Helpers";
import { getSettings } from "~/components/contacts/Helpers";
import styles from "./css/global.css";
import Header from "~/layout/Header";
import Sidebar from "~/layout/Sidebar";
import { json } from "@remix-run/cloudflare";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { SSRProvider } from "react-bootstrap";
import { t } from "~/utils";
//import { UserProvider } from "~/components/contexts/user";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];
// styles is now something like /build/global-AE33KB2.css

type LoaderData = { metaTitle: string; settings: TSettings };

export const loader: LoaderFunction = async ({ request }) => {
  const settings = { locale: "de", ...getSettings(request) };
  const metaTitle = t("ContactControl Eventmanagement");
  return json<LoaderData>({ metaTitle, settings });
};

export const meta: MetaFunction = ({ data }) => ({
  charset: "utf-8",
  title: data.metaTitle,
  viewport: "width=device-width,initial-scale=1",
});

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

export default function App() {
  const [isNavToggled, setNavbarToggle] = useState(true);
  const navBarToggle = () => setNavbarToggle(!isNavToggled);

  // Fetching user details from UserContext
  const loaderData = useLoaderData<LoaderData>();

  const params = useParams();
  return (
    //    <UserProvider>
    <SSRProvider>
      <Document>
        <Header setNavbarToggle={navBarToggle} />
        <div className="d-flex" id="wrapper">
          <Sidebar isNavToggled={isNavToggled} />
          <div className="container-fluid bg-light">
            <Outlet />
          </div>
        </div>
      </Document>
    </SSRProvider>
    //    </UserProvider>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
}
