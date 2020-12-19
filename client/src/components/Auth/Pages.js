import React from 'react'
import {Switch, Route} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';

function Pages() {
    return (
        <Switch>
            <Route path='/signup' component={Register}/>
            <Route path="/signin" component={Login}/>
            <Route path="/" component={Home}/>
        </Switch>
    )
}

export default Pages
