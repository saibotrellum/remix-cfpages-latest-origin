import type {
  InsertManyResult,
  InsertOneResult,
  TFindOneAndModifyOptions,
  TFindOneOptions,
  TFindOptions,
  TMongoAggregatePipeline,
  TMongoConnection,
  TMongoDaoInitializer,
  TMongoDocument,
  TMongoFilter,
  TMongoNewDocument,
  TUpdateOptions,
  TUpdateResult,
} from "~/lib/storage/mongo.server";
import { mongo } from "~/lib/storage/mongo.server";

export function getDao({
  collection,
  interpose = (passThrough) => passThrough,
  overrides = undefined,
}: {
  collection: string;
  interpose?: (passThrough: any) => any;
  overrides?: TMongoConnection;
}) {
  const db = mongo<TMongoDocument<string>>({
    collection,
    overrides,
    fetch,
    interpose,
  });
  //  find: () => () => Promise<{ documents: Array<Object> }>;
  return {
    db,
    aggregate: function (
      parameters: { pipeline: TMongoAggregatePipeline[] },
      overrides?: TMongoConnection
    ) {
      return db.aggregate(parameters, overrides);
    },
    deleteOne: function (
      parameters: { filter: TMongoFilter },
      overrides?: TMongoConnection
    ) {
      return db.deleteOne(parameters, overrides);
    },
    deleteMany: function (
      parameters: { filter: TMongoFilter },
      overrides?: TMongoConnection
    ) {
      return db.deleteMany(parameters, overrides);
    },
    find: function (parameters: TFindOptions, overrides?: TMongoConnection) {
      return db.find(parameters, overrides);
    },
    findOne: function (
      parameters: TFindOneOptions,
      overrides?: TMongoConnection
    ) {
      return db.find(parameters, overrides);
    },
    insertOne: function (
      parameters: { document: TMongoNewDocument<TMongoDocument> },
      overrides?: TMongoConnection
    ) {
      return db.insertOne(parameters, overrides);
    },
    insertMany: function (
      parameters: { documents: TMongoNewDocument<TMongoDocument>[] },
      overrides?: TMongoConnection
    ) {
      return db.insertMany(parameters, overrides);
    },
    replaceOne: function (
      parameters: TFindOneAndModifyOptions,
      overrides?: TMongoConnection
    ) {
      return db.replaceOne(parameters, overrides);
    },
    updateOne: function (
      parameters: TUpdateOptions,
      overrides?: TMongoConnection
    ) {
      return db.updateOne(parameters, overrides);
    },
    updateMany: function (
      parameters: TUpdateOptions,
      overrides?: TMongoConnection
    ) {
      return db.updateMany(parameters, overrides);
    },
  };
}

type MapTypes<TypeObj extends { key: string; [k: string]: any }> = {
  [TypeKey in TypeObj as TypeKey["key"]]: TypeKey[TypeKey["key"]];
};
type Test<RequestOptions> = MapTypes<
  | { key: "parameters"; def: RequestOptions }
  | { key: "overrides"; def: TMongoConnection }
>;

export default getDao;
