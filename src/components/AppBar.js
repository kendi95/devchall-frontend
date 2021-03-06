import React, { useState, useEffect } from 'react';

import ApplicationBar from '@material-ui/core/AppBar';
import { Toolbar, IconButton, Typography, SwipeableDrawer } from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import Menu from './Menu';
import MenuMobile from './MenuMobile';
import MenuDrawerList from './MenuDrawerList';

import api from '../services/api';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    appBarColor: {
        background: "#E64A19",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    appBarContainer: {
        width: '500px'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex'
        }
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    avatar: {
        width: 24,
        height: 24,
        borderRadius: 125
    }
}));

export default function AppBar({history}, props) {

    const { title } = props;
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileAnchorEl, setMobileAnchorEl] = useState(null);
    const isOpenMenu = Boolean(anchorEl);
    const isMobileOpenMenu = Boolean(mobileAnchorEl)
    const menuId = 'primary-search-account-menu'; 

    const [imageURL, setImageURL] = useState('');

    const [state, setState] = useState({
        left: false,
    });

    useEffect(() => {
        async function getImageProfile() {
            const token = localStorage.getItem('token');

            try{
                const response = await api.get("/profile", {
                    params: {
                        token
                    }
                });
                setImageURL(response.data.imageURL);
            }catch(err){
                return;
            }
        }

        getImageProfile();
    })

    const onMenuClose = () => {
        setAnchorEl(null);
        setMobileAnchorEl(null);
    }

    const handleOpenProfileMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const toggleDrawer = (side, open) => (event) => {
        if(event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')){
            return;
        }
        setState({ ...state, [side]: open});
    }

    const getTitle = () => {
        if(title === null || title === undefined){
            return "Dev Chall";
        } else {
            return title;
        }
    }

    return (
        <div className={classes.root}>
            <ApplicationBar position="fixed" className={classes.appBarColor}>
                <Toolbar>
                    <IconButton 
                        edge="start" 
                        classeName={classes.menuButton} 
                        color="inherit" 
                        arial-label="menu"
                        onClick={toggleDrawer('left', true)}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        {getTitle()}
                    </Typography>
                    <div className={classes.sectionDesktop}>
                        <IconButton 
                            edge="end" 
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit" 
                            arial-label="account of current user" 
                            onClick={handleOpenProfileMenu}>
                            {imageURL === '' || imageURL === null 
                            ? <AccountCircleIcon />
                            : <img src={imageURL} className={classes.avatar} alt="Ícone" /> }
                            
                        </IconButton>
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton 
                            edge="end" 
                            aria-controls={menuId}
                            aria-haspopup="true"
                            color="inherit" 
                            arial-label="account of current user" 
                            onClick={handleOpenProfileMenu}>
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
                
                <Menu anchorEl={anchorEl} open={isOpenMenu} onClose={onMenuClose}/>
                <MenuMobile anchorEl={mobileAnchorEl} open={isMobileOpenMenu} onClose={onMenuClose}/>

            </ApplicationBar>

            <SwipeableDrawer 
                open={state.left}
                onOpen={toggleDrawer('left', true)}
                onClose={toggleDrawer('left', false)}>
                <MenuDrawerList side="left" open="true" />
            </SwipeableDrawer>
            
        </div>
    );
}