import {Form, useLoaderData, useNavigate} from "react-router-dom";
import React from "react";

export const File = () => {
    const file = useLoaderData();
    const navigate = useNavigate();

  return (
      <Form method={"put"} action={`/files/${file.data.id}`}>
          <p>
              <span>Name</span>
              <input
                  placeholder="First"
                  aria-label="First name"
                  type="text"
                  name="first"
                  defaultValue={file.data.email}
              />
              <input
                  placeholder="Last"
                  aria-label="Last name"
                  type="text"
                  name="last"
                  defaultValue={file.data.first_name}
              />
          </p>
          <p>
              <button type="submit">Save</button>
              <BackButton navigate={navigate} />
              {/*<button
                  type="button"
                  onClick={() => {
                      navigate(-1);
                  }}
              >
                  Назад
              </button>*/}
          </p>
      </Form>
  )
}

const BackButton = (navigate) => {
    return (
        <button
            type="button"
            onClick={() => {
                navigate(-1);
            }}
        >
            Назад
        </button>
    );
}