import * as http from "../common/http-common";
import axios from 'axios';

const URLAPI = "https://localhost:7128";

export const login = async (loginData) => {
    try {
        const response = await axios.post(`${URLAPI}/api/Auth/Login`, loginData);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const register = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/Auth/Register`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}
