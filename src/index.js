import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { redirect } from "react-router-dom";
import {deleteFile, getFile, getFilesRequest, login, register} from './api';
import {Error} from './components/Error';
import { FileList } from './components/FileList';
import {File} from "./components/File";

const root = ReactDOM.createRoot(document.getElementById('root'));


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
  await deleteFile(params.fileId);

  return redirect("/files")
}

export const getFileLoader = async ({params}) => {
  const result = await getFile(params.fileId)

  if (result.ok) {
    return await result.json();
  }
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
    loader: getFileLoader,
    element: <File />
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
