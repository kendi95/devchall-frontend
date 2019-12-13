import React from 'react';
import { Redirect } from 'react-router-dom';

import AppBar from '../../components/AppBar';

import { Container } from '@material-ui/core';

const token = localStorage.getItem('token');

export default function Home() {

    if(token === null){
        return (
            <Redirect to="/signin"/>
        );
    } else {
        return (
            <div>
                <AppBar />
                <Container fixed>
                    <h2>Home</h2>
                </Container>
            </div>
        );
    }
    
}