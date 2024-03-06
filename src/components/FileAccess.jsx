import {useLoaderData, useParams} from "react-router-dom";

export const FileAccess = () => {
    const users = useLoaderData();
    const userId = useParams();

    const currentUser = users.data.filter((user) => user.id === userId);

    if (!currentUser) {
        return <div></div>;
    }
}