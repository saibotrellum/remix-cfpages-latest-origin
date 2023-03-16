import React from 'react';
import { t } from '@lingui/macro';

export default function Media() {
  function showCard() {
    return (
      <div className="col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <div className="card shadow mb-3 p-2">
          <div className="card-body justify-content-center p-0">
            <div>
              <div className="mb-2 text-center">
                <img
                  src="https://www.w3schools.com/images/w3schools_green.jpg"
                  alt="W3Schools.com"
                  className="border"
                />
              </div>
              <div className=" bg-light mb-2 border p-2">
                <div className="row">
                  <div className="col-sm-5 small">
                    {t`Width`}
                    :
                  </div>

                  <div className="col-sm-7 small text-end">
                    300 px
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5 small">
                    {t`Height`}
                    :
                  </div>
                  <div className="col-sm-7 small text-end">
                    300 px
                  </div>
                </div>
              </div>
              <div className="mb-2 p-2 border">
                <div className="row mb-2">
                  <label
                    htmlFor="type"
                    className="form-label-hv-responsive col-sm-5"
                  >
                    {t`Type`}
                    :
                  </label>
                  <div className="col-sm-7 ps-0">
                    <select
                      className="form-select form-select-sm"
                      id="type"
                    >
                      <option>{t`Logo`}</option>
                      <option>{t`Main image`}</option>
                      <option>{t`other`}</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-2">
                  <label
                    htmlFor="description"
                    className="form-label-hv-responsive col-sm-5"
                  >
                    {t`Description`}
                    :
                  </label>
                  <div className="col-sm-7 align-self-center ps-0">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      id="description"
                      placeholder={t`other`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-start">
      {showCard()}
      {showCard()}
      {showCard()}
      {showCard()}
    </div>
  );
}
