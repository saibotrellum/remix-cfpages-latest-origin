import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo, useState } from "react";
import { createAppSession, loginSession } from "~/utils/session.server";
import { json } from "@remix-run/cloudflare";
import type { TTranslatedOptions } from "~/components/contacts/Helpers";
import {
  fetchCountries,
  fetchSalutations,
  fetchTitles,
  mapTranslate,
} from "~/components/contacts/Helpers";

export type TSelects = {
  salutations: TTranslatedOptions[];
  titles: TTranslatedOptions[];
  countries: TTranslatedOptions[];
};
export type TAppContextSettings = {
  selects: TSelects;
  locale: string;
  environment?: "development" | "production" | "test";
};

export function getSettings(
  request: Request,
): TAppContextSettings {

  let settings = {
    locale: "de",
    selects: {
      salutations: mapTranslate(request, fetchSalutations()),
      titles: mapTranslate(request, fetchTitles()),
      countries: mapTranslate(request, fetchCountries()),
    }//,  //process.env.ENVIRONMENT
    //environment: ENVIRONMENT,
  };
  return settings;
}

// Creating a session context to manage and access all user/session
// related functions across different component and pages.
export const AppContext = createContext({
  user: null as unknown as TAppContextUser,
  setUser: (user: TAppContextUser | null) => {},
  route: null as unknown as TAppContextRoute,
  setRoute: (options: { url: string; title: string }) => {
    console.log("old");
  },
  settings: null as unknown as TAppContextSettings,
  setSettings: (options: TAppContextSettings) => {},
  showSidebar: true,
  toggleSidebar: () => {
    console.log("old");
  },
});
console.log("App outside");
export const AppContextProvider = ({
  children,
  initUser,
  initRoute,
  initSettings,
}: {
  children: ReactNode;
  initUser: TAppContextUser;
  initRoute: TAppContextRoute;
  initSettings: TAppContextSettings;
}) => {
  console.log("App Provider");
  const [user, setUser] = useState<TAppContextUser>(initUser);
  const [route, setRouteState] = useState<TAppContextRoute>(initRoute);
  const [settings, setSettingsState] =
    useState<TAppContextSettings>(initSettings);
  const [showSidebar, setSidebar] = useState(true);
  function toggleSidebar() {
    console.log("new");
    setSidebar((prevState)=>!prevState);
  }

  function setSettings(options: TAppContextSettings) {
    return setSettingsState(options);
  }

  const setRoute = (options: { url: string; title: string }) => {
    //console.log(prepRoute(options));
    return setRouteState(prepRoute(options));
  };
  const value = useMemo(
    () => ({
      user,
      setUser,
      settings,
      setSettings,
      showSidebar,
      toggleSidebar,
      setRoute,
    }),
    [user, settings, showSidebar]
  );

  // const value = {
  //   user,
  //   setUser,
  //   route,
  //   setRoute,
  //   settings,
  //   setSettings,
  //   showSidebar,
  //   toggleSidebar,
  // };

  // @ts-ignore
  return (
    // @ts-ignore
    <AppContext.Provider value={{ route, ...value }}>
      {children}
    </AppContext.Provider>
  );
};

export const appLogin = async (
  username: string,
  password: string,
  redirectTo: string
) => {
  try {
    const user = await loginSession(username, password);
    return createAppSession(user, redirectTo);
  } catch (err: any) {
    console.dir(err.message);
    throw new Response(err, {
      status: 500,
    });
    if ((err.message = "invalid username/password"))
      return json(
        {
          fields: { username, password, loginType: "login" },
          formError: `Username/Password combination is incorrect`,
        },
        { status: 400 }
      );
    else
      throw new Response("Not Found", {
        status: 404,
      });
  }
};
// context consumer helper
export const useAppContext = () => {
  const context = useContext(AppContext);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }
  return context;
};

export type TAppContextState = {
  user?: TAppContextUser;
  route?: TAppContextRoute;
  settings?: TAppContextSettings;
};
export type TUserPermissions = {
  c?: boolean;
  r?: boolean;
  u?: boolean;
  d?: boolean;
};
export type TAppContextUser = {
  id: string;
  deviceId: string;
  permissions?: { [key: string]: TUserPermissions[] };
};

export type TAppContextRoute = {
  title?: string;
  url?: {
    href: string;
    origin: string;
    protocol: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    searchParams: URLSearchParams;
    hash: string;
  };
};

export type LoaderData = {
  user?: TAppContextUser;
  settings?: TAppContextSettings;
  environment?: TAppContextSettings;
  route: TAppContextRoute;
  curPath?: string;
};

export function prepRoute(options: {
  url: string;
  title: string;
}): TAppContextRoute {
  const url = new URL(options.url);
  //console.log(url);

  return {
    title: options.title,
    url: {
      href: url.href,
      origin: url.origin,
      protocol: url.protocol,
      username: url.username,
      password: url.password,
      host: url.host,
      hostname: url.hostname,
      port: url.port,
      pathname: url.pathname,
      search: url.search,
      searchParams: url.searchParams,
      hash: url.hash,
    },
  };
}
