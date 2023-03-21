import { Accordion } from "react-bootstrap";
import { t } from "~/utils";

export default function ContactPerson() {
  const persons = [];
  for (let i = 0; i < 6; i += 1) {
    persons.push(
      <div className="col-md-6 col-lg-4 col-xl-3" key={i}>
        <div className="card shadow mb-3">
          <div className="card-header">{t`Contact Person`}</div>
          <div className="card-body">
            <Accordion defaultActiveKey="0" flush alwaysOpen>
              <Accordion.Item eventKey="0">
                <Accordion.Header>{t`Basic Data`}</Accordion.Header>
                <Accordion.Body>
                  <div className="row mb-2">
                    <label
                      htmlFor="salutation"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Salutation`}:
                    </label>
                    <div className="col-md-8">
                      <select
                        className="form-select form-select-sm"
                        id="salutation"
                        name={`contactPerson[${i}][salutation]`}
                      >
                        <option>Choose...</option>
                        <option>Mr.</option>
                        <option>Mrs.</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="title"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Title`}:
                    </label>
                    <div className="col-md-8">
                      <select
                        className="form-select form-select-sm"
                        id="title"
                        name={`contactPerson[${i}][title]`}
                      >
                        <option>Choose...</option>
                        <option>Dr.</option>
                        <option>Prof.</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-2 ">
                    <label
                      htmlFor="firstName"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`First name`}:
                    </label>
                    <div className="col-md-8 align-self-center">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="firstname"
                        name={`contactPerson[${i}][firstname]`}
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="lastName"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Last name`}:
                    </label>
                    <div className="col-md-8 align-self-center">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="lastname"
                        name={`contactPerson[${i}][lastname]`}
                        placeholder="Meier"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="responsibility"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Responsibility`}:
                    </label>
                    <div className="col-md-8 align-self-center">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        id="responsibility"
                        name={`contactPerson[${i}][responsibility]`}
                        placeholder="Sales"
                      />
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>{t`Numbers and Contact Information`}</Accordion.Header>
                <Accordion.Body>
                  <div className="row mb-2">
                    <label
                      htmlFor="name"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Phone`}:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name={`contactPerson[${i}][phone]`}
                        className="form-control form-control-sm"
                        placeholder="(+49) 1289 / 15618411"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="name"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Fax`}:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name={`contactPerson[${i}][fax]`}
                        className="form-control form-control-sm"
                        placeholder="(+49) 1289 / 15618411"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="name"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`Mobile`}:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name={`contactPerson[${i}][mobile]`}
                        className="form-control form-control-sm"
                        placeholder="(+49) 1289 / 15618411"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="name"
                      className="form-label-hv-responsive col-md-4"
                    >
                      {t`E-Mail`}:
                    </label>
                    <div className="col-md-8">
                      <input
                        type="text"
                        name={`contactPerson[${i}][email]`}
                        className="form-control form-control-sm"
                        placeholder="beispiel@domain.de"
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="other"
                        name={`contactPerson[${i}][other][label]`}
                      />
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="(+49) 1289 / 15618411"
                        name={`contactPerson[${i}][other][value]`}
                      />
                    </div>
                  </div>
                  <div className="form-text text-end">
                    <a href="~/contacts/main/ContactPerson#">more...</a>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>{t`Social Media & Online Presence`}</Accordion.Header>
                <Accordion.Body>
                  <div className="row mb-2">
                    <label
                      htmlFor="facebook"
                      className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
                    >
                      <i className="bi-link fs-5" />
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
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="www"
                          placeholder="www.domain.de"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="instagram"
                      className="form-label-hv-responsive col-sm-12 col-md-2"
                    >
                      <i className="bi-instagram fs-5" />
                    </label>
                    <div className="col-sm-12 col-md-10 align-self-center">
                      <div className="input-group input-group-sm has-validation">
                        <span className="input-group-text ">@</span>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="instagram"
                          placeholder="username"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label
                      htmlFor="facebook"
                      className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
                    >
                      <i className="bi-facebook fs-5" />
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
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          id="facebook"
                          placeholder="profile.php?id=100069713140006"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="other"
                      />
                    </div>
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="@username or http://..."
                      />
                    </div>
                  </div>
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
  }
  return <>{persons}</>;
}
