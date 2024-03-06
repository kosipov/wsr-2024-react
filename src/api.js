const API_ADDRESS = 'https://reqres.in/';

export const register = (login, password, firstName, lastName) => {
    return fetch(API_ADDRESS + 'api/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({'email': login, 'password': password})
    });
}

export const login = (login, password) => {
    return fetch(API_ADDRESS + 'api/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({'email': login, 'password': password})
    })
}

export const getFilesRequest = () => (
    fetch(API_ADDRESS + 'api/users')
);

export const deleteFile = (id) => {
    return fetch(`${API_ADDRESS}api/users/${id}`, {
        method: "DELETE"
    })
};

export const getFile = (id) => {
  return fetch(`${API_ADDRESS}api/users/${id}`)
};