import React from 'react';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom';

import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import "./App.css"
import { Provider } from 'react-redux';
import store from './store';
import Contact from "./containers/Contact";
import Navbar from "./components/Navbar";

const App = () => (
    <Provider store={store}>
        <Router>
                <Navbar/>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/' component={Home} />
                {/*<Redirect to='/'/>*/}
        </Router>
    </Provider>
);

export default App;
