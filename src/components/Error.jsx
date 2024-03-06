import { useNavigate } from "react-router-dom";

export const Error = () => {
    const navigate = useNavigate();
    return (
        <div>
            ERROR
            <button
          type="button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Назад
        </button>
        </div>
    )
}