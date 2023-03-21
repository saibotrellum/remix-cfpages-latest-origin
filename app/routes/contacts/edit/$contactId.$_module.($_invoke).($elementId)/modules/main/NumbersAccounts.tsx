import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { t } from "~/utils";

export default function NumbersAccounts() {
  return (
    <>
      <div className="card shadow mb-3">
        <div className="card-header">{t`Numbers and Contact Information`}</div>
        <div className="card-body">
          <div className="row mb-2">
            <label
              htmlFor="name"
              className="form-label-hv-responsive col-sm-12 col-md-4"
            >
              {t`Phone`}:
            </label>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="(+49) 1289 / 15618411"
              />
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="name"
              className="form-label-hv-responsive col-sm-12 col-md-4"
            >
              {t`Fax`}:
            </label>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="(+49) 1289 / 15618411"
              />
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="name"
              className="form-label-hv-responsive col-sm-12 col-md-4"
            >
              {t`Mobile`}:
            </label>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="(+49) 1289 / 15618411"
              />
            </div>
          </div>
          <div className="row mb-2">
            <label
              htmlFor="name"
              className="form-label-hv-responsive col-sm-12 col-md-4"
            >
              {t`E-Mail`}:
            </label>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="beispiel@domain.de"
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-sm-12 col-md-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="other"
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="(+49) 1289 / 15618411"
              />
            </div>
          </div>
          <div className="form-text text-end">
            <a href="~/contacts/main/NumbersAccounts#">more...</a>
          </div>
        </div>
      </div>
      <div className="card shadow mb-3">
        <div className="card-header">{t`Social Media & Online Presence`}</div>
        <div className="card-body">
          <div className="row mb-2">
            <label
              htmlFor="facebook"
              className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
            >
              <FAI icon={faLink} size="1x" />
            </label>
            <div className="col-sm-12 col-md-10 align-self-center">
              <div className="input-group input-group-sm has-validation">
                <span className="input-group-text ">
                  <small>
                    <small>
                      <small>https:///</small>
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
              className="form-label-hv-responsive col-sm-12 col-md-2 text-muted"
            >
              <FAI icon={faInstagram} size="1x" />
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
              <FAI icon={faFacebook} size="1x" />
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
            <div className="col-sm-12 col-md-4">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="other"
              />
            </div>
            <div className="col-sm-12 col-md-8">
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="@username or http://..."
              />
            </div>
          </div>
          <div className="form-text text-end">
            <a href="~/contacts/main/NumbersAccounts#">more...</a>
          </div>
        </div>
      </div>
    </>
  );
}
