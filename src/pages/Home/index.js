import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Container } from '@material-ui/core';

import AppBar from '../../components/AppBar';

import api from '../../services/api';


export default function Home({history}) {
    const hasToken = localStorage.getItem('token');

    const [isToken, setIsToken] = useState('');

    useEffect(() => {

        async function isValidatedToken() {

            if(hasToken === null){
                return history.push("/signin");
            }

            try{
                const res = await api.get("/validated_token", {
                    params: {
                        token: hasToken
                    }
                });
                const { token } = res.data;
                setIsToken(token);

                if(isToken !== null){
                    return (
                        <>
                            <AppBar />
                            <Container fixed>
                                <h2>Home</h2>
                            </Container>
                        </>
                    );
                }
            }catch(err){
                if(err.response.statusText === 'Unauthorized'){
                    return history.push("/signin");
                }
            }

            
        }

        isValidatedToken();
    }, [hasToken, history, isToken]);

    if(hasToken === null){
        return (
            <Redirect to="/signin"/>
        );
    } else {
        // localStorage.setItem('token', token);
        return (
            <>
                <AppBar />
                <Container fixed>
                    <h2>Home</h2>
                </Container>
            </>
        );
    }
    
    
}