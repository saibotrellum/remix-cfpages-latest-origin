import { Accordion } from "react-bootstrap";
import { Icon, t } from "~/utils";
import type { TContact, TTranslatedOptions } from "~/lib/Helpers";
import { MyInput, MySelect } from "~/components/Form";
import { fetchSalutations, fetchTitles } from "~/lib/Helpers";
import React from "react";

function getSpecialInput({
  fieldname,
  label,
  prefix = "",
  key,
  type,
  placeholder,
}: TInputGenDef & { prefix: string; key: number; type: TSpecialFieldTypes }) {
  const elementMap = {
    other: (
      <div className="row mb-2 " key={key}>
        <div className="col-md-4">
          <MyInput
            type="text"
            className="form-control-sm"
            placeholder="other"
            name={`${prefix}${fieldname}[0][label]`}
          />
        </div>

        <div className="col-md-8 align-self-center">
          <MyInput
            className="form-control-sm"
            name={`${prefix}${fieldname}[0][value]`}
            placeholder={placeholder}
          />
        </div>
      </div>
    ),
    www: (
      <div className="row mb-2" key={key}>
        <label
          htmlFor="facebook"
          className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
        >
          <Icon iconCode="link" />
        </label>
        <div className="col-sm-12 col-md-10 align-self-center">
          <div className="input-group input-group-sm has-validation">
            <span className="input-group-text ">
              <small>
                <small>
                  <small>https://</small>
                </small>
              </small>
            </span>
            <MyInput
              type="text"
              className="form-control-sm"
              name="www"
              placeholder="www.domain.de"
            />
          </div>
        </div>
      </div>
    ),
    facebook: (
      <div className="row mb-2" key={key}>
        <label
          htmlFor="facebook"
          className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
        >
          <Icon iconCode="facebook" />
        </label>
        <div className="col-sm-12 col-md-10 align-self-center">
          <div className="input-group input-group-sm has-validation">
            <span className="input-group-text ">
              <small>
                <small>
                  <small>facebook.com/</small>
                </small>
              </small>
            </span>
            <MyInput
              type="text"
              className="form-control-sm"
              name={`${prefix}${fieldname}`}
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>
    ),
    instagram: (
      <div className="row mb-2" key={key}>
        <label
          htmlFor="instagram"
          className="form-label-hv-responsive col-sm-12 col-md-2"
        >
          <Icon iconCode="instagram" />
        </label>
        <div className="col-sm-12 col-md-10 align-self-center">
          <div className="input-group input-group-sm has-validation">
            <span className="input-group-text ">@</span>
            <MyInput
              type="text"
              className="form-control-sm"
              name="instagram"
              placeholder="username"
            />
          </div>
        </div>
      </div>
    ),
  };
  return elementMap[type];
}

