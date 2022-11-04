import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import {Alert, Paper} from '@mui/material';
import {authorization, getKeyPwd, updateKeyPwd} from "../api/dropbox";
import {asymDecryption, asymEncryption, generateSeed, keyDerivation} from "../api/mnemonic";
import {decryption, encryption} from "../api/encryption";
import { useLocation } from 'react-router-dom'

const Login = ({ login, token }) => {
    const [message, setMessage] = useState();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const { username, password } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const [auth, setAuth] = useState(false);
    const [url, setUrl] = useState("https://www.dropbox.com/oauth2/authorize?client_id=b4g3pkyizkf2me5&response_type=token&redirect_uri=http://localhost:3000/login")

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

    //Submit login request
    const onSubmit = async (e) => {
        try{
            e.preventDefault();
            var ret = await getKeyPwd(username, "keyPwd");

            const getS0 = await getKeyPwd(username, "secret0")
            const getS1 = await getKeyPwd(username, "secret1")
            const s0 = decryption(getS0, password);
            console.log(s0);
            const keyPair = keyDerivation(s0, "m/0'");
            console.log(keyPair);
            console.log(getS1)
            const s1 = asymDecryption(keyPair.publicKeyStr, keyPair.privateKeyStr, getS1);
            console.log(s1);
            localStorage.setItem("key", s1);

            const key = decryption(ret, password);
            ret = await login(username, key);
            setMessage(ret);
        }
        catch (err){
            console.log(err)
            setMessage("Error when logging in");
        }
    };

    //Redirection when logged in
    if (token)
        return <Redirect to='/contact'/>;

    return (
        <div className='container mt-5'>
            <Paper style={{ padding: "40px 20px",marginTop: 10 }}>
                <h1>Login</h1>
                <p>Sign into your Contact account</p>
                {message && <Alert severity="error">{message}</Alert>}
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
                    <br/>
                    <div className='form-group'>
                        <label className='form-label mt-3'>Password: </label>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='Password*'
                            name='password'
                            onChange={e => onChange(e)}
                            value={password}
                            // minLength='6'
                            // required
                        />
                    </div>
                    <br />
                    <button className='btn btn-primary mt-3' type='submit'>Login</button>
                </form>}
                {!auth && <button className='btn btn-primary mt-3'><a href={url}>Auth</a></button>}
                <p className='mt-3'>
                    Don't have an Account? <Link to='/register'>Register</Link>
                </p>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({
    token: state.auth.token
});

export default connect(mapStateToProps, {login})(Login);
