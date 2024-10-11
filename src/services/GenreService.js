import * as http from "../common/http-common";
import axios from 'axios';

const URLAPI = "https://localhost:7128";

export const getGenres = async () => {
    try {
        const response = await axios.get(`${URLAPI}/api/Genre`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getGenreById = async (id) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Genre/${id}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const getGenreByQuery = async (query) => {
    try {
        const response = await axios.get(`${URLAPI}/api/Genre/search/${query}`);
        return [response, null];
    } catch (error) {
        return [null, error];
    }
};

export const postGenre = async (data) => {
    try {
        const res = await http.post(`${URLAPI}/api/Genre`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const updateGenre = async (id, data) => {
    try {
        const res = await http.put(`${URLAPI}/api/Genre/${id}`, data);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}

export const deleteGenre = async (id) => {
    try {
        const res = await http.remove(`${URLAPI}/api/Genre/${id}`);
        return [res, null];
    } catch (error) {
        return [null, error];
    }
}