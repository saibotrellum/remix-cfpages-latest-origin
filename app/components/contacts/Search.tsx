import { Button, Form } from "react-bootstrap";
import { useFormAction } from "@remix-run/react";

type TContactSearch = {
  organisation: string;
  firstname: string;
  lastname: string;
};

export default function Search() {
  const { register, handleSubmit } = useFormAction<TContactSearch>();
  const onSubmit = (data: TContactSearch) => console.log(data);

  return (
    <div className="nk-sidebar" data-content="sidebarMenu">
      <div className="nk-sidebar-inner" data-simplebar>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h6 className="overline-title text-primary-alt">{t`Search`}</h6>
          <Form.Group>
            <Form.Label htmlFor="searchorg">{t`Organisation`}:</Form.Label>
            <Form.Control id="searchorg" {...register("organisation")} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="searchfirstname">{t`First name`}:</Form.Label>
            <Form.Control id="searchfirstname" {...register("firstname")} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="searchlastname">{t`Last name`}:</Form.Label>
            <Form.Control id="searchlastname" {...register("lastname")} />
          </Form.Group>
          <Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}
