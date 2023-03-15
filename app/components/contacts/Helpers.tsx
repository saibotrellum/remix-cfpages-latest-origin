//import remixI18n from "~/i18n.server";
import { faker } from "@faker-js/faker/locale/de";

export type TContactTypes = "organisation" | "person";

export type TTranslatedOptions = {
  key: number;
  val: string;
};

export function getFakeContact(): TContact {
  return {
    _id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    orgname: faker.company.name(),
    type: "organisation",
    address: faker.address.street() + " " + faker.address.buildingNumber(),
    address2: faker.address.buildingNumber(),
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    country: "Deutschland",
    internNote: "interne Adressnotiz",
    externNote: "externe Adressnotiz",
    contactPersons: [
      getFakeContactPerson(true),
      getFakeContactPerson(),
      getFakeContactPerson(),
    ],
  };
}
export function getFakeContactPerson(
  isPrimary: boolean = false
): TContactPerson {
  return {
    _id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    primary: isPrimary,
    phone: faker.phone.number(),
    mobile: faker.phone.number(),
    fax: faker.phone.number(),
    email: faker.internet.email(),
    role: "Zuständigkeit",
    birthdate: "Geburtsdatum",
  };
}
export function fetchSalutations(): TTranslatedOptions[] {
  return [
    { key: 1, val: "Mr." },
    { key: 2, val: "Mrs." },
    { key: 3, val: `Other` },
  ];
}

export const fetchTitles = function (): TTranslatedOptions[] {
  return [
    { key: 1, val: "Dr." },
    { key: 2, val: "Prof." },
    { key: 3, val: `Other` },
  ];
};

export const fetchCountries = function (): TTranslatedOptions[] {
  return [
    { key: 1, val: "Deutschland" },
    { key: 2, val: "Vereinigte Staaten" },
  ];
};

export function mapTranslate(request: Request, data: TTranslatedOptions[]) {
  // const locale = await remixI18n.getLocale(request);
  // const t = await remixI18n.getFixedT(request, "common");
  return data.map((cur) => {
    return { key: cur.key, val: cur.val };
  });
}

export type TContact = {
  _id: string;
  type: TContactTypes;
  orgname: string;
  firstname: string;
  lastname: string;
  address: string;
  address2: string;
  zip: string;
  city: string;
  country: string;
  internNote: string;
  externNote: string;
  contactPersons: TContactPerson[];
};

export type TContactPerson = {
  _id: string;
  primary: boolean;
  firstname: string;
  lastname: string;
  phone: string;
  mobile: string;
  fax: string;
  email: string;
  role: string;
  birthdate: string;
};

export type TContactObject = {
  name: string;
  width: number;
  length: number;
  notes: string;
  image: string;
};

export type TContactEvent = {
  name: string;
  dates: Date[];
  objects: TContactObject[];
  specificAgreement: string;
  internalMemo: string;
  standLocation: string;
};
