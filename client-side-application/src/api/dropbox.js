import axios from "axios";
import {decryption, encryption} from "./encryption";

export const updateKeyPwd = async (username, target, data) => {
    const key = "Bearer " + localStorage.getItem("dropbox");
    const arg = "{\"autorename\":false,\"mode\":\"add\",\"mute\":false,\"path\":\"/" + username + "/" + target + ".txt\",\"strict_conflict\":false}"

    const config = {
        headers: {
            "Authorization": key,
            "Dropbox-API-Arg": arg,
            "Content-Type": "application/octet-stream"
        }
    };

    const body = data;

    try {
        const res = await axios.post(`${process.env.REACT_APP_DROPBOX_APP_API_URL}/2/files/upload`, body, config);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err)
    }
};

export const getKeyPwd = async (username, target, decKey) => {
    const key = "Bearer " + localStorage.getItem("dropbox");
    const arg = "{\"path\":\"/" + username + "/" + target + ".txt\"}"

    const config = {
        headers: {
            "Authorization": key,
            "Dropbox-API-Arg": arg,
            "Content-Type": "application/octet-stream"
        }
    };

    const body = ""

    try {
        const res = await axios.post(`${process.env.REACT_APP_DROPBOX_APP_API_URL}/2/files/download`, "", config);
        console.log(res);
        return res.data;
    } catch (err) {
        console.log(err)
    }
};

export const authorization = async (clientId) => {
    try {
        const res = await axios.get(`https://www.dropbox.com/oauth2/authorize?client_id=` + clientId + `&redirect_uri=http://localhost:3000/login&response_type=code`);
        console.log(res);
        return res;
    } catch (err) {
        console.log(err)
    }
};