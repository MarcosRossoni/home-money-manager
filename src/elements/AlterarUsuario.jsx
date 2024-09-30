import React from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import AlterarDadosPessoais from "../components/usuario/AlterarDadosPessoais";
import AlterarSenha from "../components/usuario/AlterarSenha";
import UsuariosVinculados from "../components/usuario/UsuariosVinculados";

const AlterarUsuario = () => {
    return (
        <div className="card">
            <TabView>
                <TabPanel header="Dados Pessoais" leftIcon="pi pi-user mr-2">
                    <AlterarDadosPessoais/>
                </TabPanel>
                <TabPanel header="Alterar Senha" leftIcon="pi pi-key mr-2">
                    <AlterarSenha/>
                </TabPanel>
                <TabPanel header="Usuários Vinculado" leftIcon="pi pi-users mr-2">
                    <UsuariosVinculados/>
                </TabPanel>
            </TabView>
        </div>
    );
};

export default AlterarUsuario;