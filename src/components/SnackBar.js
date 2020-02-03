import React from 'react';

import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

export default function SnackBar(props) {

    const { isSnackOpen, handleSnackClose, severity, message } = props;

    const Alert = (props) => {
        return (
            <MuiAlert elevation={6} variant="filled" {...props }/>
        )
    }

    return (
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'center'}} 
        open={isSnackOpen} onClose={handleSnackClose} autoHideDuration={3000}>
            <Alert onClose={handleSnackClose} severity={severity}>{message}</Alert>
        </Snackbar>
    );

}