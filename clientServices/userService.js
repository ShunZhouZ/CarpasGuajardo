import axios from 'axios';

const userServiceFactory = () => {
    function login(username, password) {
        return axios.post('/api/auth', { username, password });
    }

    function createUser(username, password, nombre, correo, contacto) {
        return axios.post('/api/signup', { username, password, nombre, correo, contacto });
    }
    return {login, createUser};
};

module.exports = {
    userServiceFactory
};