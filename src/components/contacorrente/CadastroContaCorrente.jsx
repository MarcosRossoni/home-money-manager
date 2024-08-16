import React, {useEffect, useState} from 'react';
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import '../styled/FormStyled.css';
import {Dialog} from "primereact/dialog";
import contabancariaService from "../../services/contabancaria/contabancaria.service.js";

const CadastroContaCorrente = ({visible, setHideDialog, idConta}) => {
    const [dsNome, setDsNome] = useState("")
    const [dsBanco, setDsBanco] = useState("")
    const [conta, setConta] = useState()
    const [agencia, setAgencia] = useState()
    const [fgTipoConta, setFgTipoConta] = useState({});
    const [vlSaldoIncial, setVlSaldoIncial] = useState(null);
    const [vlSaldoAtual, setVlSaldoAtual] = useState(null);
    const [fgAtiva,  setFgAtiva] = useState()
    const [errors, setErrors] = useState({})

    const tipoConta = [
        { name: 'CONTA CORRENTE', code: 0 },
        { name: 'CONTA POUPANÇA', code: 1 },
        { name: 'APLICAÇÃO', code: 2 }
    ];

    const createContaBancaria = async(e) => {
        e.preventDefault()

        if (validation()) {
            const contaBancariaDTO = {
                idContaBancaria: idConta,
                dsDescricao: dsNome,
                dsBanco: dsBanco,
                numConta: conta?.toString(),
                numAgencia: agencia?.toString(),
                fgContaBancaria: fgTipoConta.code,
                vlSaldoIncial: vlSaldoIncial,
                vlSaldoAtual: vlSaldoAtual,
                fgAtiva: fgAtiva
            }
            if (idConta) {
                contabancariaService.alterarContaBancaria(contaBancariaDTO)
                    .then(() => {
                        setVisible(false, true)
                    })
                return
            }
            contabancariaService.cadastrarContaBancaria(contaBancariaDTO)
                .then(() => {
                    setVisible(false, true)
                })
        }
    }

    const validation = () => {
        let isValid = true;

        const errors = {
            dsNome: '',
            dsBanco: '',
            conta: '',
            agencia: '',
            fgTipoConta: '',
            vlSaldoInicial: ''
        };

        if (!dsNome) {
            errors.dsNome = 'Nome é obrigatório'
            isValid = false
        }

        if (!dsBanco) {
            errors.dsBanco = 'Nome do banco é obrigatório'
            isValid = false
        }

        if (!conta) {
            errors.conta = 'Numero da conta é obrigatório'
            isValid = false
        }

        if (!agencia) {
            errors.agencia = 'Numero da agência é obrigatório'
            isValid = false
        }

        if (!fgTipoConta) {
            errors.fgTipoConta = 'Tipo da conta é obrigatória'
            isValid = false
        }

        if (!vlSaldoIncial) {
            errors.vlSaldoInicial = 'Saldo inicial é obrigatório'
            isValid = false
        }

        setErrors(errors)
        return isValid

    }

    const setVisible = (r, reload) => {
        setHideDialog(r, reload)
        return false
    }

    useEffect(() => {
        if (idConta !== null) {
            contabancariaService.findById(idConta)
                .then((response) => {
                    construirObjectEdit(response.data)
                })
        }
    }, [visible]);

    const construirObjectEdit = (contaEdit) => {
        setDsNome(contaEdit.dsDescricao)
        setDsBanco(contaEdit.dsBanco)
        setConta(parseInt(contaEdit.numConta))
        setAgencia(parseInt(contaEdit.numAgencia))
        setFgTipoConta(tipoConta.find((item) => item.code === contaEdit.fgContaBancaria))
        setVlSaldoIncial(contaEdit.vlSaldoIncial)
        setVlSaldoAtual(contaEdit.vlSaldoAtual)
        setFgAtiva(contaEdit.fgAtiva)
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false, false)} className="p-button-text" />
            <Button label="Salvar" type="submit" icon="pi pi-check" onClick={(e) => {
                createContaBancaria(e)
            }} autoFocus />
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Contas Bancarias" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}
                    footer={footerContent}>
                <div className="formgrid grid m-2 p-3">
                    <div className="field col-12">
                    <span className="p-float-label">
                        <InputText id="dsNome" value={dsNome}
                                   onChange={(e) => setDsNome(e.target.value)}
                                   className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                        <label htmlFor="dsNome" className="">Nome da Conta</label>
                        {errors.dsNome && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsNome}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                    <span className="p-float-label">
                        <InputText id="banco" value={dsBanco}
                                   onChange={(e) => setDsBanco(e.target.value)}
                                   className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                        <label htmlFor="banco">Banco</label>
                        {errors.dsBanco && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsBanco}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                    <span className="p-float-label">
                        <InputNumber id="conta" value={conta}
                                     onValueChange={(e) => setConta(e.value)}
                                     useGrouping={false}
                                     className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full input-number"
                                     inputClassName={'input-number'}/>
                        <label htmlFor="conta">Num Conta</label>
                        {errors.conta && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.conta}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                    <span className="p-float-label">
                        <InputNumber id="agencia" value={agencia}
                                     onValueChange={(e) => setAgencia(e.value)}
                                     useGrouping={false}
                                     className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full input-number"
                                     inputClassName={'input-number'}/>
                        <label htmlFor="agencia">Num Agencia</label>
                        {errors.agencia && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.agencia}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                        <span className="p-float-label">
                            <Dropdown value={fgTipoConta} onChange={(e) => setFgTipoConta(e.value)}
                                      options={tipoConta}
                                      optionLabel="name"
                                      className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full dropdown-component"/>
                            <label htmlFor="fgTipoConta">Tipo Conta</label>
                            {errors.fgTipoConta && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.fgTipoConta}</small>}
                        </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                        <span className="p-float-label">
                        <InputNumber inputId="vlSaldoIncial" value={vlSaldoIncial}
                                     onValueChange={(e) => setVlSaldoIncial(e.value)}
                                     locale="de-DE" minFractionDigits={2}
                                     className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full input-number"
                                     inputClassName={'input-number'}/>
                            <label htmlFor="vlSaldoIncial">Saldo Incial (R$)</label>
                            {errors.vlSaldoInicial && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.vlSaldoInicial}</small>}
                        </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                        <span className="p-float-label">
                        <InputNumber inputId="vlSaldoIncial" value={vlSaldoAtual}
                                     onValueChange={(e) => setVlSaldoAtual(e.value)}
                                     locale="de-DE" minFractionDigits={2}
                                     className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full input-number"
                                     inputClassName={'input-number'} disabled/>
                            <label htmlFor="vlSaldoIncial">Saldo Atual (R$)</label>
                        </span>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CadastroContaCorrente;