import React, { useState } from 'react';

import { Menu, MenuItem } from '@material-ui/core';

export default props => {

    const menuId = 'primary-search-account-menu';

    return (
        <Menu
            anchorEl={props.anchorEl}
            id={menuId}
            keepMounted
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={props.open}
            onClose={props.onClose}>
            <MenuItem>Perfil</MenuItem>
            <MenuItem>Logout</MenuItem>
        </Menu>
    )
}