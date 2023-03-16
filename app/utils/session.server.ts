import {
  createCookieSessionStorage,
  isSession,
  redirect,
} from "@remix-run/cloudflare";


import type { TAppContextUser } from "~/components/contexts/App";
import type { TUserPermissions } from "~/components/contexts/App";
import {NODE_ENV} from "@pkgr/utils";

console.log('CHANGE SESSION_SECRET')
//process.env.SESSION_SECRET
const sessionSecret = 'SESSION_SECRET';
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}


const storage = createCookieSessionStorage({
  cookie: {
    name: "_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: ["s3cr3t"], // replace this with an actual secret
    secure: "production" === "production", // enable this in prod only
  },//process.env.NODE_ENV
});


export const loginSession = async (username: string, password: string) => {

  const user: TAppContextUser = {
    id: "12345",
    deviceId: "654321",
    permissions: {bla:[{c: true, r: true, u:false, d:true}]} as {
      [key: string]: TUserPermissions[];
    },
  };

  return user;
};

export async function getSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function destroy(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getSession(request);
  const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
  return redirect(`/login?${searchParams}`, {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function getUserId(request: Request) {
  const session = await getSession(request);
  if (session.has("user")) {
    const userId = session.get("user").id;
    if (!userId || typeof userId !== "string") return null;
    return userId;
  }
  return null;
}
export async function getUser(request: Request) {
  const session = await getSession(request);
  if (session.has("user")) {
    const user = session.get("user");
    return user;
  }
  return null;
}
export async function requireSession(
  request: Request,
  redirectTo: string = new URL(request.url).pathname,
) {
  const session = await getSession(request);

  if (
    !isSession(session) ||
    !session.has("user") ||
    typeof session.get("user")?.id !== "string"
  ) {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    return redirect(`/login?${searchParams}`);
  }
  return null;
}

export async function set(name: string, value: any, redirectTo: string) {
  const session = await storage.getSession();

  session.set(name, value);

  //session.set("user", new UserSession(user));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}

export async function createAppSession(
  user: TAppContextUser,
  redirectTo: string
) {
  const session = await storage.getSession();

  session.set("user", user);

  //session.set("user", new UserSession(user));
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
}
//
// export async function getUser(request: Request) {
//   const userId = await getUserId(request);
//   if (typeof userId !== "string") {
//     return null;
//   }
//
//   try {
//     // const user = await db.user.findUnique({
//     //   where: { id: userId },
//     //   select: { id: true, username: true },
//     // });
//     // return user;
//     return;
//   } catch {
//     throw logout(request);
//   }
// }
