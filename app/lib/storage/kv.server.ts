import type { AppLoadContext } from "@remix-run/cloudflare";

const namespaces: { [k: string]: KVNamespace } = {};

export function setKVNamespace(name: string, namespace: KVNamespace) {
  namespaces[name] = namespace;
}

export async function readKV<K>(
  key: string,
  namespaceName: string = "DEFAULT"
): Promise<string | null> {
  const currentValue = await getKv(namespaceName).get(key);
  return currentValue;
}

export async function listKV<K>(
  namespaceName: string = "DEFAULT"
): Promise<KVNamespaceListResult<any>> {
  return await getKv(namespaceName).list();
}

export async function putKV(
  key: string,
  value: string,
  namespaceName: string = "DEFAULT"
): Promise<null> {
  const put = await getKv(namespaceName).put(key, value);
  return null;
}

/**
 * Get Cloudflare KV namespace from request context
 */
export function getKv(namespaceName: string = "DEFAULT"): KVNamespace {
  if (!namespaceName) {
    throw new Error("KV namespace undefinde");
  }

  if (!namespaces.hasOwnProperty(namespaceName)) {
    throw new Error("context.CMS_KV not available");
  }

  if (!isKvNamespace(namespaceName)) {
    throw new Error("context.CMS_KV doesnt look like KVNamespace");
  }

  return namespaces[namespaceName];
}

function isKvNamespace(namespaceName: string): boolean {
  if (namespaces[namespaceName] == null) return false;
  if (typeof namespaces[namespaceName] !== "object") return false;

  if (
    !("get" in namespaces[namespaceName]) ||
    typeof namespaces[namespaceName].get !== "function"
  ) {
    return false;
  }

  if (
    !("put" in namespaces[namespaceName]) ||
    typeof namespaces[namespaceName].put !== "function"
  ) {
    return false;
  }

  return true;
}
