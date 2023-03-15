import type { TContact } from "~/components/contacts/Helpers";
import { TContactTypes } from "~/components/contacts/Helpers";
import { t } from "~/utils";
import React from "react";

export default function Categories(props: { contact: TContact }) {
  return (
    <div className="card mb-3 shadow">
      <div className="card-header">{t`Categories / Origins`}</div>
      <div className="card-body">
        <form className="needs-validation" noValidate>
          <div className="row mb-2">
            <label
              htmlFor="contactTypes_1"
              className="form-label-hv-responsive col-sm-12 col-md-3"
            >
              {t`Contact type`}
            </label>
            <div className="col-sm-12 col-md-9">
              <select
                className="form-select form-select-sm"
                id="contactTypes_1"
                required
                defaultValue="Gastronomie"
              >
                <option value="">Choose...</option>
                <option>Feuerkünstler</option>
                <option>Gastronomie</option>
              </select>
              <select
                className="form-select form-select-sm"
                id="contactTypes_2"
                required
              >
                <option value="">Choose...</option>
                <option>Feuerkünstler</option>
                <option>Gastronomie</option>
              </select>
            </div>
            <div className="form-text text-end">
              <a href="~/contacts/main/Categories#">more...</a>
            </div>
          </div>
          <hr className="my-4" />
          <div className="row mb-2">
            <label
              htmlFor="contactTypes_1"
              className="form-label-hv-responsive col-sm-12 col-md-3"
            >
              {t`Origin`}
            </label>
            <div className="col-sm-12 col-md-9">
              <select
                className="form-select form-select-sm"
                id="contactTypes_1"
                required
                defaultValue="Formular"
              >
                <option value="">Choose...</option>
                <option>Formular</option>
                <option>Import</option>
              </select>
              <select
                className="form-select form-select-sm"
                id="contactTypes_2"
                required
              >
                <option value="">Choose...</option>
                <option>Formular</option>
                <option>Import</option>
              </select>
            </div>
            <div className="form-text text-end">
              <a href="~/contacts/main/Categories#">more...</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
