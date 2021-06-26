import axios from "./../utils/api/axios";
import apiKey from './../../key';

const searchUser = async (data) => {
    const path = '/Platform/User/SearchUsers/';
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
    const path = `/Platform/User/GetMembershipsById/${userId}/-1`;

    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
    };

    const resp = await axios.get(path, params);

    return resp;
}

const getSummaryProfile = async (type, id, component) => {
    const path = `/Platform/Destiny2/${type}/Profile/${id}/?components=${component}`;
    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
    };

    const resp = await axios.get(path, params);

    return resp;
}

const getPublicMilestones = async () => {
    const path = `/Platform/Destiny2/Milestones`;
    const params = {
        headers: {
            'X-API-KEY': apiKey
        },
    };

    const resp = await axios.get(path, params);

    return resp;
}

const getManifest = async () => {
    const path = `/Platform/Destiny2/Manifest`;
    const params = {
        headers: {
            'X-API-KEY': apiKey
        }
    }

    const resp = await axios.get(path, params);

    return resp;
}

const basicBungieGet = async (path) => {
    const params = {
        headers: {
            'X-API-KEY': apiKey
        }
    }

    const resp = await axios.get(path, params);

    return resp;
}

export {
    searchUser,
    getMembershipDataById,
    getSummaryProfile,
    getPublicMilestones,
    getManifest,
    basicBungieGet
}