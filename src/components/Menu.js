import React from 'react';
import { Link } from 'react-router-dom';

import { Menu, MenuItem } from '@material-ui/core';

export default props => {

    const menuId = 'primary-search-account-menu';

    const onLogout = () => {
        localStorage.removeItem('token');
    }

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
            <MenuItem dense component={Link} to="/signin" onClick={onLogout}>Logout</MenuItem>
        </Menu>
    )
}