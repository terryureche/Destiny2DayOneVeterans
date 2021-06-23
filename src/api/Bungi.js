import axios from "./../utils/api/axios";
import apiKey from './../../key';

const searchUser = async (data) => {
    const path = '/User/SearchUsers/';
    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
        params: {
            q: data
        }
    };

    const resp = await axios.get(path, params);

    return resp;
}

const getMembershipDataById = async (userId) => {
    const path = `/User/GetMembershipsById/${userId}/-1`;

    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
    };

    const resp = await axios.get(path, params);

    return resp;
}

const getSummaryProfile = async (type, id, component) => {
    const path = `/Destiny2/${type}/Profile/${id}/?components=${component}`;
    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
    };

    const resp = await axios.get(path, params);

    return resp;
}

export {
    searchUser,
    getMembershipDataById,
    getSummaryProfile
}