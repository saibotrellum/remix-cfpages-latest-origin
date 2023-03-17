import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";
import * as build from "@remix-run/dev/server-build";

import type { AppLoadContext } from "@remix-run/cloudflare";

type Env = {
  ASSETS: Fetcher;
  ENVIRONMENT: "development" | "production" | "preview";
};

export type Context = EventContext<Env, string, unknown>;

declare module "@remix-run/server-runtime" {
  interface AppLoadContext extends Env {}
}
const handleRequest = createPagesFunctionHandler({
  build,
  mode: process.env.NODE_ENV,
  getLoadContext: (context) => {
    return Object.fromEntries(Object.entries(context.env)) as AppLoadContext;
  },
});

export function onRequest(context: Context) {
  return handleRequest(context);
}
