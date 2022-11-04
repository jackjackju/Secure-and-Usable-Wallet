import React, {useState} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import axios from "axios";
import {Alert} from "@mui/material";
import {connect} from "react-redux";

function ContactModal ({token, user_id}) {
    const [open, setOpen] = React.useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    });

    const [message, setMessage] = useState();
    const [notice, setNotice] = useState();
    const { name, phone, email } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    //Submit sign up request
    const addContact = async () => {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            user_id: user_id,
            token: token
        });

        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/add`, body, config);
            setMessage("");
            setNotice("");
            if (res.data.message !== "Success"){
                setMessage(res.data.message);
            }
            else{
                setNotice("Close the modal and refresh the page to see new contact");
            }
        }
        catch (err){
            setMessage("Error when adding new contact");
        }
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Add New Contact</Button>}
        >
            <Modal.Header>Add a Contact</Modal.Header>
            <Modal.Content>
                {message && <Alert severity="error">{message}</Alert>}
                {notice && <Alert severity="success">{notice}</Alert>}
                <form>
                    <div className='form-group'>
                        <label className='form-label'>Name: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Username*'
                            name='name'
                            onChange={e => onChange(e)}
                            value={name}
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label mt-3'>Phone: </label>
                        <input
                            className='form-control'
                            type='text'
                            placeholder='Email*'
                            name='phone'
                            onChange={e => onChange(e)}
                            value={phone}
                            minLength='6'
                            required
                        />
                    </div>
                    <div className='form-group'>
                        <label className='form-label mt-3'>Email: </label>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='Email*'
                            name='email'
                            onChange={e => onChange(e)}
                            value={email}
                            required
                        />
                    </div>
                </form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
                <Button
                    content="Add"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => {addContact()}}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token,
    user_id: state.auth.user_id
})

export default connect(mapStateToProps)(ContactModal);

