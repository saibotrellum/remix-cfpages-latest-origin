import type { MetaFunction } from "@remix-run/cloudflare";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import env, { setEnv } from "~/lib/env";
import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "react-router";
import { setDefaultMongoConnection } from "~/lib/storage/mongo.server";
import { setKVNamespace } from "~/lib/storage/kv.server";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request, context, params }) => {
  console.log("bla");
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
  const data = useLoaderData();

  console.log(data);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
