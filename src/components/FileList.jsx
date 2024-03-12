import {Form, Link, Outlet, useLoaderData} from "react-router-dom";
import {downloadFile} from "../index";


export const FileList = () => {
    const files = useLoaderData();

    return (
        <div>
            {files.map((file) =>
                (<div key={file.file_id}>
                    {file.file_id} {file.name}
                    <Link to={`/files/${file.file_id}`} state={{name: file.name}}>Edit</Link>
                    <Link to={`/files/${file.file_id}/access`} state={{fileAccess: file.access}}>Права доступа</Link>
                    <Form method={"delete"} action={`/files/${file.file_id}/delete`}>
                        <button type="submit">
                            Delete
                        </button>
                    </Form>
                    <button onClick={() => downloadFile(`${file.url}`, `${file.name}`)}>Скачать</button>
                </div>)
            )}
            <Link to={`/files/upload`}><button>Добавить файлы</button></Link>
            <Outlet />
        </div>
    )
}