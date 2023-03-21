import classNames from "classnames";
import type { TContact, TContactTypes, TContactPerson } from "~/lib/Helpers";
import { fetchCountries, fetchSalutations, fetchTitles } from "~/lib/Helpers";
import React from "react";
import { Input, MyInput, MySubmitButton, Select } from "~/components/Form";
import { t } from "~/utils";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { zfd } from "zod-form-data";

/*
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
*/

/*export type TContact = {
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
};*/

export const BasicContactDef = z.object({
  _id: zfd.text(z.string().optional()),
  firstname: zfd.text(z.string().optional()),
  lastname: zfd.text(z.string().optional()),
  orgname: zfd.text(z.string().optional()),
  address: zfd.text(z.string().optional()),
  address2: zfd.text(z.string().optional()),
  zip: zfd.text(z.string().optional()),
  city: zfd.text(z.string().optional()),
  country: zfd.text(z.string().optional()),
  internNote: zfd.text(z.string().optional()),
  externNote: zfd.text(z.string().optional()),
});
export type TBasicContactDef = z.infer<typeof BasicContactDef>;
export const basicValidator = withZod(BasicContactDef);

const newsletters = ["Newsletter1", "Newsletter2"];
const origins = [];

/*export const loader: LoaderFunction = async () => {
    return json({ok: true});
};*/
export default function Basics({
  contact,
  contactTypeSwitch,
  contactType,
}: {
  contact: TContact;
  contactType: TContactTypes;
  contactTypeSwitch: React.Dispatch<React.SetStateAction<TContactTypes>>;
}) {
  return (
    <div className="card mb-3  shadow">
      <div className="card-header">{t`Basic Data`}</div>
      <div className="card-body">
        <div className="row mb-2">
          <MyInput
            type="radio"
            className="btn-check"
            name="contactType"
            id="typeorg"
            autoComplete="off"
            onChange={(e) => contactTypeSwitch(e.target.value as TContactTypes)}
            defaultValue="organisation"
          />
          <label
            className={classNames("btn", "col-6", {
              "btn-success": contactType === "organisation",
              "btn-secondary": contactType === "person",
            })}
            htmlFor="typeorg"
          >
            {t`Organisation`}:
          </label>
          <MyInput
            type="radio"
            className="btn-check"
            name="contactType"
            id="typeperson"
            autoComplete="off"
            onChange={(e) => contactTypeSwitch(e.target.value as TContactTypes)}
            defaultValue="person"
          />
          <label
            className={classNames("btn", "col-6", {
              "btn-success": contactType === "person",
              "btn-secondary": contactType === "organisation",
            })}
            htmlFor="typeperson"
          >
            {t`Person`}:
          </label>
        </div>
        <ContactTypeFields contact={contact} type={contactType} />
        <div className="row mb-2">
          <label
            htmlFor="address"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`Adress`}:
          </label>
          <div className="col-sm-12 col-md-10 align-self-center">
            <MyInput
              name="address"
              placeholder="1234 Main St"
              className="form-control-sm"
              defaultValue={contact.address}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label
            htmlFor="address2"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`Adress`} 2:
          </label>
          <div className="col-sm-12 col-md-10 align-self-center">
            <MyInput
              name="address2"
              placeholder="Apt 23 | c/o | etc."
              className="form-control-sm"
              defaultValue={contact.address2}
            />
          </div>
        </div>
        <div className="row mb-2 ">
          <label
            htmlFor="zip"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`ZIP`}:
          </label>
          <div className="col-sm-12 col-md-2 align-self-center">
            <MyInput
              className="form-control-sm "
              name="zip"
              placeholder="78945"
              defaultValue={contact.zip}
            />
          </div>
          <label
            htmlFor="city"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`City`}:
          </label>
          <div className="col-sm-12 col-md-6 align-self-center">
            <MyInput
              className="form-control-sm"
              name="city"
              placeholder="Exampletown"
              defaultValue={contact.city}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label
            htmlFor="country"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`Country`}:
          </label>
          <div className="col-sm-12 col-md-4">
            <Select
              className="form-select-sm"
              name="country"
              options={fetchCountries()}
              defaultValue={contact.country}
            />
          </div>
          <label
            htmlFor="state"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`State`}:
          </label>
          <div className="col-sm-12 col-md-4">
            <select className="form-select-sm" id="state">
              <option>Choose...</option>
              <option>California</option>
            </select>
          </div>
        </div>
        <hr className="my-4" />
        <label htmlFor="notes" className="form-label-hv-responsive">
          Internal Notes
        </label>
        {/* <RTE label="Notes" name="notes" defaultValue="Sample content state"/> */}
      </div>
    </div>
  );
}

function ContactTypeFields({
  contact,
  type,
}: {
  contact: TContact;
  type: TContactTypes;
}) {
  if (type === "organisation") {
    return (
      <div className="row mb-2">
        <label
          htmlFor="name"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`Name`}:
        </label>
        <div className="col-sm-12 col-md-10 align-self-center">
          <MyInput
            className="form-control-sm"
            name="orgname"
            placeholder="XYZ Ltd."
            defaultValue={contact.orgname}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="row mb-2">
        <label
          htmlFor="salutation"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`Salutation`}:
        </label>
        <div className="col-sm-12 col-md-4">
          <Select
            className="form-select-sm"
            name="salutation"
            options={fetchSalutations()}
            required
            defaultValue={contact.salutation}
          />
        </div>
        <label
          htmlFor="title"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`Title`}:
        </label>
        <div className="col-sm-12 col-md-4">
          <Select
            className="form-select-sm"
            name="title"
            options={fetchTitles()}
            defaultValue={contact.title}
          ></Select>
        </div>
      </div>
      <div className="row mb-2 ">
        <label
          htmlFor="firstName"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`First name`}:
        </label>
        <div className="col-sm-12 col-md-4 align-self-center">
          <MyInput
            className="form-control-sm"
            name="firstname"
            placeholder="Max"
            defaultValue={contact.firstname}
          />
        </div>
        <label
          htmlFor="lastName"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`Last name`}:
        </label>
        <div className="col-sm-12 col-md-4 align-self-center">
          <MyInput
            className=" form-control-sm"
            name="lastname"
            placeholder="Meier"
            defaultValue={contact.firstname}
          />
        </div>
      </div>
    </>
  );
}
