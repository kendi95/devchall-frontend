import React from 'react';
import { Redirect } from 'react-router-dom';

import AppBar from '../../components/AppBar';

const token = localStorage.getItem('token');

export default function Home() {

    if(token === null){
        return (
            <Redirect to="/signin"/>
        );
    } else {
        return (
            <AppBar />
        );
    }
    
}