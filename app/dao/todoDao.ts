import { getDao } from "~/dao/dao";
import env from "~/lib/env";
const collection = "todos";
console.log("tdo", env.getData());

//export const dao = getDao({ collection });
const todoDao = () => {
  const dao = getDao({ collection });

  return { ...dao };
};
export default todoDao;
