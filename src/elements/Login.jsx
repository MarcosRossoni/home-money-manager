import {useEffect, useState} from 'react';
import useAuth from "../context/useAuth.js";
import {classNames} from "primereact/utils";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

function Login(props) {

    const [dsEmail, setDsEmail] = useState('')
    const [dsSenha, setDsSenha] = useState('')

    const {signin, signed} = useAuth();

    useEffect(() => {
        // if (!signed) {
        //     signout()
        // }
    }, []);

    function login() {
        signin(dsEmail, dsSenha)
    }

    function esqueciSenha() {
        window.location.href = "/esqueci-senha"
    }

    function criarConta() {
        window.location.href = "/signup"
    }

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');
    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <div style={{
                    borderRadius: '56px',
                    padding: '0.3rem',
                    background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
                }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{borderRadius: '53px'}}>
                        <div className="text-center mb-5">
                            <img src="/image_login.jpg" alt="Image" height="50" className="mb-3"/>
                        </div>
                        <div>
                            <span className="p-float-label w-full md:w-30rem mb-5">
                                <InputText id="dsEmail" type="email"
                                           value={dsEmail}
                                           onChange={(e) => setDsEmail(e.target.value)}
                                           className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                            <label htmlFor="dsDescricao">E-mail</label>
                            </span>
                            <span className="p-float-label w-full md:w-30rem mb-5">
                                <InputText id="dsSenha" type="password"
                                           value={dsSenha}
                                           onChange={(e) => setDsSenha(e.target.value)}
                                           className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                            <label htmlFor="dsSenha">Senha</label>
                            </span>
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer"
                                   style={{color: 'var(--primary-color)'}} onClick={() => criarConta()}>
                                    Criar Conta
                                </a>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer"
                                   style={{color: 'var(--primary-color)'}} onClick={() => esqueciSenha()}>
                                    Esqueceu a Senha?
                                </a>
                            </div>
                            <Button label="Entrar" className="w-full p-3 text-xl"
                                    onClick={() => login()}></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;