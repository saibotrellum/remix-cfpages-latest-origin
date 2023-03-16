import { useState } from "react";
import Basic from "~/components/contacts/main/Basic";
import NumbersAccounts from "~/components/contacts/main/NumbersAccounts";
import Categories from "~/components/contacts/main/Categories";
import ContactPerson from "~/components/contacts/main/ContactPerson";
import type { TContactTypes } from "~/components/contacts/Helpers";
import { getFakeContact } from "~/components/contacts/Helpers";
const contact = getFakeContact();

export default function Main() {
  const [contactTypeState, setContactTypeState] =
    useState<TContactTypes>("organisation");
  console.log("contacts/edit/1234");
  return (
    <>
      <div className="row justify-content-between mb-3">
        <div className="col-md-7">
          <Basic
            contact={contact}
            contactTypeSetter={setContactTypeState}
            contactTypeState={contactTypeState}
          />
        </div>
        <div className="col-md-5">
          <div className="row justify-content-between">
            <div className="col-xxl-6">
              <NumbersAccounts />
            </div>
            <div className="col-xxl-6">
              <Categories contact={contact} />
            </div>
          </div>
        </div>
      </div>
      {contactTypeState === "organisation" && (
        <div className="row justify-content-start">
          <ContactPerson />
        </div>
      )}
    </>
  );
}
