import {
  Link,
  NavLink,
  Outlet,
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
import { checkIdError, getSettings, t } from "~/utils";

export default function Edit() {
  const { contactId } = useParams();
  const navigate = useNavigate();

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

  console.log("$contactid");

  return (
    <>
      {errorModal}
      <div className="row my-3">
        <div className="col">
          <div className="row m-0 p-0">
            <div className="col-12 row my-2">
              <div className="col-2">
                <FAI icon={faFloppyDisk} color="#0c63e4" />
                <div className="small">{t`Save`}</div>
              </div>
              <div className="col-2">
                <FAI icon={faAlignJustify} color="#ff9900" />
                <Link to={"./../.."} className="small">{t`Back to list`}</Link>
              </div>
              <div className="col-2">
                <FAI icon={faRotate} color="#6c757d" />
                <div className="small">{t`Reload`}</div>
              </div>
              <div className="col-2">
                <FAI icon={faTrashCan} color="#ff0000" />
                <div className="small">{t`Delete`}</div>
              </div>
              <div className="col-2">
                <FAI icon={faCopy} color="#6c757d" />
                <div className="small">{t`Duplicate`}</div>
              </div>
              <div className="col-2">
                <FAI icon={faSquarePlus} className="text-success" />
                <div className="small">{t`Add contact`}</div>
              </div>
            </div>
          </div>
        </div>
        {/*          <div className="text-dark m-4 h6 text-end">
            12345s
            {' > '}
            <a href="">
              {t`First name`}
              {' '}
              {t`Last name`}
            </a>
          </div> */}
      </div>

      <nav className="nav nav-pills nav-justified bg-light-blue my-3 border">
        <NavLink
          to={`./`}
          className={({ isActive }) =>
            classNames(classes, { active: isActive })
          }
        >
          {t`Basic Data`}
        </NavLink>
        <NavLink
          to={`media`}
          className={({ isActive }) =>
            classNames(classes, { active: isActive })
          }
        >
          {t`Media`}
        </NavLink>
        <NavLink
          to={`objects`}
          className={({ isActive }) =>
            classNames(classes, { active: isActive })
          }
        >
          {t`Event Objects`}
        </NavLink>
        <NavLink
          to={`events`}
          className={({ isActive }) =>
            classNames(classes, { active: isActive })
          }
        >
          {t`Event Data`}
        </NavLink>
        {/* <a className="nav-link" href="#">Link</a>
        <a className="nav-link disabled" href="#" tabIndex={-1} aria-disabled="true">Disabled</a> */}
      </nav>
      <Outlet />
    </>
  );
}

// routes/parent.tsx
export const handle = {
  breadcrumb: () => <Link to="/contacts">Contacts</Link>,
};
