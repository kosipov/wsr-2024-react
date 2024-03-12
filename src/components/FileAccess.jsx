import {Form, useLoaderData, useParams} from "react-router-dom";

export const FileAccess = () => {
    const params = useParams();
    const loader = useLoaderData();

    return (<div>
        <Form action={`/files/${params.fileId}/addAccess`} method={'POST'}>
            <input type={"email"} name={"email"}/>
        </Form>
        {loader.map((access) => (
            <div key={access.email}>
                {access.fullname + " "}
                {access.email}
                <Form action={`/files/${params.fileId}/deleteAccess`} method={"DELETE"}>
                    <input type={"hidden"} name={"email"} value={access.email} />
                    <button type={"submit"}>Удалить пользователя</button>
                </Form>
            </div>
        ))}
    </div>)
}