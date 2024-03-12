import {Form, useLocation, useNavigate} from "react-router-dom";
import React from "react";

export const File = () => {
    const navigate = useNavigate();
    const {state} = useLocation();
    const name = state.name

  return (
      <Form method={"put"} id="file=form">
          <p>
              <span>Name</span>
              <input
                  placeholder="Name"
                  aria-label="Name"
                  type="text"
                  name="fileName"
                  defaultValue={name}
              />
          </p>
          <p>
              <button type="submit">Save</button>
              <BackButton navigate={navigate} />
          </p>
      </Form>
  )
}

const BackButton = ({navigate}) => {
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