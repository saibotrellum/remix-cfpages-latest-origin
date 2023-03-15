import React, {useState} from 'react';
import * as faker from 'faker';
import {FontAwesomeIcon as FAI} from '@fortawesome/react-fontawesome';
import {faPenToSquare, faTrash,} from '@fortawesome/free-solid-svg-icons';
import {Outlet, useNavigate, useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import type {TContactObject} from '../Helpers';
import {checkIdError, Modal} from '../../utils';

function showDeleteModal(deleteModalStatus: boolean, setDeleteModalStatus: React.Dispatch<React.SetStateAction<boolean>>) {
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

export function ContactObjects() {
    const navigate = useNavigate();
    const {objectId, contactId} = useParams();

    const errorModal = checkIdError({
        id: objectId,
        errTitle: `${t`Object selection`}: ${t`Object selection`}`,
        errContent: (
            <div className="alert alert-danger">
                {t`No valid object ID selected. Redirect to object list.`}
            </div>),
        errAction: () => navigate(`/contacts/edit/${contactId}/objects/list`),
    });

    const containerClasses: string [] = ['card-body', 'justify-content-center', 'small', 'table-responsive'];
    return (
        <div className="col">
            <div className="card shadow mb-3">
                <Outlet/>
            </div>
        </div>
    );
}

export function ContactObjectsEdit() {
    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const navigate = useNavigate();
    const {objectId, contactId} = useParams();

    const errorModal = checkIdError({
        id: objectId,
        errTitle: `${t`Object selection`}: ${t`Object selection`}`,

        errContent: (
            <div className="alert alert-danger">
                {t`No valid object ID selected. Redirect to object list.`}
            </div>),
        errAction: () => navigate(`/contacts/edit/${contactId}/objects/list`),
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

export function ContactObjectsList() {
    const data = Array<TContactObject>();
    const [deleteModalStatus, setDeleteModalStatus] = useState(false);
    const navigate = useNavigate();
    const {contactId} = useParams();

    for (let i = 0; i < 5; i += 1) {
        data.push({
            name: faker.random.words(2),
            width: faker.datatype.number(),
            length: faker.datatype.number(),
            image: faker.image.imageUrl(100, 480 * (100 / 640)),
            notes: faker.random.words(i * 2),
        });
    }

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
                    {data.map((row: TContactObject, index) => {
                        const key = index;
                        return (
                            <tr key={key}>
                                <td>{row.name}</td>
                                <td>
                                    {row.width}
                                    m
                                </td>
                                <td>
                                    {row.length}
                                    m
                                </td>
                                <td><img src={row.image} alt={`${t`Photo`}: ${row.name}`}/></td>
                                <td>{row.notes}</td>
                                <td className="fs-5">
                                    <FAI
                                        icon={faPenToSquare}
                                        className="text-primary"
                                        onClick={() => navigate(`/contacts/edit/${contactId}/objects/edit/${key}`)}
                                        role="button"
                                    />
                                    {'  '}
                                    <FAI
                                        icon={faTrash}
                                        className="text-danger"
                                        onClick={() => showDeleteModal(deleteModalStatus, setDeleteModalStatus)}
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
