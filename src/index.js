import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { redirect } from "react-router-dom";
import {
  addFileAccessRequest,
  deleteFileAccessRequest,
  deleteFileRequest, downloadFileRequest,
  editFileRequest,
  getFilesRequest,
  login,
  register, uploadFileRequest
} from './api';
import {Error} from './components/Error';
import { FileList } from './components/FileList';
import {File} from "./components/File";
import {FileAccess} from "./components/FileAccess";
import {FileUpload} from "./components/FileUpload";

const root = ReactDOM.createRoot(document.getElementById('root'));

export const downloadFile = async (fileUrl, fileName) => {
  const result = await downloadFileRequest(fileUrl);
  const link = document.createElement('a');
  link.href = URL.createObjectURL(result);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const registerAction = async ({ request, params }) => {
  const formData = await request.formData();
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const password = formData.get("password");
  const result = await register(email, password, firstName, lastName);
  if (result.ok) {
    return redirect(`/login`);
  } else {
    throw new Error();
  }
}

export const loginAction = async ({request, params}) => {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const result = await login(email, password);
  if (result.ok) {
    const jsonResponse = await result.json();
    localStorage.setItem('TOKEN', jsonResponse['token'])
    return redirect(`/files`);
  } else {
    throw new Error();
  }
}

export const getFiles = async () => {
  const result = await getFilesRequest();

  if (result.ok) {
    return await result.json()
  }
}

export const deleteFileAction = async ({params}) => {
  console.log(params);
  await deleteFileRequest(params.fileId);

  return redirect("/files")
}

export const editFileAction = async ({request, params}) => {
  const formData = await request.formData();
  await editFileRequest(params.fileId, formData.get("fileName"));

  return redirect("/files")
}

export const getFileLoader = async ({params}) => {
  const result = await getFilesRequest()

  if (result.ok) {
    return await result.json();
  }
}

export const getFileAccessLoader = async ({params}) => {
  const result = await getFilesRequest();
  if (result.ok) {
    const files = await result.json();

    const currentFile = files.filter((file) => file.file_id === params.fileId)[0];

    return currentFile.access
  }
}

export const addAccessAction = async ({request, params}) => {
  const formData = await request.formData();
  await addFileAccessRequest(params.fileId, formData.get("email"));

  return redirect(`/files/${params.fileId}/access`);
}

export const deleteAccessAction = async ({request, params}) => {
  const formData = await request.formData();
  await deleteFileAccessRequest(params.fileId, formData.get("email"));

  return redirect(`/files/${params.fileId}/access`);
}

export const uploadFileAction = async ({request}) => {
  const formData = await request.formData();
  const files = formData.getAll('files[]');
  const result = await uploadFileRequest(files);

  return await result.json();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
    action: registerAction,
    errorElement: (<Error />)
  },
  {
    path: "login",
    element: <Login />,
    action: loginAction
  },
  {
    path: "error",
    element: <Error />
  },
  {
    path: "files",
    element: <FileList />,
    loader: getFiles,
  },
  {
    path: "files/:fileId/delete",
    action: deleteFileAction,
    element: (<div></div>)
  },
  {
    path: "files/:fileId",
    action: editFileAction,
    element: <File />
  },
  {
    path: "files/:fileId/access",
    loader: getFileAccessLoader,
    element: <FileAccess />
  },
  {
    path: "files/:fileId/addAccess",
    action: addAccessAction,
    element: (<div></div>)
  },
  {
    path: "files/:fileId/deleteAccess",
    action: deleteAccessAction,
    element: (<div></div>)
  },
  {
    path: "files/upload",
    element: <FileUpload />,
    action: uploadFileAction
  }
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
