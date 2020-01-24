import React from 'react';

import { Menu, MenuItem, IconButton } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default props => {

    const mobileMenuId = 'primary-search-account-menu-mobile';

    return (
        <Menu
            id={mobileMenuId}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            anchorEl={props.anchorEl}
            open={props.open}
            onClose={props.onClose}>
            <MenuItem>
                <IconButton aria-label="account of current user" color="inherit">
                    <AccountCircleIcon />
                </IconButton>
                <p>Perfil</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="account of current user" color="inherit">
                    <AccountCircleIcon />
                </IconButton>
                <p>Logout</p>
            </MenuItem>
        </Menu>
    )
}