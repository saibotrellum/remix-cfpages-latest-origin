import React, {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {checkIdError, t} from "~/utils";
import {Button} from "react-bootstrap";

export function ContactObjectsEdit({contactId, objectId}:{contactId: string, objectId: string}) {

    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const navigate = useNavigate();


    const errorModal = checkIdError({
        id: objectId,
        errTitle: `${t`Object selection`}: ${t`Object selection`}`,

        errContent: (
            <div className="alert alert-danger">
                {t`No valid object ID selected. Redirect to object list.`}
            </div>),
        errAction: () => {
        }//navigate(`/contacts/edit/${contactId}/objects/list`),
    });

    // language=SQL format=false
    return (
        <>
            <div className="card-header">{t`Event Object`}</div>
            <div className="card-body justify-content-center small table-responsive">
                <div className="row mb-2">
                    <label htmlFor="name" className="form-label-hv-responsive col-md-4">
                        {t`Designation`}
                        :
                    </label>
                    <div className="col-md-8">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder={t`Tent / Hut`}
                        />
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="name" className="form-label-hv-responsive col-md-4">
                        {t`Width x Length`}
                        :
                    </label>
                    <div className="col-md-8 align-self-center small">
                        <div className="input-group input-group-sm align-self-center">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="3"
                            />
                            <span className="align-self-center ps-1">
                m
              </span>
                            <span className="mx-3 fs-5 fw-bold align-self-center">
                {' '}
                                x
                                {' '}
              </span>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="3"
                            />
                            <span className="align-self-center ps-1">
                m
              </span>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="name" className="form-label-hv-responsive col-md-4">
                        {t`Photo`}
                        :
                    </label>
                    <div className="col-md-8 small">
                        <div className="mb-1">
                            <a href="~/contacts/objects/Objects#">
                                {t`Select image from media library`}
                            </a>
                            {` ${t`or`} `}
                        </div>
                        <input className="form-control form-control-sm" id="formFileSm" type="file"/>
                    </div>
                </div>
                <div className="row mb-2">
                    <label htmlFor="name" className="form-label-hv-responsive col-md-4">
                        {t`Notes`}
                        :
                    </label>
                    <div className="col-md-8 small">
                        <textarea className="form-control form-control-sm" id="exampleFormControlTextarea1" rows={4}/>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col text-end">
                        <Button variant="success" type="button" className="btn-sm">
                            {t`Save`}
                        </Button>
                        {' '}
                        <Button
                            variant="secondary"
                            type="button"
                            className="btn-sm"
                            onClick={() => {
                                navigate('../list');
                            }}
                        >
                            {t`Cancel`}
                        </Button>
                    </div>
                </div>
            </div>
            {errorModal}
        </>
    );
}