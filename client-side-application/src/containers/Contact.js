import {useState, useEffect} from "react";
import {Box, Grid} from '@mui/material';
import {connect} from "react-redux";
import {Alert} from "@mui/material";
import axios from "axios";
import ContactModal from "../components/ContactModal";
import ContactPopup from "../components/ContactPopup";
import {keyDerivation} from "../api/mnemonic";


function Contact ({token, user_id}) {
    const [auth, setAuth] = useState("");
    const [contact, setContact] = useState([])
    const [key, setKey] = useState(localStorage.getItem("key"))
    const [sk, setSk] = useState(keyDerivation(localStorage.getItem("key"), "m/0'").privateKeyStr)

    const refresh = async () => {
        setAuth("");
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        const body = JSON.stringify({
            user_id: user_id,
            token: token
        });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard`, body, config);
            setAuth(res.data.message);
            console.log(res);
            if (res.data.message === "Success") {
                setContact(res.data.data);
            }
        } catch (err) {
            console.log(err);
            setAuth("Error when authenticating user. Try logout and login again.");
            return;
        }
    }

    return (
        <div>
                <h1>11</h1>
            <h2>{key}</h2>
            <h2>{sk}</h2>
        </div>
    );
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps)(Contact);
