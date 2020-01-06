import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Card, CardContent, CssBaseline } from '@material-ui/core';

import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Perfil from './pages/Perfil';

const useStyles = makeStyles( theme => ({
    alignContent: {
        margin: '5%'
    },
    card: {
        backgroundColor: '#F57C00',
        borderRadius: '6px',
        height: '50%',
        width: '75%',
        alignItems: 'center',
        marginLeft: '12%',
        padding: '2%'
    },
    container: {
        marginTop: '8%',
        alignItems: 'center',
        justifySelf: 'center',
        display: 'flex',
        flexDirection: 'column'
    }
}));

export default function Router() {

    const classes = useStyles();

    return (
        <BrowserRouter> 
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/profile" component={Perfil} />
                <CssBaseline>
                    <Container fixed className={classes.container}>
                        <Typography className={classes.alignContent} variant="div">
                            <Card className={classes.card}>
                                <CardContent>
                                    <Route path="/signin" component={Login}/>
                                    <Route path="/signup" component={Signup}/>
                                </CardContent>
                            </Card>
                        </Typography>
                    </Container>
                </CssBaseline>
                
            </Switch>
        </BrowserRouter>
        
    )

}