function getLabelInput({
  fieldname,
  label,
  prefix = "",
  key,
  type,
  placeholder,
}: TInputGenDef & { prefix: string; key: number }) {
  return type !== "text" ? (
    getSpecialInput({ fieldname, label, key, prefix, placeholder, type })
  ) : (
    <div className="row mb-2 " key={key}>
      <label
        htmlFor={`${prefix}${fieldname}`}
        className="form-label-hv-responsive col-md-4"
      >
        {t(label)}:
      </label>

      <div className="col-md-8 align-self-center">
        <MyInput
          className="form-control-sm"
          name={`${prefix}${fieldname}`}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
function getLabelSelect({
  fieldname,
  label,
  prefix = "",
  key,
  options,
}: TSelectGenDef & { prefix: string; key: number }) {
  return (
    <div className="row mb-2" key={key}>
      <label
        htmlFor={`${prefix}${fieldname}`}
        className="form-label-hv-responsive col-md-4"
      >
        {t(label)}:
      </label>
      <div className="col-md-8">
        <MySelect
          className="form-select-sm"
          name={`${prefix}${fieldname}`}
          options={options}
        />
      </div>
    </div>
  );
}

type TSpecialFieldTypes = "other" | "www" | "facebook" | "instagram";
type TInputFieldTypes = "text" | TSpecialFieldTypes;
type TFieldDef = {
  fieldname: string;
  label: string;
  placeholder?: string;
  type: "select" | TInputFieldTypes;
  options?: TTranslatedOptions[];
};
type TSelectGenDef = TFieldDef & {
  type: "select";
  options: TTranslatedOptions[];
  placeholder?: string;
};
type TInputGenDef = TFieldDef & {
  type: TInputFieldTypes;
  placeholder: string;
};

type TFieldMap = {
  [k: string]: TFieldDef[];
};
const contactPersonMap: TFieldMap = {
  main: [
    {
      fieldname: "salutation",
      label: "Salutation",
      type: "select",
      options: fetchSalutations(),
      placeholder: "Choose...",
    },
    {
      fieldname: "title",
      label: "Title",
      type: "select",
      options: fetchTitles(),
      placeholder: "Choose...",
    },
    {
      fieldname: "firstname",
      label: "First name",
      type: "text",
      placeholder: "Max",
    },
    {
      fieldname: "lastname",
      label: "Last name",
      type: "text",
      placeholder: "Meier",
    },
    {
      fieldname: "responsibility",
      label: "Responsibility",
      type: "text",
      placeholder: "Sales",
    },
  ],
  numbers: [
    {
      fieldname: "phone",
      label: "Phone",
      type: "text",
      placeholder: "(+49) 1289 / 15618411",
    },
    {
      fieldname: "fax",
      label: "Fax",
      type: "text",
      placeholder: "(+49) 1289 / 15618411",
    },
    {
      fieldname: "mobile",
      label: "Mobile",
      type: "text",
      placeholder: "(+49) 1289 / 15618411",
    },
    {
      fieldname: "email",
      label: "E-Mail",
      type: "text",
      placeholder: "example@email.com",
    },
    {
      fieldname: "other.numbers",
      label: "other",
      type: "other",
      placeholder: "+49) 1289/... or example@...",
    },
  ],
  social: [
    {
      fieldname: "www",
      label: "www",
      type: "www",
      placeholder: "www.domain.de",
    },

    {
      fieldname: "facebook",
      label: "Facebook",
      type: "facebook",
      placeholder: "profile.php?id=112345678976516]",
    },

    {
      fieldname: "instagram",
      label: "Instagram",
      type: "instagram",
      placeholder: "username",
    },
    {
      fieldname: "other.social",
      label: "other",
      type: "other",
      placeholder: "@username or http://...",
    },
  ],
  categories: [
    {
      fieldname: "salutation",
      label: "Salutation",
      type: "select",
      options: fetchSalutations(),
      placeholder: "Choose...",
    },
  ],
};

function getSectionFields(
  section: keyof typeof fieldMap,
  fieldMap: TFieldMap,
  prefix: string = ""
) {
  return fieldMap[section].map((def, index) => {
    if (def.type === "select")
      return getLabelSelect({
        ...(def as TSelectGenDef),
        key: index,
        prefix,
      });

    return getLabelInput({ ...(def as TInputGenDef), key: index, prefix });
  });
}

export default function ContactPerson({ contact }: { contact: TContact }) {
  const persons = [];
  for (let i = 0; i < contact.contactPersons.length; i++)
    persons.push(
      <div className="col-md-6 col-lg-4 col-xl-3" key={i}>
        <div className="card shadow mb-3">
          <div className="card-header">{t`Contact Person`}</div>
          <div className="card-body">
            <Accordion defaultActiveKey="0" flush alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t`Basic Data`}</Accordion.Header>
                <Accordion.Body>
                  {getSectionFields(
                    "main",
                    contactPersonMap,
                    `contactPersons[${i}].`
                  )}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>{t`Numbers and Contact Information`}</Accordion.Header>
                <Accordion.Body>
                  {getSectionFields(
                    "numbers",
                    contactPersonMap,
                    `contactPersons[${i}].`
                  )}
                  <div className="form-text text-end">
                    <a href="~/contacts/main/ContactPerson#">more...</a>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>{t`Social Media & Online Presence`}</Accordion.Header>
                <Accordion.Body>
                  {getSectionFields(
                    "social",
                    contactPersonMap,
                    `contactPersons[${i}].`
                  )}
                  <div className="form-text text-end">
                    <a href="~/contacts/main/ContactPerson#">more...</a>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>{t`Categories / Origins`}</Accordion.Header>
                <Accordion.Body>
                  <div className="row mb-2">
                    <div className="col-sm-12">
                      <div className="row mb-2">
                        <label
                          htmlFor="contactTypes_1"
                          className="form-label-hv-responsive col-md-3"
                        >
                          {t`Contact type`}
                        </label>
                        <div className="col-md-9">
                          <select
                            className="form-select form-select-sm"
                            id="contactTypes_1"
                            defaultValue="Gastronomie"
                          >
                            <option value="">Choose...</option>
                            <option>Feuerkünstler</option>
                            <option>Gastronomie</option>
                          </select>
                          <select
                            className="form-select form-select-sm"
                            id="contactTypes_2"
                          >
                            <option value="">Choose...</option>
                            <option>Feuerkünstler</option>
                            <option>Gastronomie</option>
                          </select>
                        </div>
                        <div className="form-text text-end">
                          <a href="~/contacts/main/ContactPerson#">more...</a>
                        </div>
                      </div>
                      <hr className="my-4" />
                      <div className="row mb-2">
                        <label
                          htmlFor="contactTypes_1"
                          className="form-label-hv-responsive col-md-3"
                        >
                          {t`Origin`}
                        </label>
                        <div className="col-md-9">
                          <select
                            className="form-select form-select-sm"
                            id="contactTypes_1"
                            name="contactTypes_1"
                            defaultValue="Formular"
                          >
                            <option value="">Choose...</option>
                            <option>Formular</option>
                            <option>Import</option>
                          </select>
                          <select
                            className="form-select form-select-sm"
                            id="contactTypes_2"
                            name="contactTypes_2"
                          >
                            <option value="">Choose...</option>
                            <option>Formular</option>
                            <option>Import</option>
                          </select>
                        </div>
                        <div className="form-text text-end">
                          <a href="~/contacts/main/ContactPerson#">more...</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    );
  return <>{persons}</>;
}
