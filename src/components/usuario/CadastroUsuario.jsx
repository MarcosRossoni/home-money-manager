import React, {useState} from 'react';
import {Card} from "primereact/card";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Password} from "primereact/password";
import '../styled/FormStyled.css'
import {Calendar} from "primereact/calendar";
import moment from "moment";
import CidadeAutoComplete from "../autocompletes/CidadeAutoComplete.jsx";
import {InputMask} from "primereact/inputmask";
import useAuth from "../../context/useAuth.js";
import Loading from "../loading/Loading.jsx";

const CadastroUsuario = () => {
    const {signup} = useAuth();
    const [dsNome, setDsNome] = useState("")
    const [dsEmail, setDsEmail] = useState("")
    const [dsTelefone, setDsTelefone] = useState("")
    const [dtNascimento, setDtNascimento] = useState()
    const [dsCpf, setDsCpf] = useState("")
    const [dsSenha, setDsSenha] = useState("")
    const [dsEndereco, setDsEndereco] = useState("")
    const [numPredial, setNumPredial] = useState()
    const [dsBairro, setDsBairro] = useState("")
    const [dsComplemento, setDsComplemento] = useState("")
    const [cidade, setCidade] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const setCidadeDTO = (r) => {
        setCidade(r)
    }

    const validation = () => {
        let isValid = true;

        const errors = {
            dsNome: '',
            dsEmail: '',
            dsTelefone: '',
            dtNascimento: '',
            dsCpf: '',
            dsSenha: '',
            dsEndereco: '',
            numPredial: '',
            dsBairro: '',
            dsComplemento: '',
            cidade: ''
        };

        if (!dsNome) {
            errors.dsNome = 'Nome é obrigatório';
            isValid = false;
        } else if (dsNome.length < 3) {
            errors.dsNome = 'Nome deve ter no minimo 3 caracteres'
            isValid = false;
        }

        if (!dsEmail) {
            errors.dsEmail = 'E-mail é obrigatório';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(dsEmail)) {
            errors.dsEmail = 'Deve ser um e-mail valido'
            isValid = false;
        }

        if (!dsTelefone) {
            errors.dsTelefone = 'Telefone é obrigatório';
            isValid = false;
        }

        if (!dtNascimento) {
            errors.dtNascimento = 'Data de nascimento obrigatório';
            isValid = false;
        }

        if (!dsCpf) {
            errors.dsCpf = 'CPF é obrigatório';
            isValid = false;
        }

        if (!dsSenha) {
            errors.dsSenha = 'Senha é obrigatória';
            isValid = false;
        }

        if (!dsEndereco) {
            errors.dsEndereco = 'Endereço é obrigatória';
            isValid = false;
        }

        if (!dsEndereco) {
            errors.dsEndereco = 'Endereço é obrigatória';
            isValid = false;
        }

        if (!numPredial) {
            errors.numPredial = 'Número predial é obrigatório';
            isValid = false;
        }

        if (!dsBairro) {
            errors.dsBairro = 'Bairro é obrigatória';
            isValid = false;
        }

        if (Object.keys(cidade).length === 0) {
            errors.cidade = 'Cidade é obrigatória';
            isValid = false;
        }

        setErrors(errors)
        return isValid;
    }

    const createUsuario = async (e) => {
        e.preventDefault()
        if (validation()) {
            const usuarioDTO = {
                dsNome: dsNome,
                dsEmail: dsEmail,
                dsTelefone: dsTelefone
                    .replaceAll('(', '')
                    .replaceAll(')', '')
                    .replaceAll('-', '')
                    .trim(),
                dtNascimento: moment(dtNascimento).format('YYYY-MM-DD'),
                dsCpf: dsCpf
                    .replaceAll('.', '')
                    .replaceAll('-', ''),
                dsSenha: dsSenha,
                dsEndereco: dsEndereco,
                numPredial: numPredial,
                dsBairro: dsBairro,
                dsComplemento: dsComplemento,
                cidade: cidade
            }
            setLoading(true)
            signup(usuarioDTO)
        }
    }

    return (
        <div className="p-1 m-2">
            {loading ? <Loading/> : <></>}
            <Card title="Cadastre-se" className="shadow-5">
                <form className="formgrid grid m-2" onSubmit={(e) => createUsuario(e)}>
                    <div className="field col-12 mt-4">
                                <span className="p-float-label">
                                    <InputText id="dsNome" value={dsNome}
                                               onChange={(e) => setDsNome(e.target.value)}
                                               className="text-base text-color surface-overlay p-2 border-1 border-solid
                                                surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="dsNome" className="">Nome do Usuário</label>
                                </span>
                        {errors.dsNome && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsNome}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                    <InputText id="email" value={dsEmail}
                                               onChange={(e) => setDsEmail(e.target.value)}
                                               className="text-base text-color surface-overlay p-2 border-1 border-solid
                                                surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="email">E-mail</label>
                                </span>
                        {errors.dsEmail && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsEmail}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                    <InputMask id="telefone" value={dsTelefone}
                                               onChange={(e) => setDsTelefone(e.target.value)}
                                               mask="(99)99999-9999"
                                               className="text-base text-color surface-overlay p-2 border-1 border-solid
                                                surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="telefone">Telefone</label>
                                </span>
                        {errors.dsTelefone && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsTelefone}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                    <Calendar id="dtNascimento" value={dtNascimento}
                                              onChange={(e) => setDtNascimento(e.target.value)} dateFormat="dd/mm/yy"
                                              className="text-base text-color surface-overlay border-1 border-solid
                                                surface-border border-round appearance-none outline-none focus:border-primary w-full
                                                input-date" inputClassName={'input-date'}/>
                                    <label htmlFor="dtNascimento">Data Nascimento</label>
                                </span>
                        {errors.dtNascimento && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dtNascimento}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                    <InputMask id="cpf" value={dsCpf}
                                               onChange={(e) => setDsCpf(e.target.value)}
                                               min="11" max="11"
                                               mask="999.999.999-99"
                                               className="text-base text-color surface-overlay p-2 border-1 border-solid
                                                surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="cpf">CPF</label>
                                </span>
                        {errors.dsCpf && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsCpf}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                <Password id="senha" value={dsSenha}
                                          onChange={(e) => setDsSenha(e.target.value)}
                                          className="text-base text-color surface-overlay border-1 border-solid surface-border
                                             border-round appearance-none outline-none focus:border-primary w-full input-password"
                                          inputClassName={'w-full input-password'}/>
                                    <label htmlFor="senha">Senha</label>
                                </span>
                        {errors.dsSenha && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsSenha}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                <InputText id="dsEndereco" value={dsEndereco}
                                           onChange={(e) => setDsEndereco(e.target.value)}
                                           className="text-base text-color surface-overlay p-2 border-1 border-solid
                                            surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="dsEndereco">Endereço</label>
                                </span>
                        {errors.dsEndereco && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsEndereco}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                <InputNumber inputId="numPredial" value={numPredial}
                                             onValueChange={(e) => setNumPredial(e.value)}
                                             minFractionDigits={0}
                                             className="text-base text-color surface-overlay border-1 border-solid surface-border
                                             border-round appearance-none outline-none focus:border-primary w-full input-number"
                                             inputClassName={'input-number'}
                                             useGrouping={false}/>
                                    <label htmlFor="numPredial">Numero Predial</label>
                                </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                <InputText id="dsBairro" value={dsBairro}
                                           onChange={(e) => setDsBairro(e.target.value)}
                                           className="text-base text-color surface-overlay p-2 border-1 border-solid
                                            surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="dsBairro">Bairro</label>
                                </span>
                        {errors.dsBairro && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsBairro}</small>}
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                                <span className="p-float-label">
                                <InputText id="dsComplemento" value={dsComplemento}
                                           onChange={(e) => setDsComplemento(e.target.value)}
                                           className="text-base text-color surface-overlay p-2 border-1 border-solid
                                            surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                                    <label htmlFor="dsComplemento">Complemento</label>
                                </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                        <CidadeAutoComplete cidadeDTO={setCidadeDTO}/>
                        {errors.cidade && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.cidade}</small>}
                    </div>

                    <div className="field col-12 text-right mt-2">
                        <Button type="submit" label="Cadastrar"/>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default CadastroUsuario;