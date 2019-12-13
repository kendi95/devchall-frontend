import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox'

const useStyles = makeStyles(theme => ({
    drawerList: {
        width: 200,
    }
}))

export default props => {
    
    const classes = useStyles();

    const toggleDrawer = (side, open) => (event) => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
    }

    return (
        <div 
            className={classes.drawerList}
            role="presentation"
            onClick={toggleDrawer(props.side, props.open)}
            onKeyDown={toggleDrawer(props.side, props.open)}>
            
            <List>
                <ListItem>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox"/>
                </ListItem>
            </List>

        </div>
    )
}