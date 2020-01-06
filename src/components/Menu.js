import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Perfil from '../pages/Perfil';

const useStyles = makeStyles(theme => ({
    navLink: {
        textDecorationLine: 'none',
        textDecorationColor: 'black'
    }
}));

export default props => {

    const menuId = 'primary-search-account-menu';

    const classes = useState();

    return (
        <Menu
            anchorEl={props.anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.open}
            onClose={props.onClose}>
            <MenuItem dense component={Link} to="/profile">Perfil</MenuItem>
            <MenuItem dense component={Link} to="/signin">Logout</MenuItem>
        </Menu>
    )
}