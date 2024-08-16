import React, {useEffect, useState} from 'react';
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import useAuth from "../../context/useAuth.js";
import Loading from "../loading/Loading.jsx";

const RedefinirSenha = () => {
    const {redefinirSenha} = useAuth()
    const [senha, setSenha] = useState('');
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false);

    const enviarNewSenha = () => {
        setLoading(true);
        redefinirSenha(`?token=${token}&senha=${senha}`)
    }

    useEffect(() => {
        const queryString = window.location.search;
        const searchParams = new URLSearchParams(queryString);
        setToken( searchParams.get("token"));
    }, []);
    return (
        <div className="mt-8">
            {loading ? <Loading/> : <></>}
            <Card title="Informe nova senha" className="shadow-5">
                <div className="field col-12 md:col-6 mt-4">
                    <span className="p-float-label">
                        <Password id="senha" value={senha}
                                  onChange={(e) => setSenha(e.target.value)}
                                  className="text-base text-color surface-overlay border-1 border-solid surface-border
                                            border-round appearance-none outline-none focus:border-primary w-full input-password"
                                  inputClassName={'w-full input-password'}/>
                        <label htmlFor="senha">Senha</label>
                    </span>
                </div>
                <div className="field col-12 text-right mt-2">
                    <Button onClick={enviarNewSenha} label="Redefinir"/>
                </div>
            </Card>
        </div>
    );
};

export default RedefinirSenha;