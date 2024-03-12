const API_ADDRESS = 'https://m3.kosipov.ru/';

export const register = (login, password, firstName, lastName) => {
    return fetch(API_ADDRESS + 'registration', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({'email': login, 'password': password, 'first_name': firstName, 'last_name': lastName})
    });
}

export const login = (login, password) => {
    return fetch(API_ADDRESS + 'authorization', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'email': login, 'password': password})
    })
}

export const getFilesRequest = () => {
    const token = localStorage.getItem('TOKEN');
    return fetch(API_ADDRESS + 'files/disk', {
        headers: {Authorization: `Bearer ${token}`}
    })
};

export const deleteFileRequest = (id) => {
    const token = localStorage.getItem('TOKEN');
    return fetch(`${API_ADDRESS}files/${id}`, {
        headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        method: 'DELETE',
    })
};

export const editFileRequest = (fileId, name) => {
    const token = localStorage.getItem('TOKEN');
    return fetch(`${API_ADDRESS}files/${fileId}`, {
        headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        method: 'PATCH',
        body: JSON.stringify({'name': name})
    })
}

export const downloadFileRequest = async (url) => {
    const token = localStorage.getItem('TOKEN');
    return (await fetch(`https://${url}`, {
        headers: {Authorization: `Bearer ${token}`}
    })).blob();
};

export const addFileAccessRequest = async (fileId, email) => {
    const token = localStorage.getItem('TOKEN');
    return fetch(`${API_ADDRESS}files/${fileId}/accesses`, {
        headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify({'email': email})
    })
}

export const deleteFileAccessRequest = async (fileId, email) => {
    const token = localStorage.getItem('TOKEN');
    return fetch(`${API_ADDRESS}files/${fileId}/accesses`, {
        headers: {Authorization: `Bearer ${token}`, "Content-Type": "application/json"},
        method: 'DELETE',
        body: JSON.stringify({'email': email})
    })
}

export const uploadFileRequest = async (files) => {
    const formDataObj = new FormData();
    files.forEach((value) => formDataObj.append(`files[]`, value));
    const token = localStorage.getItem('TOKEN');
    const header = new Headers();
    header.append("Authorization", `Bearer ${token}`);

    return fetch(`${API_ADDRESS}files`, {
        headers: header,
        method: 'POST',
        body: formDataObj
    })
}