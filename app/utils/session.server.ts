import {
  createCookieSessionStorage,
  isSession,
  redirect,
} from "@remix-run/node";

import Realm from "realm";
import type { TAppContextUser } from "~/components/contexts/App";
import type { TUserPermissions } from "~/components/contexts/App";
const realm = new Realm.App(process.env.ATLAS_APP_ID as string);

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "CC_session",
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 Days
    httpOnly: true,
  },
});

export const loginSession = async (username: string, password: string) => {
  const credentials = Realm.Credentials.emailPassword(username, password);
  const realmUser = await realm.logIn(credentials);
  const user: TAppContextUser = {
    id: realmUser.id,
    deviceId: String(realmUser.deviceId),
    permissions: realmUser.customData?.permissions as {
      [key: string]: TUserPermissions[];
    },
  };
  await realmUser.logOut();
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
  redirectTo: string = new URL(request.url).pathname
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
