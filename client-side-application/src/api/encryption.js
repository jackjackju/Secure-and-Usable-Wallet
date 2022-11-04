import axios from 'axios';
import CryptoJS from "crypto-js";

export const encryption = (msg, key) =>{
    return CryptoJS.AES.encrypt(msg, key).toString();
};

export const decryption = (msg, key) => {
    const bytes  = CryptoJS.AES.decrypt(msg, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};