import {Form, Link, Outlet, useLoaderData} from "react-router-dom";


export const FileList = () => {
    const files = useLoaderData();

    return (
        <div>
            {files.data.map((file) =>
                (<div key={file.id}>
                    <img src={file.avatar}/> {file.id} {file.email}
                    <Link to={`/files/${file.id}`}>{file.first_name}</Link>
                    {file.last_name}
                    <Form method={"delete"} action={`/files/${file.id}/delete`}>
                        <button type="submit">
                            Delete
                        </button>
                    </Form>
                </div>)
            )}
            <Outlet />
        </div>
    )
}