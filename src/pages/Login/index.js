import React, {useState} from 'react';
import {useAlert} from 'react-alert';

import api from '../../services/api';
import "../index.css";

export default function Login({history}){

    const alert = useAlert();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        try{
            const response = await api.post('/signin', {email, senha});
            localStorage.setItem('user', response.data.token);
        }catch(err){
            if(err.response.status === 404){
                alert.error("Usuário ou senha incorreta.");
            }
        }
       
    }

    function toSignup(event){
        history.push("/signup");
    }

    return (
        <>
            <form onSubmit={onSubmit} >
                <label htmlFor="email">Email *</label>
                <input type="email"
                    id="email"
                    placeholder="Informe seu email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}/>

                <label htmlFor="senha">Senha *</label>
                <input type="password"
                    id="senha"
                    placeholder="Informe sua senha"
                    value={senha}
                    onChange={event => setSenha(event.target.value)}/>

                <button className="btn" type="submit">Entrar</button>
                <button className="btn-account" type="submit" onClick={toSignup}>Criar conta</button>
                
            </form>
        </>
    )

}