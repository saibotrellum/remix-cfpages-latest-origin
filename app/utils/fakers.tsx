import { faker } from "@faker-js/faker";
import type { TContact, TContactEvent, TContactObject } from "~/lib/Helpers";

export function fakeContact(
  loopCnt = 1,
  keys: boolean | string[] = false
): TContact {
  return {
    _id: "",
    address: "",
    address2: "",
    city: "",
    contactPersons: [],
    country: "",
    externNote: "",
    internNote: "",
    salutation: "",
    title: "",
    zip: "",
    type: loopCnt % 2 === 0 ? "organisation" : "person",
    orgname: faker.company.name(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
  };
}

export function fakeContactObject(
  loopCnt = 1,
  keys: boolean | string[] = false
): TContactObject {
  return {
    name: faker.random.words(2),
    width: faker.datatype.number(),
    length: faker.datatype.number(),
    image: faker.image.imageUrl(100, 480 * (100 / 640)),
    notes: faker.random.words(loopCnt * 2),
  };
}

export function fakeContactEvent(
  loopCnt = 1,
  keys: boolean | string[] = false
): TContactEvent {
  return {
    name: faker.random.words(2),
    dates: [faker.date.future(), faker.date.future()],
    objects: [fakeContactObject(), fakeContactObject()],
    specificAgreement: faker.lorem.paragraph(),
    internalMemo: faker.lorem.paragraph(),
    standLocation: `${faker.datatype.number(100)}`,
  };
}

const dataTypeFakers: {
  [key: string]: (loopCnt: number, keys: boolean | string[]) => any;
} = {
  ContactObject: fakeContactObject,
  ContactEvent: fakeContactEvent,
};

export function fakeData<T>(
  type: "Contact" | "ContactObject" | "ContactEvent",
  number = 1,
  keys: boolean | string[] = false
): T[] {
  const data = [];
  let val;
  for (let i = 0; i < number; i += 1) {
    /*eslint-disable */
    // @ts-ignore
    val = dataTypeFakers[type](number, keys);
    /* eslint-enable */
    data.push(val);
  }
  return data;
}
