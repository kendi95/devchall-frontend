import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import Recovery from './pages/Recovery';

export default function Router() {

    return (
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" component={Perfil} />
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Login}/>
                <Route path="/recovery" component={Recovery}/>
            </Switch>
        </BrowserRouter>
        
    )

}