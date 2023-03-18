import type { AppLoadContext, DataFunctionArgs } from "@remix-run/cloudflare";
import type { TResponseMessage } from "~/components/SliderAdmin";

function parseRange(
  encoded: string | null
): undefined | { offset: number; end: number; length: number } {
  if (encoded === null) {
    return;
  }

  const parts = encoded.split("bytes=")[1]?.split("-") ?? [];
  if (parts.length !== 2) {
    throw new Error(
      "Not supported to skip specifying the beginning/ending byte at this time"
    );
  }

  return {
    offset: Number(parts[0]),
    end: Number(parts[1]),
    length: Number(parts[1]) + 1 - Number(parts[0]),
  };
}

function objectNotFound(objectName: string): Response {
  return new Response(
    `<html><body>R2 object "<b>${objectName}</b>" not found</body></html>`,
    {
      status: 404,
      headers: {
        "content-type": "text/html; charset=UTF-8",
      },
    }
  );
}

export async function readR2(
  filepath: string,
  context: AppLoadContext
): Promise<R2ObjectBody | null> {
  const currentValue = await getR2(context).get(filepath);
  return currentValue;
}
export async function deleteR2(
  filepath: string,
  context: AppLoadContext
): Promise<boolean> {
  const r2Object = await getR2(context).get(filepath);
  if (!r2Object) return false;
  await getR2(context).delete(filepath);
  return true;
}
export async function listR2(context: AppLoadContext): Promise<R2Objects> {
  const options: R2ListOptions = {
    // prefix: url.searchParams.get("prefix") ?? undefined,
    // delimiter: url.searchParams.get("delimiter") ?? undefined,
    // cursor: url.searchParams.get("cursor") ?? undefined,
    // @ts-ignore
    include: ["customMetadata", "httpMetadata"],
  };
  //console.log(JSON.stringify(options))

  const listing = await getR2(context).list(options);
  return listing;
}

export async function putR2(
  key: string,
  value:
    | string
    | Blob
    | ArrayBufferView
    | ArrayBuffer
    | ReadableStream<any>
    | null,
  context: AppLoadContext,
  options?: R2PutOptions | undefined
) {
  const put = await getR2(context).put(key, value, options);
  return put;
}
function getR2(context: AppLoadContext): R2Bucket {
  if (!context) {
    throw new Error("context not available");
  }

  if (!context.CMS_R2) {
    throw new Error("context.CMS_R2 not available");
  }

  if (!isR2Bucket(context.CMS_R2)) {
    throw new Error("context.CMS_R2 doesnt look like R2Bucket");
  }

  return context.CMS_R2;
}
function isR2Bucket(r2Bucket: any): r2Bucket is R2Bucket {
  if (r2Bucket == null) return false;
  if (typeof r2Bucket !== "object") return false;

  if (!("get" in r2Bucket) || typeof r2Bucket.get !== "function") {
    return false;
  }

  if (!("put" in r2Bucket) || typeof r2Bucket.put !== "function") {
    return false;
  }

  return true;
}

export const r2 = async ({
  request,
  context,
}: DataFunctionArgs): Promise<Response> => {
  const url = new URL(request.url);
  const objectName = url.pathname.slice(5);

  console.log(`${request.method} object ${objectName}: ${request.url}`);
  if (request.method === "GET" || request.method === "HEAD") {
    if (objectName === "") {
      if (request.method == "HEAD") {
        return new Response(undefined, { status: 400 });
      }

      const options: R2ListOptions = {
        prefix: url.searchParams.get("prefix") ?? undefined,
        delimiter: url.searchParams.get("delimiter") ?? undefined,
        cursor: url.searchParams.get("cursor") ?? undefined,
        // @ts-ignore
        include: ["customMetadata", "httpMetadata"],
      };
      //console.log(JSON.stringify(options))

      const listing = await context.CMS_R2.list(options);
      return new Response(JSON.stringify(listing), {
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      });
    }

    if (request.method === "GET") {
      const range = parseRange(request.headers.get("range"));
      const object = await context.CMS_R2.get(objectName, {
        range,
        onlyIf: request.headers,
      });

      if (object === null) {
        return objectNotFound(objectName);
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set("etag", object.httpEtag);
      if (range) {
        headers.set(
          "content-range",
          `bytes ${range.offset}-${range.end}/${object.size}`
        );
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const status = object.body ? (range ? 206 : 200) : 304;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return new Response(object.body, {
        headers,
        status,
      });
    }

    const object = await context.CMS_R2.head(objectName);

    if (object === null) {
      return objectNotFound(objectName);
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    return new Response(null, {
      headers,
    });
  }
  if (request.method === "PUT" || request.method == "POST") {
    const object = await context.CMS_R2.put(objectName, request.body, {
      httpMetadata: request.headers,
    });
    return new Response(null, {
      headers: {
        etag: object.httpEtag,
      },
    });
  }
  if (request.method === "DELETE") {
    await context.CMS_R2.delete(url.pathname.slice(1));
    return new Response();
  }

  return new Response(`Unsupported method`, {
    status: 400,
  });
};

export default r2;
