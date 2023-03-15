import classNames from "classnames";
import type { TContact, TContactTypes } from "../Helpers";
import { fetchSalutations, fetchTitles, fetchCountries } from "../Helpers";

import React, { useContext } from "react";
import RTE from "~/components/FormRTE.client";
import { Input, Select } from "~/components/Form";
import { t } from "~/utils";
import Realm from "realm";

import { App as RApp, Credentials } from "realm-web";

/*
export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
*/

const newsletters = ["Newsletter1", "Newsletter2"];
const origins = [];

function contactTypeFields(contact: TContact, type: TContactTypes) {
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
          <Input
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
          <Input
            className="form-control-sm"
            name="firstName"
            placeholder="Max"
          />
        </div>
        <label
          htmlFor="lastName"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          {t`Last name`}:
        </label>
        <div className="col-sm-12 col-md-4 align-self-center">
          <Input
            className=" form-control-sm"
            name="lastName"
            placeholder="Meier"
          />
        </div>
      </div>
    </>
  );
}

/*export const loader: LoaderFunction = async () => {
    return json({ok: true});
};*/
export default async function Basics(props: {
  contact: TContact;
  contactTypeState: TContactTypes;
  contactTypeSetter: React.Dispatch<React.SetStateAction<TContactTypes>>;
}) {
  /*  const {
        register,
        handleSubmit,
      } = useForm<TContact>();s */

  const credentials = Realm.Credentials.emailPassword(
    "joe.jasper@example.com",
    "passw0rd"
  );
  //new RApp(process.env.ATLAS_APP_ID as string);
  const app = new RApp(process.env.ATLAS_APP_ID as string);

  //const app = new Realm.App(process.env.ATLAS_APP_ID as string);

  const authedUser = await app.logIn(credentials);
  console.log(authedUser);

  return (
    <div className="card mb-3  shadow">
      <div className="card-header">{t`Basic Data`}</div>
      <div className="card-body">
        <div className="row mb-2">
          <Input
            type="radio"
            className="btn-check"
            name="contactType"
            id="typeorg"
            autoComplete="off"
            onChange={(e) =>
              props.contactTypeSetter(e.target.value as TContactTypes)
            }
            defaultValue="organisation"
          />
          <label
            className={classNames("btn", "col-6", {
              "btn-success": props.contactTypeState === "organisation",
              "btn-secondary": props.contactTypeState === "person",
            })}
            htmlFor="typeorg"
          >
            {t`Organisation`}:
          </label>
          <Input
            type="radio"
            className="btn-check"
            name="contactType"
            id="typeperson"
            autoComplete="off"
            onChange={(e) =>
              props.contactTypeSetter(e.target.value as TContactTypes)
            }
            defaultValue="person"
          />
          <label
            className={classNames("btn", "col-6", {
              "btn-success": props.contactTypeState === "person",
              "btn-secondary": props.contactTypeState === "organisation",
            })}
            htmlFor="typeperson"
          >
            {t`Person`}:
          </label>
        </div>
        {contactTypeFields(props.contact, props.contactTypeState)}
        <div className="row mb-2">
          <label
            htmlFor="address"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`Adress`}:
          </label>
          <div className="col-sm-12 col-md-10 align-self-center">
            <Input
              className="form-control-sm"
              name="address"
              placeholder="1234 Main St"
              required
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
            <Input
              className="form-control-sm"
              name="address2"
              placeholder="Apt 23 | c/o | etc."
              required
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
            <Input
              className="form-control-sm "
              name="zip"
              placeholder="78945"
            />
          </div>
          <label
            htmlFor="city"
            className="form-label-hv-responsive col-sm-12 col-md-2"
          >
            {t`City`}:
          </label>
          <div className="col-sm-12 col-md-6 align-self-center">
            <Input
              className="form-control-sm"
              name="city"
              placeholder="Exampletown"
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
              required
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
