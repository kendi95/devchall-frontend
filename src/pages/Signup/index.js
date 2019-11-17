import React, { useState } from 'react';

import api from '../../services/api';
import "../index.css";

export default function Signup({history}){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    async function onSubmit(event){
        event.preventDefault();

        const response = await api.post('/signup', {nome, email, senha});
        const {token} = response.data;

        localStorage.setItem('user', token);
        
        //redirecionar para a pagina principal
        history.push("/");
    }

    async function onClick(){
        history.push("/");
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="nome">Nome Completo *</label>
                <input type="text"
                    id="nome"
                    placeholder="Informe seu nome completo"
                    value={nome}
                    onChange={event => setNome(event.target.value)}/>

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

                <button className="btn" type="submit">Criar conta</button>
                <button className="btn-cancel" type="submit" onClick={onClick}>Cancelar</button>
            </form>
        </>
    )

}