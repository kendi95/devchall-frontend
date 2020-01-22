import React, { useState, useEffect } from 'react';

import { Container, TextField, Avatar, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneDialog } from 'material-ui-dropzone';

import { green } from '@material-ui/core/colors';

import api from '../../services/api';

import AppBar from '../../components/AppBar';

const useStyles = makeStyles(theme => ({
    container: {
        padding: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    contentForm: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignConten: 'center',
    },
    contentAvatar: {
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        width: '100%',
    },
    contentIcons: {
        margin: 5,
        width: '100%',
        paddingLeft: '95%'
    },
    avatar: {
        width: 256,
        height: 256,
        marginTop: '5%'
    },
    field: {
        width: '100%',
        marginTop: 10,
    },
    btn: {
        borderRadius: 6,
        marginTop: 15,
        backgroundColor: green['700'],
        size: 12,
        width: '100%',
        height: 50,
        color: '#ffffff',
        '&:hover': {
            backgroundColor: green['900']
        }
    }
}))

export default function Perfil({history}) {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [linkedin, setLinkedin] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token');

        const getProfile = async () => {
            const response = await api.get("/profile", {
                params: {
                    token 
                }
            });

            if(response.status === 403){
                history.push("/signin");
            }
            const { email, nome, dataNascimento, linkedin } = response.data;
            setNome(nome);
            setEmail(email);

            if(dataNascimento != null || linkedin != null){
                setDataNascimento(dataNascimento);
                setLinkedin(linkedin);
            }
        }

        getProfile();
    }, [history]);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleIsEditShow = () => {
        setIsEdit(true);
    }

    const handleIsEditHide = () => {
        setIsEdit(false);
    }

    const Icons = () => {
        if(isEdit === false){
            return <IconButton onClick={handleIsEditShow}>
                        <EditIcon disabled={!isEdit}/>
                    </IconButton>
        } else {
            return <IconButton onClick={handleIsEditHide}>
                        <CloseIcon disabled={isEdit}/>
                    </IconButton> 
        }
    }

    function onSubmit(e){
        e.preventDefault();
    }

    return (
        <div>
            <AppBar title="Perfil"/>
            <Container fixed className={classes.container}>
                <form className={classes.contentForm} onSubmit={onSubmit}>
                    <div className={classes.contentAvatar}>
                        <Avatar alt="profile" className={classes.avatar} />
                        <Button style={{size: 12, marginTop: 5}} onClick={handleOpen}>Escolha uma imagem</Button>
                        <DropzoneDialog open={isOpen} acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']} showPreviews={true} maxFileSize={5000000} 
                            onClose={handleClose}
                        />
                    </div>
                    <div className={classes.contentIcons}>
                        <Icons />
                    </div>
                    <TextField disabled={!isEdit} variant="outlined" label="Nome completo" 
                        className={classes.field} value={nome} onChange={e => setNome(e.taget.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Email" 
                        className={classes.field} value={email} onChange={e => setEmail(e.taget.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" 
                        label="Data de nascimento (dd/MM/aaaa) (opcional)" 
                        className={classes.field}  value={dataNascimento} onChange={e => setDataNascimento(e.taget.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Linkedin (opcional)" 
                        className={classes.field} value={linkedin} onChange={e => setLinkedin(e.taget.value)}/>
                    <Button disabled={!isEdit} variant="contained" className={classes.btn}>Salvar</Button>
                </form>
            </Container>
            
        </div>
        
    )
}