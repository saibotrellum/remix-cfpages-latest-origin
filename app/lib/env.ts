export type Env = {
  ASSETS: Fetcher;
  ENVIRONMENT: "development" | "production" | "preview";
  REALM_API_ID: string;
  REALM_API_KEY: string;
  MONGODB_API_ID: string;
  MONGODB_API_KEY: string;
  MONGODB_API_ENDPOINT: string;
  MONGODB_DATA_SOURCE: string;
  MONGODB_DATABASE: string;
  MONGODB_COLLECTION: string;
  SESSION_SECRET: string;
};

type TEnv = Env & {
  setEnv: (data: { [k: string]: any }) => TEnv;
  getData: () => Env;
  getEnv: () => TEnv;
  get: (key: string) => any;
  set: (key: string, value: string) => TEnv;
  [k: string]: any;
};
let envData: Env = {} as Env;

export function setEnv(data: Env) {
  envData = data;
  return env;
}

function getData() {
  return envData;
}

function getEnv() {
  return env;
}

function get<Key extends keyof Env>(key: Key) {
  return envData[key];
}

function set<Key extends keyof Env>(key: Key, value: any) {
  envData[key] = value;
  return env;
}

const env = { ...envData, setEnv, set, get, getData, getEnv } as TEnv;
export default env;
