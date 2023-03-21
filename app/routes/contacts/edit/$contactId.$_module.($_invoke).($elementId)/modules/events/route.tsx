import React, { useState } from "react";
import { faker } from "@faker-js/faker";

import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import type { TContactEvent } from "~/lib/Helpers";
import { checkIdError, Modal } from "~/utils";
import { fakeContactEvent, fakeData } from "~/utils/fakers";
import { t } from "~/utils";

function showDeleteModal(
  deleteModalStatus: boolean,
  setDeleteModalStatus: React.Dispatch<React.SetStateAction<boolean>>
) {
  return (
    <Modal
      title={t`Delete object`}
      showStatus={deleteModalStatus}
      showStatusSetter={setDeleteModalStatus}
    >
      <div>Are you sure you want to delete it?</div>
    </Modal>
  );
}

export default function ContactEvents() {
  const navigate = useNavigate();
  const { objectId, contactId } = useParams();

  const errorModal = checkIdError({
    id: objectId,
    errTitle: `${t`Object selection`}: ${t`Object selection`}`,
    errContent: (
      <div className="alert alert-danger">
        {t`No valid object ID selected. Redirect to object list.`}
      </div>
    ),
    errAction: () => navigate(`/contacts/edit/${contactId}/objects/list`),
  });

  const containerClasses: string[] = [
    "card-body",
    "justify-content-center",
    "small",
    "table-responsive",
  ];
  return (
    <div className="col">
      <div className="card mb-3 shadow">
        <div className={classNames(containerClasses)}>
          aa
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export function ContactEventsEdit() {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const navigate = useNavigate();
  const { objectId, contactId } = useParams();

  const errorModal = checkIdError({
    id: objectId,
    errTitle: `${t`Object selection`}: ${t`Object selection`}`,

    errContent: (
      <div className="alert alert-danger">
        {t`No valid object ID selected. Redirect to object list.`}
      </div>
    ),
    errAction: () => navigate(`/contacts/edit/${contactId}/objects/list`),
  });
  const data = fakeContactEvent();
  console.log(data);

  // language=SQL format=false
  return (
    <>
      <div className="col">
        <div className="card mb-3 shadow">
          <div className="card-header">{t`Event Data`}</div>
          <div className="card-body justify-content-center small table-responsive">
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Event`}:
              </label>
              <div className="col-md-8">
                <select
                  className="form-select form-select-sm"
                  id="contactTypes_1"
                  required
                  defaultValue="Event 1"
                >
                  <option>Event 1</option>
                  <option>Event 2</option>
                  <option>Event 3</option>
                </select>
                {/*                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder={`${t`Event`} ${new Date().getFullYear()}`}
                /> */}
              </div>
            </div>
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Dates`}:
              </label>
              <div className="col-md-8">
                <div className="mb-1" />
                <ul>
                  <li>
                    {faker.date.future().toDateString()}{" "}
                    <FAI
                      icon={faTrash}
                      className="text-danger"
                      onClick={() =>
                        showDeleteModal(deleteModalStatus, setDeleteModalStatus)
                      }
                      role="button"
                    />
                  </li>
                  <li>
                    {faker.date.future().toDateString()}{" "}
                    <FAI
                      icon={faTrash}
                      className="text-danger"
                      onClick={() =>
                        showDeleteModal(deleteModalStatus, setDeleteModalStatus)
                      }
                      role="button"
                    />
                  </li>
                </ul>
                <a href="~/contacts/events/Events#">
                  {t`Choose event dates / times for contact`}
                </a>
              </div>
            </div>
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Event objects`}:
              </label>
              <div className="col-md-8">
                <div className="mb-1" />
                <ul>
                  {data.objects.map((object) => (
                    <li>
                      {object.name}{" "}
                      <FAI
                        icon={faTrash}
                        className="text-danger"
                        onClick={() =>
                          showDeleteModal(
                            deleteModalStatus,
                            setDeleteModalStatus
                          )
                        }
                        role="button"
                      />
                    </li>
                  ))}
                </ul>
                <a href="~/contacts/events/Events#">
                  {t`Choose objects for event`}
                </a>
              </div>
            </div>
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Specific Agreement`}:
              </label>
              <div className="col-md-8 small">
                <textarea
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows={4}
                  value={data.specificAgreement}
                />
              </div>
            </div>
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Stand location`}:
              </label>
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder={t`13 | vor Rathaus`}
                />
              </div>
            </div>
            <div className="row mb-2">
              <label
                htmlFor="name"
                className="form-label-hv-responsive col-md-4"
              >
                {t`Internal Memo`}:
              </label>
              <div className="col-md-8 small">
                <textarea
                  className="form-control form-control-sm"
                  id="exampleFormControlTextarea1"
                  rows={4}
                  value={data.internalMemo}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col text-end">
                <Button variant="success" type="button" className="btn-sm">
                  {t`Save`}
                </Button>{" "}
                <Button
                  variant="secondary"
                  type="button"
                  className="btn-sm"
                  onClick={() => {
                    navigate("../list");
                  }}
                >
                  {t`Cancel`}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {errorModal}
    </>
  );
}

export function ContactEventsList() {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const navigate = useNavigate();
  const { contactId } = useParams();

  const data = fakeData<TContactEvent>("ContactEvent", 8);

  return (
    <div className="col">
      <div className="card mb-3 shadow">
        <div className="card-header">{t`Event Data`}</div>
        <div className="card-body justify-content-center small table-responsive">
          <table className="table-striped table-hover table align-middle">
            <thead>
              <tr>
                <th scope="col">{t`Event`}</th>
                <th scope="col">{t`Datum`}</th>
                <th scope="col">{t`Objects`}</th>
                <th scope="col">{t`Actions`}</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row: TContactEvent, index) => {
                const key = index;
                return (
                  <tr key={key}>
                    <td>{row.name}</td>
                    <td>
                      {row.dates.map((date, i) => {
                        const key2 = i;
                        return <div key={key2}>{date.toDateString()}</div>;
                      })}
                    </td>
                    <td>
                      {row.objects.map((object, i) => {
                        const key2 = i;
                        return <div key={key2}>{object.name}</div>;
                      })}
                    </td>
                    <td className="fs-5">
                      <FAI
                        icon={faPenToSquare}
                        className="text-primary"
                        onClick={() =>
                          navigate(
                            `/contacts/edit/${contactId}/events/edit/${key}`
                          )
                        }
                        role="button"
                      />
                      {"  "}
                      <FAI
                        icon={faTrash}
                        className="text-danger"
                        onClick={() =>
                          showDeleteModal(
                            deleteModalStatus,
                            setDeleteModalStatus
                          )
                        }
                        role="button"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
