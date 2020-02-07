import React, { useState, useEffect } from 'react';

import { Container, TextField, Avatar, Button, IconButton, } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

import api from '../../services/api';
import s3 from '../../services/s3';

import urlToFile from '../../utils/urlToFile';

import AppBar from '../../components/AppBar';
import DialogEditImage from '../../components/DialogEditImage';
import DialogProgress from '../../components/DialogProgress';
import SnackBar from '../../components/SnackBar';

export default function Perfil({history}) {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenEditImage, setIsOpenEditImage] = useState(false);

    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState('');
    const [editor, setEditor] = useState(null);

    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [linkedin, setLinkedin] = useState('');

    const [message, setMessage] = useState('');
    const [isSnackOpen, setIsSnackOpen] = useState(false);
    const [severity, setSeverity] = useState('');

    const [isToken, setIsToken] = useState('');

    const token = localStorage.getItem('token');


    useEffect(() => {
        async function isValidatedToken() {
            try{
                const res = await api.get("/validated_token", {
                    params: {
                        token
                    }
                });
                const { _token } = res.data;
                setIsToken(_token);

                if(isToken !== null){
                    return;
                }
            }catch(err){
                if(err.response.statusText === 'Unauthorized'){
                    return history.push("/signin");
                }
            }
        }

        const getProfile = async () => {

            try{
                const response = await api.get("/profile", {
                    params: {
                        token 
                    }
                });

                const { email, nome, dataNascimento, linkedin, _id, imageURL } = response.data;
                setNome(nome);
                setEmail(email);
                setId(_id);

                if(dataNascimento !== null || linkedin !== null !== imageURL){
                    setDataNascimento(dataNascimento);
                    setLinkedin(linkedin);
                    setImageURL(imageURL);
                }
            }catch(err){
                if(err.response.status === 403){
                    history.push("/signin");
                }
            }
            
        }

        isValidatedToken();
        getProfile();
    });

    

    const handleOpenEditImage = () => {
        setIsOpenEditImage(true);
    }

    const handleCloseEditImage = () => {
        setIsOpenEditImage(false);  
    }

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

    const handleOpenDialog = (message) => {
        setIsOpen(true);
        setMessage(message);
    }

    const handleOpenSnackbar = (message, severity) => {
        setIsSnackOpen(true);
        setMessage(message);
        setSeverity(severity);
    }

    const handleSnackClose = () => {
        setIsSnackOpen(false);
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

    function onGetImage(e) {
        const file = e.target.files[0];

        if(file === null){
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFileURL('');
            setFileURL(reader.result);
        }
        handleOpenEditImage();
    }

    const setEditorRef = editor => {
        setEditor(editor);
    }

    async function onSubmit(e){

        handleCloseEditImage();
        handleOpenDialog('Salvando...');

        if(editor !== null){
            const file = await urlToFile(editor);
            
            try{
                const data = await s3(email, file, file.name);
                const { location } = data;

                const response = await api.patch("upload_imageURL", {imageURL: location}, {
                    params: {
                        token
                    }
                });
                
                setImageURL(response.data.imageURL);
                handleClose();
                handleOpenSnackbar('Imagem salvo com sucesso!', 'success');
                
            }catch(err){
                console.log(err);
            }

            
        }

        
    }

    return (
        <div>
            <AppBar title="Perfil"/>
            <Container fixed className={classes.container}>
                <SnackBar isSnackOpen={isSnackOpen} handleSnackClose={handleSnackClose} severity={severity} message={message}/>
                <form className={classes.contentForm}>
                    <div className={classes.contentAvatar}>
                        {imageURL === '' || imageURL === null 
                            ? <Avatar alt="profile" className={classes.avatar} /> 
                            : <img src={imageURL} alt={nome} className={classes.avatar} />}
                        
                        <Button variant="contained" component="label" className={classes.buttonFile}>
                            Selecione uma imagem
                            <input type="file" className={classes.inputFile} 
                                value={file} onChange={e => onGetImage(e)} />
                        </Button>
                        {fileURL === ''
                            ? null
                            : <DialogEditImage open={isOpenEditImage} image={fileURL} 
                                handleClose={handleCloseEditImage} handleSave={onSubmit} setEditorRef={setEditorRef} />}
                    </div>
                    <div className={classes.contentIcons}>
                        <Icons />
                    </div>
                    <TextField disabled={!isEdit} variant="outlined" label="Nome completo" 
                        className={classes.field} value={nome} onChange={e => setNome(e.target.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Email" 
                        className={classes.field} value={email} onChange={e => setEmail(e.target.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" 
                        label="Data de nascimento (dd/MM/aaaa) (opcional)" 
                        className={classes.field}  value={dataNascimento} onChange={e => setDataNascimento(e.target.value)}/>
                    <TextField disabled={!isEdit} variant="outlined" label="Linkedin (opcional)" 
                        className={classes.field} value={linkedin} onChange={e => setLinkedin(e.target.value)}/>
                    <Button disabled={!isEdit} variant="contained" className={classes.btn}>Salvar</Button>
                </form>
            </Container>
            <DialogProgress open={isOpen} onClose={handleClose} text={message}/>
            
        </div>
        
    )
}