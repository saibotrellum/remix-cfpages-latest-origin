import env from "~/lib/env";
import { mongodb } from "@saibotsivad/mongodb";
import type { Int } from "~/utils/types";
import { AppLoadContext } from "@remix-run/cloudflare";
//
// class MongodbError extends Error {
//   constructor({ error, error_code, link }, status) {
//     super(error);
//     this.name = "MongodbError";
//     this.status = status;
//     if (error_code) this.title = error_code;
//     if (link) this.meta = { link };
//   }
// }
export type TMongoDaoInitializer = {
  collection: string;
  overrides?: null | TMongoConnection;
  fetch?: typeof globalThis.fetch;
  interpose?: (passThrough: any) => any;
};
export type TMongoUpdate = Record<string, unknown>;
export type TMongoAggregatePipeline = Record<string, unknown>;
export type TMongoFilter = Record<string, unknown>;
export type TMongoProjection = { [k: string]: unknown };
export type TMongoSort = { [k: string]: 1 | -1 | { $meta: "textScore" } };

/**
 * A document from a MongoDB collection
 */
export type TMongoDocument<IdType = any> = {
  /**
   * The id of the document.
   */
  _id: IdType;
};

/**
 * A new document with an optional _id defined.
 */
export type TMongoNewDocument<T extends TMongoDocument> = Omit<T, "_id"> &
  Partial<Pick<T, "_id">>;

/**
 * Result of inserting one document
 */
export type InsertOneResult<IdType> = {
  /**
   * The id of the inserted document
   */
  readonly insertedId: IdType;
};

/**
 * Result of inserting many documents
 */
export type InsertManyResult<IdType> = {
  /**
   * The ids of the inserted documents
   */
  readonly insertedIds: IdType[];
};

/**
 * Result of deleting documents
 */
export type DeleteResult = {
  /**
   * The number of documents that were deleted.
   */
  readonly deletedCount: number;
};

/**
 * Result of updating documents
 */
export type TUpdateResult<IdType> = {
  /**
   * The number of documents that matched the filter.
   */
  readonly matchedCount: number;

  /**
   * The number of documents matched by the query.
   */
  readonly modifiedCount: number;

  /**
   * The identifier of the inserted document if an upsert took place.
   *
   * See [[RemoteUpdateOptions.upsert]].
   */
  readonly upsertedId?: IdType;
};

/**
 * Options passed when updating documents
 */
export type TUpdateOptions = {
  /**
   * A filter applied to limit the documents being queried for.
   * @link https://www.mongodb.com/docs/manual/tutorial/query-documents/
   */
  readonly filter: TMongoFilter;

  /**
   * A filter applied to limit the documents being queried for.
   * @link https://www.mongodb.com/docs/manual/tutorial/query-documents/
   */
  readonly update: TMongoUpdate;
  /**
   * When true, creates a new document if no document matches the query.
   */
  readonly upsert?: boolean;
};
/**
 * Options passed when finding a signle document
 */
export type TFindOneOptions = {
  /**
   * Limits the fields to return for all matching documents.
   * See [Tutorial: Project Fields to Return from Query](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results/).
   * @link https://www.mongodb.com/docs/manual/tutorial/project-fields-from-query-results/
   */
  readonly projection?: TMongoProjection;
  /**
   * A filter applied to limit the documents being queried for.
   * @link https://www.mongodb.com/docs/manual/tutorial/query-documents/
   */
  readonly filter?: TMongoFilter;
};

/**
 * Options passed when finding a multiple documents
 */
export type TFindOptions = TFindOneOptions & {
  /**
   * The order in which to return matching documents.
   */
  readonly sort?: TMongoSort;
  /**
   * The maximum number of documents to return.
   */
  readonly limit?: Int;
  /**
   * The maximum number of documents to return.
   */
  readonly skip?: Int;
};

/**
 * Options passed when finding and modifying a signle document
 */
export type TFindOneAndModifyOptions = TFindOneOptions & {
  /**
   * Optional. Default: false.
   * A boolean that, if true, indicates that MongoDB should insert a new document that matches the
   * query filter when the query does not match any existing documents in the collection.
   */
  readonly upsert?: boolean;
};

export type TMongoDao<T extends TMongoDocument> = {
  aggregate: (
    parameters: { pipeline: TMongoAggregatePipeline[] },
    overrides?: TMongoConnection
  ) => Promise<{ documents: Array<Object> }>;
  deleteOne: (
    parameters: { filter: TMongoFilter },
    overrides?: TMongoConnection
  ) => Promise<{ deletedCount: Number }>;
  deleteMany: (
    parameters: { filter: TMongoFilter },
    overrides?: TMongoConnection
  ) => Promise<{ deletedCount: Number }>;
  find: (
    parameters: TFindOptions,
    overrides?: TMongoConnection
  ) => Promise<{ documents: Array<Object> }>;
  findOne: (
    parameters: TFindOneOptions,
    overrides?: TMongoConnection
  ) => Promise<{ document: Object }>;
  insertOne: (
    parameters: { document: TMongoNewDocument<T> },
    overrides?: TMongoConnection
  ) => Promise<InsertOneResult<T["_id"]>>;
  insertMany: (
    parameters: { documents: TMongoNewDocument<T>[] },
    overrides?: TMongoConnection
  ) => Promise<InsertManyResult<T["_id"]>>;
  replaceOne: (
    parameters: TFindOneAndModifyOptions,
    overrides?: TMongoConnection
  ) => Promise<TUpdateResult<T["_id"]>>;
  updateOne: (
    parameters: TUpdateOptions,
    overrides?: TMongoConnection
  ) => Promise<TUpdateResult<T["_id"]>>;
  updateMany: (
    parameters: TUpdateOptions,
    overrides?: TMongoConnection
  ) => Promise<TUpdateResult<T["_id"]>>;
};

const DefaulMongoConnection: TMongoConnection = {
  apiKey: "",
  apiUrl: "",
  dataSource: "",
  database: "",
};

export function setDefaultMongoConnection(conObj: TMongoConnection) {
  Object.assign(DefaulMongoConnection, conObj);
  console.log();
}

export function mongo<T extends TMongoDocument>({
  collection,
  overrides = null as null | TMongoConnection,
  fetch = globalThis.fetch,
  interpose = (passThrough) => passThrough,
}: TMongoDaoInitializer) {
  if (!collection || collection == "") throw "NO MONGODB COLLECTION DEFINED";

  console.log("mongoenv", collection, DefaulMongoConnection);

  const connection = { ...DefaulMongoConnection, collection };

  if (overrides) Object.assign(connection, overrides);

  return mongodb(connection) as TMongoDao<T>;
}

export type TMongoConnection = {
  apiKey: string;
  apiUrl: string;
  dataSource: string;
  database: string;
  collection?: string;
};
type TMongoRequest<RequestOptions> = {
  parameters: RequestOptions;
  overrides?: TMongoConnection;
};
