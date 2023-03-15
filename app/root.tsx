import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/cloudflare";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import React from "react";
import styles from "./css/global.css";
import { t } from "~/utils";

import {
  Container,
  Nav,
  Navbar,
  NavDropdown,
  SSRProvider,
} from "react-bootstrap";
import classNames from "classnames";
import { getUser, requireSession } from "~/utils/session.server";
import type {
  LoaderData,
  TAppContextRoute,
  TAppContextSettings,
  TAppContextUser,
} from "~/components/contexts/App";
import {
  AppContext,
  AppContextProvider,
  getSettings,
} from "~/components/contexts/App";
import {json} from "@remix-run/cloudflare";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

// styles is now something like /build/global-AE33KB2.css

export const meta: MetaFunction<typeof loader> = ({
  data,
  params,
  parentsData,
  location,
}) => ({
  charset: "utf-8",
  title: data.title,
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request, params }) => {
  console.log("Root loader start");

  const curPath = new URL(request.url).pathname;

  if (curPath !== "/login") {
    const redirect = await requireSession(request, curPath);
    if (redirect) return redirect;
  }

  console.log("Root loader out");
  return json({
    user: await getUser(request),
    settings: { ...getSettings(request, process) },
    route: {
      title: t("ContactControl Event Management"),
      url: request.url,
    },
    curPath,
  });
};

export default function App() {
  console.log("Root start");
  // Fetching user details from UserContext
  const loaderData = useLoaderData<LoaderData>();
  return (
    // <AppContextProvider
    //   initUser={loaderData.user as TAppContextUser}
    //   initRoute={loaderData.route as TAppContextRoute}
    //   initSettings={loaderData.settings as TAppContextSettings}
    // >
    // <SSRProvider>
    <Document>
      <Layout curPath={loaderData.curPath}>
        <Outlet />
      </Layout>
    </Document>
    // </SSRProvider>
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
  //console.log("layout");
  return curPath == "/login" ? (
    <div className="container-fluid bg-light">
      <main style={{ padding: "1rem" }}>{children}</main>
    </div>
  ) : (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          {/*          <AppContext.Consumer>
            {(app) => {
              return (
                <button
                  className="btn btn-primary"
                  id="sidebarToggle"
                  type="button"
                  onClick={app.toggleSidebar}
                >
                  Toggle Menu
                </button>
              );
            }}
          </AppContext.Consumer>*/}
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/contacts">
                      Contacts
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Something
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Item>
                    {/*   <AppContext.Consumer>
                      {(app) => {
                        return (
                          <Form
                            action={`/logout?redirectTo=${app.route.url?.pathname}`}
                            method="post"
                          >
                            <button type="submit" className="button">
                              Logout
                            </button>
                            <input
                              type="hidden"
                              name="redirectTo"
                              value={app.route.url?.pathname}
                            />
                          </Form>
                        );
                      }}
                    </AppContext.Consumer>*/}
                  </Nav.Item>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </nav>
      <div className="d-flex" id="wrapper">
        {/*        <AppContext.Consumer>
          {(app) => {
            return (
              <div
                className={classNames("border-end", "bg-white", {
                  "sb-sidenav-toggled": app.showSidebar,
                })}
                id="sidebar-wrapper"
              >
                <div className="sidebar-heading border-bottom bg-light">
                  Start Bootstrap
                </div>
                <div className="list-group list-group-flush">
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#"
                  >
                    Dashboard
                  </a>{" "}
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#!"
                  >
                    Shortcut
                  </a>{" "}
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#!"
                  >
                    Overview
                  </a>{" "}
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#!"
                  >
                    Events
                  </a>{" "}
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#!"
                  >
                    Profile
                  </a>{" "}
                  <a
                    className="list-group-item list-group-item-action list-group-item-light p-3"
                    href="#!"
                  >
                    Status
                  </a>
                </div>
              </div>
            );
          }}
        </AppContext.Consumer>*/}
        <div className="container-fluid bg-light">
          <main style={{ padding: "1rem" }}>{children}</main>
        </div>
      </div>{" "}
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
*/
export function ErrorBoundary({ error }: { error: Error }) {
  console.dir(error);
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
