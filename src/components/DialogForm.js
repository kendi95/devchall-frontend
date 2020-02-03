import React, { useState } from 'react';

import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, InputAdornment, DialogActions, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlined from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles(theme => ({
    field: {
        marginTop: '5%',
        width: '100%'
    },
    

}));

export default function DialogForm(props) {

    const { open } = props;
    const classes = useStyles();
    const [senha, setSenha] = useState('');
    const [confirmSenha, setConfirmSenha] = useState('');
   

    return (
        <Dialog open={open} maxWidth="xs" fullWidth={true} aria-labelledby="dialog" >
            <DialogTitle id="dialog">Nova senha</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Para criar uma nova senha deve ser preenchidos os dois campos obrigatórios abaixo. Após a confirmação da nova
                    senha, será redirecionado para a tela de login.
                </DialogContentText>
                <TextField 
                    label="Senha *" 
                    type="password" 
                    variant="standard" 
                    className={classes.field} 
                    fullWidth
                    value={senha}
                    onChange={e => setSenha(e.target.value)} 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined />
                            </InputAdornment>
                        ),
                    }}/> 

                <TextField 
                    label="Confirmar Senha *" 
                    type="password" 
                    variant="standard" 
                    className={classes.field} 
                    fullWidth
                    value={confirmSenha}
                    onChange={e => setConfirmSenha(e.target.value)} 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlined />
                            </InputAdornment>
                        ),
                    }}/> 
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.handleCloseForm()} color="primary">Cancelar</Button>
                <Button onClick={() => props.handleResetPassword(senha, confirmSenha)} color="primary">Criar nova senha</Button>
            </DialogActions>
        </Dialog>
    );

}