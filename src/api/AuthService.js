import request from './axios';

const login = (email, password) => {
    return request.post('auth/login', {
        email: email,
        password: password
    });
};

const register = (fullName, email, password) => {
    return request.post('auth/register',{
        fullName: fullName,
        email: email,
        password: password
    });
}

const logOut = (authToken) => {
    return request.get('auth/logout', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
}


export { login, register, logOut}; 