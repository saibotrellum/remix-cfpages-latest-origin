import React, { useState } from "react";
import { Modal, t } from "~/utils";
import type { TContactObject } from "~/lib/Helpers";
import { useNavigate, useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

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

export default function ContactObjectsList({
  objects,
}: {
  objects: TContactObject[];
}) {
  const [deleteModalStatus, setDeleteModalStatus] = useState(false);
  const navigate = useNavigate();
  const { contactId } = useParams();

  return (
    <>
      <div className="card-header">{t`Event Objects`}</div>
      <div className="card-body justify-content-center small table-responsive">
        <table className="table align-middle table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">{t`Designation`}</th>
              <th scope="col">{t`Width`}</th>
              <th scope="col">{t`Length`}</th>
              <th scope="col">{t`Photo`}</th>
              <th scope="col">{t`Notes`}</th>
              <th scope="col">{t`Actions`}</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((row: TContactObject, index) => {
              return (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.width}m</td>
                  <td>{row.length}m</td>
                  <td>
                    <img src={row.image} alt={`${t`Photo`}: ${row.name}`} />
                  </td>
                  <td>{row.notes}</td>
                  <td className="fs-5">
                    <FAI
                      icon={faPenToSquare}
                      className="text-primary"
                      onClick={() =>
                        navigate(
                          `/contacts/edit/${contactId}/objects/${row.id}/edit`
                        )
                      }
                      role="button"
                    />
                    {"  "}
                    <FAI
                      icon={faTrash}
                      className="text-danger"
                      onClick={() =>
                        showDeleteModal(deleteModalStatus, setDeleteModalStatus)
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
    </>
  );
}
