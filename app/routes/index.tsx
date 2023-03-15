import { Link, useLoaderData, useLocation } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useAppContext } from "~/components/contexts/App";
import { t } from "~/utils";
import { useEffect } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  let loaderData = {
    title: t("ContactControl Event Management"),
    url: request.url,
  };
  return json(loaderData);
};
export default function Index() {
  // useEffect(() => {
  // });

  console.log("index");
  //const loaderData = useLoaderData();
  //console.dir(loaderData);
  //const app = useAppContext();
  // app.setUser("test" as unknown as TAppContextUser);
  // const { user, setUser } = useContext(AppContext);
  // setUser("test" as unknown as TAppContextUser);

  // console.dir(loaderData);
  // console.dir(app);

  // const session = getSession(loader.request);
  //
  // console.log("session");
  // session.then((session) => {
  //   console.log(session.data);
  // });

  return (
    <main style={{ padding: "1rem" }}>
      <p>
        App Dashboard! -
        <Link to="/contacts">App Dashboard - gehe zu Kontakt Dashboard</Link>
        {/*{*/}
        {/*  // @ts-ignore*/}
        {/*  app.route?.url.pathname*/}
        {/*}*/}
      </p>
    </main>
  );
}

// routes/parent.tsx
export const handle = {
  breadcrumb: () => <Link to="/">CC Dashboard</Link>,
};
