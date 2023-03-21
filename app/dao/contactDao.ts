import { getDao } from "~/dao/dao";
import env from "~/lib/env";
const collection = "contacts";
console.log("tdo", env.getData());

//export const dao = getDao({ collection });
const contactDao = () => {
  const dao = getDao({ collection });

  return { ...dao };
};
export default contactDao;
