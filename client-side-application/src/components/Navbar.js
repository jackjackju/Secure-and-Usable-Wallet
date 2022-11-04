import {useHistory} from "react-router-dom";
import { connect } from 'react-redux';
import {logout} from "../actions/auth";

import { Menu  } from 'semantic-ui-react'
import {Link} from "react-router-dom";

function NavBar ({logout, token}) {

    const history = useHistory();

    //User logout
    async function clickHandler(e) {
        e.preventDefault();
        await logout();
        history.push("/login");
    }

    function navHandler(target) {
        history.push(target);
    }

    //Navigation bar
    return (
        <header>
            <div>
                <Menu color={"black"} fluid widths={5} size={"huge"} inverted>
                    <Menu.Item as={Link} to={'/'} >Home</Menu.Item>
                    {(token !== undefined) && (token !== "") && <Menu.Item as={Link} to={'/contact'}>Contact</Menu.Item>}
                    {!((token !== undefined) && (token !== "")) && <Menu.Item as={Link} to={'/login'}>Login</Menu.Item>}
                    {!((token !== undefined) && (token !== "")) && <Menu.Item as={Link} to={'/register'}>Register</Menu.Item>}
                    {(token !== undefined) && (token !== "") && <Menu.Item onClick={clickHandler}>Logout</Menu.Item>}
                </Menu>
            </div>
        </header>
    )
}

const mapStateToProps = (state) => ({
    token: state.auth.token
})

export default connect(mapStateToProps, {logout})(NavBar);
