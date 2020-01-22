import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Perfil from './pages/Perfil';

export default function Router() {

    return (
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" component={Perfil} />
                <Route path="/signup" component={Signup}/>
                <Route path="/signin" component={Login}/>
            </Switch>
        </BrowserRouter>
        
    )

}