import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Card} from "primereact/card";
import useAuth from "../../context/useAuth.js";
import Loading from "../loading/Loading.jsx";

const EsqueciSenha = () => {
    const {recuperarSenha} = useAuth()
    const [dsEmail, setdsEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const enviarEmail = () => {
        setLoading(true);
        recuperarSenha(`?email=${dsEmail}`)
    }

    return (
        <div className="mt-8">
            {loading ? <Loading/> : <></>}
            <Card title="Informe o seu e-mail" className="shadow-5">
                <div className="field col-12 mt-4">
                <span className="p-float-label">
                    <InputText id="dsEmail" value={dsEmail}
                               onChange={(e) => setdsEmail(e.target.value)}
                               className="text-base text-color surface-overlay p-2 border-1 border-solid
                                               surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                    <label htmlFor="dsEmail" className="">E-mail</label>
                </span>
                </div>
                <div className="field col-12 text-right mt-2">
                    <Button onClick={enviarEmail} label="Enviar"/>
                </div>
            </Card>
        </div>
    );
};

export default EsqueciSenha;