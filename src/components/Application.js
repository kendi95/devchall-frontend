import React from 'react';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Route from '../routes';

let token = localStorage.getItem("token");

export default props => {

    if(token === null){
        return (
            <div>
                <Login />
            </div>
        )
    } else {
        return (
            <div>
                <Home />
            </div>
        )
    }
    
}