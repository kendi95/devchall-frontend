import React, { useState } from 'react';

import { Container, TextField, Avatar, Button, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { DropzoneDialog } from 'material-ui-dropzone';

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
        height: 256
    },
    field: {
        width: '100%',
        marginTop: 10,
    },
    btn: {
        marginTop: 15,
        background: "#E64A19",
        size: 12,
        width: '100%',
        height: 50,
        color: '#ffffff'
    }
}))

export default props => {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

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
                    <TextField disabled={!isEdit} variant="outlined" label="Nome completo" className={classes.field}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Email" className={classes.field}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Data de nascimento (dd/MM/aaaa) (opcional)" className={classes.field} />
                    <TextField disabled={!isEdit} variant="outlined" label="Linkedin (opcional)" className={classes.field} />
                    <Button disabled={!isEdit} variant="outlined" className={classes.btn} type="submit">Salvar</Button>
                </form>
            </Container>
            
        </div>
        
    )
}