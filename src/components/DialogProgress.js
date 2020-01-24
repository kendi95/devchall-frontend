import React from 'react';

import { Dialog, CircularProgress, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100px',
        alignItems: 'center',
        alignContent: 'center'
    },
    progress: {
        padding: theme.spacing(0),
        textAlign: 'center'
    },
    text: {
        padding: theme.spacing(0),
       
    },
    progressDialog: {
        color: '#F57C00',
    }

}));

export default function DialogProgress(props) {

    const classes = useStyles();
    const { open, text } = props;

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true}>
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={4} className={classes.progress}>
                        <CircularProgress variant="indeterminate" className={classes.progressDialog} />
                    </Grid>
                    <Grid item xs={8} className={classes.text}>
                        <Typography variant="h6" component="h6">{text}</Typography>
                    </Grid>
                </Grid>
            </div>
            
        </Dialog>
    )

}