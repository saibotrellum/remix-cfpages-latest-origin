import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import env, { setEnv } from "~/lib/env";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  SSRProvider,
} from "react-bootstrap";
import {
  AppContext,
  AppContextProvider,
  getSettings,
} from "~/lib/contexts/App";
import classNames from "classnames";
import { setDefaultMongoConnection } from "~/lib/storage/mongo.server";
import { setKVNamespace } from "~/lib/storage/kv.server";
import styles from "./css/global.css";
import { t } from "~/utils";
import { Header, Sidebar } from "~/layout";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});
export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ request, context, params }) => {
  console.log("bla");
  const curPath = new URL(request.url).pathname;
  //env.setEnv(context);
  setDefaultMongoConnection({
    apiKey: context.MONGODB_API_KEY,
    apiUrl: context.MONGODB_API_ENDPOINT,
    dataSource: context.MONGODB_DATA_SOURCE,
    database: context.MONGODB_DATABASE,
  });

  //ssetKVNamespace();
  // return json({ env });
  return json({});
};
export default function App() {
  console.log("Root start");

  // Fetching user details from UserContext
  const loaderData = useLoaderData();
  return (
    // <AppContextProvider
    //   initUser={loaderData.user as TAppContextUser}
    //   initRoute={loaderData.route as TAppContextRoute}
    //   initSettings={loaderData.settings as TAppContextSettings}
    // >
    <SSRProvider>
      <Document>
        <Layout curPath={loaderData.curPath}>
          <Outlet />
        </Layout>
      </Document>
    </SSRProvider>
    // </AppContextProvider>
  );
}

function Layout({
  children,
  curPath,
}: {
  children: React.ReactNode;
  curPath?: string;
}) {
  return curPath == "/login" ? (
    <div className="container-fluid bg-light">
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  ) : (
    <>
      <Header />
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div className="container-fluid bg-light">
          <main style={{ padding: "1rem" }}>{children}</main>
        </div>
      </div>
    </>
  );
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/*<RouteChangeAnnouncement />*/}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

/* Provides an alert for screen reader users when the route changes.
const RouteChangeAnnouncement = React.memo(() => {
  let [hydrated, setHydrated] = React.useState(false);
  let [innerHtml, setInnerHtml] = React.useState("");
  let location = useLocation();

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  let firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    // Skip the first render because we don't want an announcement on the
    // initial page load.
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    let pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);

  // Render nothing on the server. The live region provides no value unless
  // scripts are loaded and the browser takes over normal routing.
  if (!hydrated) {
    return null;
  }

  return (
    <div
      aria-live="assertive"
      aria-atomic
      id="route-change-region"
      style={{
        border: "0",
        clipPath: "inset(100%)",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px",
        whiteSpace: "nowrap",
        wordWrap: "normal",
      }}
    >
      {innerHtml}
    </div>
  );
});
*/
export function CatchBoundary() {
  let caught = useCatch();
  console.log("CatchBoundary Error (Status)");

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;
    default:
      console.dir(caught);
      message = (
        <p>
          Oops! An unknown Error has occured. Please inform your application
          administrator.
        </p>
      );

      throw new Error(`Unexpected caught response with status: ${caught.status}
      ${caught}`);
      break;
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.log("ERROR", error);
  return (
    <Document>
      <Layout>
        <div>
          <h1>There was an error</h1>
          <p>{error.message}</p>
          <hr />
          <p>
            Hey, developer, you should replace this with what you want your
            users to see.
          </p>
        </div>
      </Layout>
    </Document>
  );
}
