import React, { useState } from 'react';

import { Container, Card, CardContent, InputAdornment, TextField, Button } from '@material-ui/core';
import EmailOutlined from '@material-ui/icons/EmailOutlined';

import styles from './styles';
import EmailImage from '../../assets/Email.png';
import SnackBar from '../../components/SnackBar';
import DialogProgress from '../../components/DialogProgress';
import DialogForm from '../../components/DialogForm';

import api from '../../services/api';

export default function Recovery({history}){

    const classes = styles();
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);

    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('');
    const [isSnackOpen, setIsSnackOpen] = useState(false);

    const handleOpenSnackbar = (message, severity) => {
        setIsSnackOpen(true);
        setMessage(message);
        setSeverity(severity);
    }

    const handleOpenDialog = (message) => {
        setIsOpen(true);
        setMessage(message);
    }

    const handleOpenForm = () => {
        setOpenForm(true);
    }

    const handleSnackClose = () => {
        setIsSnackOpen(false);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleCloseForm = () => {
        setOpenForm(false);
    }

    async function confirmEmail(e){
        e.preventDefault();

        if(email === ''){
            return handleOpenSnackbar('O campo deve ser preenchido.', 'warning');
        }

        handleOpenDialog('Confirmando email...');

        try{
            const response = await api.get("/confirm_email", {
                params: {
                    email
                }
            });
            const { _id } = response.data;
            setId(_id);
            setEmail('');
            handleClose();
            handleOpenForm();
        }catch(err){
            if(err.response.status === 404){
                setEmail('');
                handleClose();
                handleOpenSnackbar(err.response.data.error, 'error');
            }
        }
    }

    async function handleResetPassword(password, confirmPassword){
        if(password === '' || confirmPassword === ''){
            return handleOpenSnackbar('Um ou mais campos estão vazios.', 'warning');
        }

        if(password !== confirmPassword){
            return handleOpenSnackbar('A senha preenchido nao condiz com a confirmação de senha', 'warning');
        }

        handleCloseForm();
        handleOpenDialog('Criando nova senha...');

        try{
            const response = await api.patch("/reset_password", {senha: password}, {
                params: {
                    id
                }
            });

            if(response.status === 200){
                handleClose();
                return history.push("/signin");
            }
        }catch(err){
            return handleOpenSnackbar(`${err.response.status}: ${err.response.data.error}`, 'error');
        }
        
    }

    return (
        <div>
            <Container fixed className={classes.container}>
                <SnackBar isSnackOpen={isSnackOpen} handleSnackClose={handleSnackClose} severity={severity} message={message}/>
                <div className={classes.alignContent}>
                    <Card className={classes.card}>
                        <CardContent>
                            <div className={classes.label}>
                                <h2 className={classes.labelColor}>Recuperação de senha</h2>
                            </div>
                            <img src={EmailImage} alt="Ícone de email" className={classes.image} />
                            <div className={classes.label}>
                                <h2>Endereço de email da conta DEVCHALL</h2>
                            </div>
                            <div className={classes.label}>
                                <h3 className={classes.labelColor}>Por favor, informe a conta de email que vocế quer recuperar.</h3>
                            </div>

                            <div className={classes.fieldContent}>
                                <TextField 
                                    type="email" 
                                    label="Email *" 
                                    variant="standard" 
                                    className={classes.field}
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <EmailOutlined />
                                                </InputAdornment>
                                            ),
                                        }}/>
                            </div>
                            
                            <Button variant="contained" color="primary" className={classes.btn} onClick={confirmEmail}>Confirmar</Button>
                        </CardContent>
                        <DialogProgress open={isOpen} onClose={handleClose} text={message}/>
                        <DialogForm open={openForm} handleCloseForm={handleCloseForm} handleResetPassword={handleResetPassword}/>
                    </Card>
                </div>
            </Container>
        </div>
    )

}