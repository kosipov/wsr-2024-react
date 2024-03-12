import {Form, Outlet, useActionData, useSubmit} from "react-router-dom";
import './styles/FileUpload.css';
import {downloadFile} from "../index";

export const FileUpload = () => {

    const submit = useSubmit();
    const uploadedFiles = useActionData();

    return (
        <div draggable={true} className='container'>
            <Form id={'upload-file'} method={'POST'} encType="multipart/form-data">
                <input onChange={(ev) => {
                    submit(ev.currentTarget.form)
                }} className={'box'} id={'upload-file-input'} multiple type={"file"} name={"files[]"}/>
            </Form>
            {uploadedFiles &&
                (<div>
                    {uploadedFiles.map((uploadedFile) =>
                        (<div key={uploadedFile.file_id}>
                            <div>{uploadedFile.name}</div>
                            <button
                                onClick={() => downloadFile(`${uploadedFile.url}`, `${uploadedFile.name}`)}>Скачать
                            </button>
                        </div>)
                    )
                    }
                </div>)}
            <Outlet />
        </div>
    )
}