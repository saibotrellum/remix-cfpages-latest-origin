import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useMatches,
  useNavigate,
  useParams,
} from "@remix-run/react";
import classNames from "classnames";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import {
  faAlignJustify,
  faCopy,
  faFloppyDisk,
  faRotate,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { checkIdError, getSettings, Icon, t } from "~/utils";
import contactDao from "~/dao/contactDao";
import todoDao from "~/dao/todoDao";
import ContactMain from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/main/route";
import ContactMedia from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/media/route";
import ContactEvents from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/events/route";
import ContactObjects from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/objects";
import type { ReactNode } from "react";
import {
  useFormContext,
  useIsSubmitting,
  ValidatedForm,
} from "remix-validated-form";
import { basicValidator } from "~/routes/contacts/edit/$contactId.$_module.($_invoke).($elementId)/modules/main/Basic";
import { MySubmitButton } from "~/components/Form";
import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";
import type { AsProp } from "react-bootstrap/helpers";

export const loader = async () => {
  /*  console.log("contacts");
  const contacts = contactDao();
  let data = await contacts.find({});
  console.log("data", data);

  console.log("contacts");
  const todos = todoDao();
  let aa = await todos.find({});
  console.log("data", aa);

  return data;*/
  return {};
};
const modulesMap: { [k: string]: { label: string; element: ReactNode } } = {
  main: { label: "Basic Data", element: <ContactMain /> },
  media: { label: "Media", element: <ContactMedia /> },
  events: { label: "Event Objects", element: <ContactEvents /> },
  objects: { label: "Event Data", element: <ContactObjects /> },
};
export const ContactEditModules = Object.keys(modulesMap);
export default function ContactEdit() {
  const { contactId, _module, _invoke, _elementId } = useParams();
  const params = useParams();
  const navigate = useNavigate();
  let _execModule = _module || "main";
  console.log("editParams", params);
  //const { register, handleSubmit, watch, formState: { errors } } = useForm();

  function execute(module: string) {
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

  return (
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
          {Object.keys(modulesMap).map((key, index) => (
            <NavLink
              to={`../${contactId}/${key}`}
              className={compClasses}
              key={key}
            >
              {t(modulesMap[key]["label"])}
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
        execute(_execModule)
      ) : (
        <>Error</>
      )}
    </>
  );
}
type asElement<T> = (T & keyof JSX.IntrinsicElements) | undefined;
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
            <Icon iconCode={"delete"} />
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
