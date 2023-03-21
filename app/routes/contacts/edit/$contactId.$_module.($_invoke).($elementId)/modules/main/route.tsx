import React, { useEffect, useState } from "react";
import Basic, { basicValidator } from "./Basic";
import NumbersAccounts from "./NumbersAccounts";
import Categories from "./Categories";
import ContactPerson from "./ContactPerson";
import type { TContactTypes } from "~/lib/Helpers";
import { getFakeContact } from "~/lib/Helpers";
import { useParams } from "@remix-run/react";
import { ValidatedForm } from "remix-validated-form";
import { MySubmitButton } from "~/components/Form";
import { Icon } from "~/utils";
import { createPortal } from "react-dom";

const contact = getFakeContact();

export default function ContactMain() {
  const [_document, set_document] = React.useState<null | Document>(null);
  useEffect(() => {
    set_document(document);
  }, []);
  const { contactId } = useParams();
  console.log("params", contactId);
  console.log(contact);
  // const isSubmitting = useIsSubmitting();
  // const formData = useFormContext("moduleForm");
  // console.log("formData", formData);

  const [contactTypeState, setContactTypeState] =
    useState<TContactTypes>("organisation");

  return (
    <>
      <ValidatedForm
        id="moduleForm"
        validator={basicValidator}
        method="post"
        action="testAction"
        subaction="testSubAction"
      >
        <div className="row justify-content-between mb-3">
          <div className="col-md-7">
            <Basic
              contact={contact}
              contactTypeSwitch={setContactTypeState}
              contactType={contactTypeState}
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
      </ValidatedForm>
    </>
  );
}
