import React, { ReactNode } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { checkIdError, nullDef, t } from "~/utils";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useLocation } from "@remix-run/react";
import ContactObjectsList from "./list";
import { ContactObjectsEdit } from "./edit";
import type { TContactObject } from "~/lib/Helpers";
import { faker } from "@faker-js/faker";

export const loader = () => {
  return json({});
};

const objList = Array<TContactObject>();
for (let i = 0; i < 5; i += 1) {
  objList.push({
    id: faker.random.alphaNumeric(),
    name: faker.random.words(2),
    width: faker.datatype.number(),
    length: faker.datatype.number(),
    image: faker.image.imageUrl(100, 480 * (100 / 640)),
    notes: faker.random.words(i * 2),
  });
}

export default function ContactObjects() {
  //console.log(useLocation())

  useLoaderData();
  const navigate = useNavigate();
  const { objectId, contactId, _module, _invoke } = useParams();
  //console.log("paramsobj",objectId, contactId, objectAction)
  const _exec = _invoke || "list";
  console.log("invoke", _invoke);

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
      <div className="card shadow mb-3">
        {/* execute(_exec, contactId, objectId) */}
        <ContactObjectsList objects={objList} />
      </div>
    </div>
  );
}
