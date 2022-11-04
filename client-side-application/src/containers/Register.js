import React, {useEffect, useState} from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import {Alert, Paper} from '@mui/material';
import {updateKeyPwd} from "../api/dropbox";
import {encryption} from "../api/encryption";
import {asymDecryption, asymEncryption, generateSeed, keyDerivation} from "../api/mnemonic";

const Register = ({ register, token }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        re_password: ''
    });

    const [message, setMessage] = useState();

    const { username, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [auth, setAuth] = useState(false);
    const [url, setUrl] = useState("https://www.dropbox.com/oauth2/authorize?client_id=b4g3pkyizkf2me5&response_type=token&redirect_uri=http://localhost:3000/register")

    useEffect(async () => {
        const code = window.location.href
        const contains = code.includes("token=");
        setAuth(contains);
        if (contains === true){
            let key = code.toString().split("token")[1];
            key = key.substring(1, key.length-1)
            localStorage.setItem("dropbox", key);
        }
    })

    //Submit sign up request
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== re_password){
            setMessage("Inconsistent password");
            return;
        }

        try{
            const ret = await register(username, password);
            console.log(ret);
            setMessage(ret.pwd);
            if (ret.pwd !== ""){
                console.log(123);
                const key = await updateKeyPwd(username, "keyPwd", encryption(ret.pwd, password));
                const s0 = generateSeed();
                const s1 = generateSeed();
                const keyPair = keyDerivation(s0, "m/0'")
                const updateS0 = await updateKeyPwd(username, "secret0", encryption(s0, password))
                const encrypted = asymEncryption(keyPair.publicKeyStr, keyPair.privateKeyStr, s1);
                console.log(s1);
                console.log(encrypted);
                console.log(keyPair);
                console.log(asymDecryption(keyPair.publicKeyStr, keyPair.privateKeyStr, encrypted));
                const updateS1 = await updateKeyPwd(username, "secret1", encrypted)
            }
        }
        catch (err){
            console.log(err)
            setMessage("Error when signing up user");
        }
    };

    //Redirection to info page when logged in
    // if (token)
    //     return <Redirect to='/contact'/>;

    return (
        <div className='container mt-5'>
            <Paper style={{ padding: "40px 20px",marginTop: 10 }}>
            <h1>Register for Contact</h1>
            <p>Create an account with Contact application</p>
            {message && <Alert severity="info">{message}</Alert>}
                {auth && <form onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <label className='form-label'>Username: </label>
                    <input
                        className='form-control'
                        type='text'
                        placeholder='Username*'
                        name='username'
                        onChange={e => onChange(e)}
                        value={username}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Password*'
                        name='password'
                        onChange={e => onChange(e)}
                        value={password}
                        minLength='6'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label className='form-label mt-3'>Confirm Password: </label>
                    <input
                        className='form-control'
                        type='password'
                        placeholder='Confirm Password*'
                        name='re_password'
                        onChange={e => onChange(e)}
                        value={re_password}
                        minLength='6'
                        required
                    />
                </div>
                {auth && <button className='btn btn-primary mt-3' type='submit'>Register</button>}
            </form>}
                {!auth && <button className='btn btn-primary mt-3'><a href={url}>Auth</a></button>}
            <p className='mt-3'>
                Already have an Account? <Link to='/login'>Login</Link>
            </p>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, {register})(Register);
