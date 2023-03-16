import type { ActionFunction, LoaderFunction } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";

import { destroy } from "~/utils/session.server";

export const action: ActionFunction = async ({ request, params }) => {
  console.log("logout");
  const form = await request.formData();
  const redirect = form.get("redirectTo");
  console.log(redirect);
  return destroy(request, redirect as string);
};

export const loader: LoaderFunction = async () => {
  console.log("logout loader");
  return redirect("/");
};
