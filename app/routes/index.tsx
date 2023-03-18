import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useLoaderData } from "react-router";
//import { mongodb } from "@saibotsivad/mongodb";
import todoDao from "~/dao/todoDao";
import dos from "~/lib/later";
import env from "~/lib/env";
import { setDefaultMongoConnection } from "~/lib/storage/mongo.server";
//import env, { setEnv } from "~/lib/env";
//import * as Realm from "realm-web"

const REGION = "eu-central-1"; // or pin to a region with e.g. 'us-east-1'
const URL_PREFIX = `https://${REGION}.aws.data.mongodb-api.com/app`;
const URL_SUFFIX = "endpoint/data/v1/action";
const ACTION = "find"; // or 'insertOne' etc.

async function dataApiFind(context) {
  // the API key is managed via the MongoDB Atlas dashboard

  const apiKey = context.MONGODB_API_KEY;
  // the API ID is assigned by MongoDB Atlas on setup
  const apiId = context.MONGODB_API_ID;
  const url = `${URL_PREFIX}/${apiId}/${URL_SUFFIX}/${ACTION}`;
  console.log(url);
  console.log(
    JSON.stringify({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Request-Headers": "*",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        // the cluster name from Atlas, e.g. 'Cluster0'
        // @ts-ignore
        dataSource: context.MONGODB_DATA_SOURCE,
        // the database name, e.g. 'myApp'
        // @ts-ignore
        database: context.MONGODB_DATABASE,
        // the collection name, e.g. 'tasks'
        // @ts-ignore
        collection: context.MONGODB_COLLECTION,
        filter: {},
      }),
    })
  );
  let bla = fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Request-Headers": "*",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      // the cluster name from Atlas, e.g. 'Cluster0'
      // @ts-ignore
      dataSource: context.MONGODB_DATA_SOURCE,
      // the database name, e.g. 'myApp'
      // @ts-ignore
      database: context.MONGODB_DATABASE,
      // the collection name, e.g. 'tasks'
      // @ts-ignore
      collection: context.MONGODB_COLLECTION,
      filter: {},
    }),
  });

  const x = await bla;
  console.log("fetcc", await x.text());
  console.log("body", await x.body);
  return bla;
}

export const loader: LoaderFunction = async ({ request, context, params }) => {
  //console.log("env", env.getData());
  // const documents = await dataApiFind(context);
  // console.log("documents", documents);

  const todos = todoDao();
  let data = await todos.find({});
  console.log("data", data);

  //let { documents } = await db.find({ filter: {} });
  //console.log(documents);
  /*
            
              const todos = todoDao.setData("balbal");
              console.log("con", todos.getData());
              dos();
              console.log("con2", todos.getData());
            */

  return json({});
  return new Response(JSON.stringify(documents), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export default function Index() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome aaato Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
