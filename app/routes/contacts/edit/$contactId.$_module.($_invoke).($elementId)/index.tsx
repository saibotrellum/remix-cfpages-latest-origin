import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "@remix-run/react";
import classNames from "classnames";

import { checkIdError, Icon, t } from "~/utils";
import ContactMain from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/main/route";
import ContactMedia from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/media/route";
import ContactEvents from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/events/route";
import ContactObjects from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/objects";
import type { ReactNode } from "react";
import React from "react";
import { useFormContext, validationError } from "remix-validated-form";
import { basicValidator } from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/main/Basic";
import { MySubmitButton } from "~/components/Form";
import { Button, ButtonGroup } from "react-bootstrap";
import type { ActionFunction } from "@remix-run/cloudflare";
import type { asElement, TContactEditModules } from "~/lib/Helpers";

export const loader = async () => {
  console.log("ContactEditRouter loader in");
  /*  console.log("contacts");
  const contacts = contactDao();
  let data = await contacts.find({});
  console.log("data", data);

  console.log("contacts");
  const todos = todoDao();
  let aa = await todos.find({});
  console.log("data", aa);

  return data;*/
  console.log("ContactEditRouter loader out");
  return {};
};

export const action: ActionFunction = async ({ request, params, context }) => {
  let req = await request.formData();
  console.log(req);
  req.set("orgname", "");
  const result = await basicValidator.validate(req);

  console.log("validation", result);
  if (result.error) {
    // validationError comes from `remix-validated-form`
    return validationError(result.error);
  }

  return result;
};

const modulesMap: {
  [k in TContactEditModules]: { label: string; element: ReactNode };
} = {
  main: { label: "Basic Data", element: <ContactMain /> },
  media: { label: "Media", element: <ContactMedia /> },
  events: { label: "Event Objects", element: <ContactEvents /> },
  objects: { label: "Event Data", element: <ContactObjects /> },
};

export const ContactEditModules = Object.keys(modulesMap);
export default function ContactEdit() {
  console.log("ContactEditRouter MAIN in");
  const { contactId, _module, _invoke, _elementId } = useParams();
  const params = useParams();
  const navigate = useNavigate();
  let _execModule = _module || "main";
  console.log("editParams", params);
  //const { register, handleSubmit, watch, formState: { errors } } = useForm();

  function execute(module: TContactEditModules) {
    return modulesMap[module]["element"]; //.apply(null);
  }

  const errorModal = checkIdError({
    id: contactId,
    errTitle: `${t`Contact selection`}: ${t`Contact selection`}`,
    errContent: (
      <div className="alert alert-danger">
        {t`No valid contact ID selected. Redirect to contact list.`}
      </div>
    ),
    errAction: () => navigate("/contacts"),
  });

  const classes = [
    "nav-link",
    "align-self-center",
    "border-start",
    "border-end",
  ];
  function compClasses({ isActive }: { isActive: boolean }) {
    return classNames(classes, { active: isActive });
  }
  const ret = (
    <>
      {errorModal}
      <div className="row my-3">
        <div className="col">
          <div className="row m-0 p-0">
            <ContactEditMenu />
          </div>
        </div>
      </div>

      <nav className="nav nav-pills nav-justified bg-light-blue my-3 border">
        <>
          {Object.keys(modulesMap).map((key: string) => (
            <NavLink
              to={`../${contactId}/${key}`}
              className={compClasses}
              key={key}
            >
              {t(modulesMap[key as TContactEditModules]["label"])}
            </NavLink>
          ))}
        </>
        {/*
        <a className="nav-link disabled" href="#"
        tabIndex={-1}
        aria-disabled="true">Disabled</a> */}
      </nav>
      {/*
        <>
          {_execModule}, {Object.keys(modulesMap).join("|")}
        </>
      */}
      {modulesMap.hasOwnProperty(_execModule) ? (
        execute(_execModule as TContactEditModules)
      ) : (
        <>Error</>
      )}
    </>
  );
  console.log("ContactEditRouter MAIN OUT");
  return ret;
}
function ContactEditMenu() {
  const locaction = useLocation();
  const form = useFormContext("moduleForm");
  return (
    <>
      <ButtonGroup aria-label="Basic example">
        <MySubmitButton type="submit" label="Save" formId="moduleForm">
          <div>
            <Icon iconCode={"save"} />
          </div>
        </MySubmitButton>
        <Button
          variant="light"
          //formId="moduleForm"
          //label="Back to list"
          to={"/contacts/list"}
          as={Link as asElement<typeof Link>}
        >
          <div>
            <Icon iconCode={"backToList"} />
          </div>
          {t`Back to list`}
        </Button>
        <Button
          variant="light"
          // formId="moduleForm"
          // label="Reload"
          as={Link as asElement<typeof Link>}
          to={locaction.pathname}
        >
          <div>
            <Icon iconCode={"reload"} />
          </div>
          {t`Reload`}
        </Button>
        <Button
          variant="light"
          // formId="moduleForm"
          // label="Delete"
          as={Link as asElement<typeof Link>}
          to={locaction.pathname}
        >
          <div>
            <Icon iconCode={"delete"} color="#ff0000" />
          </div>
          {t`Delete`}
        </Button>
        <Button
          variant="light"
          // formId="moduleForm"
          // label="Duplicate"
          as={Link as asElement<typeof Link>}
          to={locaction.pathname}
        >
          <div>
            <Icon iconCode={"duplicate"} color="#6c757d" />
          </div>
          {t`Duplicate`}
        </Button>
        <Button
          variant="light"
          // formId="moduleForm"
          // label="Duplicate"
          as={Link as asElement<typeof Link>}
          to={locaction.pathname}
        >
          <div>
            <Icon iconCode={"addContact"} className="text-success" />
          </div>
          {t`Add contact`}
        </Button>
      </ButtonGroup>
    </>
  );
}

// routes/parent.tsx
export const handle = {
  breadcrumb: () => <Link to="/contacts">Contacts</Link>,
};
