import { faker } from "@faker-js/faker/locale/de";

export function getFakeContact(): TContact {
  return {
    _id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    orgname: faker.company.name(),
    title: "1",
    salutation: "1",
    type: "organisation",
    address: faker.address.street() + " " + faker.address.buildingNumber(),
    address2: faker.address.buildingNumber(),
    zip: faker.address.zipCode(),
    city: faker.address.city(),
    country: "1",
    internNote: "interne Adressnotiz",
    externNote: "externe Adressnotiz",
    other: {
      social: [{ label: "twitter", value: "@" + faker.random.word() }],
      numbers: [{ label: "email2", value: faker.internet.email() }],
    },
    www: faker.internet.url(),
    facebook: "profile.php?id=" + faker.random.numeric(),
    instagram: "@" + faker.random.word(),
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
    title: "1",
    salutation: "1",

    primary: isPrimary,
    phone: faker.phone.number(),
    mobile: faker.phone.number(),
    fax: faker.phone.number(),
    email: faker.internet.email(),
    www: faker.internet.url(),
    facebook: "profile.php?id=" + faker.random.numeric(),
    instagram: "@" + faker.random.word(),
    other: {
      social: [{ label: "twitter", value: "@" + faker.random.word() }],
      numbers: [{ label: "email2", value: faker.internet.email() }],
    },

    role: "Marketing",
    birthdate: "01.01.1970",
  };
}

export function fetchSalutations(): TTranslatedOptions[] {
  return [
    { key: 1, label: "Mr." },
    { key: 2, label: "Mrs." },
    { key: 3, label: `Other` },
  ];
}

export const fetchTitles = function (): TTranslatedOptions[] {
  return [
    { key: 1, label: "Dr." },
    { key: 2, label: "Prof." },
    { key: 3, label: `Other` },
  ];
};

export const fetchCountries = function (): TTranslatedOptions[] {
  return [
    { key: 1, label: "Deutschland" },
    { key: 2, label: "Vereinigte Staaten" },
  ];
};

export function mapTranslate(request: Request, data: TTranslatedOptions[]) {
  // const locale = await remixI18n.getLocale(request);
  // const t = await remixI18n.getFixedT(request, "common");
  return data.map((cur) => {
    return { key: cur.key, label: cur.label };
  });
}

export type TContactEditModules = "main" | "media" | "objects" | "events";

export type TContactTypes = "organisation" | "person";

export type TTranslatedOptions = {
  key: number;
  label: string;
};
export type TContactOtherFields = { [k in TContactInfoGroups]?: TLabelValue[] };
export type TContactInfoGroups = "numbers" | "social" | "categories";
export type TLabelValue = { label: string; value: string };

export type TSocialFields = {
  www: string;
  facebook: string;
  instagram: string;
  other: TContactOtherFields;
};

export type TContact = TSocialFields & {
  _id?: string;
  type: TContactTypes;
  orgname: string;
  title: string;
  salutation: string;
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
type TPersonInfo = {
  title: number | string;
  salutation: number | string;
  firstname: string;
  lastname: string;
};
export type TContactPerson = TSocialFields &
  TNumbersFields &
  TPersonInfo & {
    _id?: string;
    primary: boolean;
    role: string;
    birthdate: string;
    other: TContactOtherFields;
  };
type TNumbersFields = {
  phone: string;
  mobile: string;
  fax: string;
  email: string;
};

export type TContactObject = {
  id: string;
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
export type asElement<T> = (T & keyof JSX.IntrinsicElements) | undefined;
