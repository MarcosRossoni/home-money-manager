import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {InputNumber} from "primereact/inputnumber";
import {Calendar} from "primereact/calendar";
import {InputSwitch} from "primereact/inputswitch";
import {Dropdown} from "primereact/dropdown";
import '../styled/FormStyled.css';
import ContaBancariaAutoComplete from "../autocompletes/ContaBancariaAutoComplete.jsx";
import movimentoService from "../../services/movimento/movimento.service.js";
import moment from "moment/moment.js";
import CategoriaAutoComplete from "../autocompletes/CategoriaAutoComplete.jsx";
import {Checkbox} from "primereact/checkbox";
import {Tooltip} from "primereact/tooltip";

const CadastroMovimento = ({visible, setHideDialog, idMovimento, activeToast, nrParcela}) => {

    const tipoMovimento = [
        {name: 'RECEITA', code: 0},
        {name: 'DESPESA', code: 1}
    ];

    const situacaoMovimento = [
        {name: 'ABERTO', code: 0},
        {name: 'LIQUIDADO', code: 1}
    ];

    const [dsDescricao, setDsDescricao] = useState("")
    const [vlMovimento, setVlMovimento] = useState("")
    const [qtdParcelas, setQtdParcelas] = useState()
    const [dtVencimento, setDtVencimento] = useState()
    const [dtMovimento, setDtMovimento] = useState()
    const [fgTipoMovimento, setFgTipoMovimento] = useState()
    const [fgSituacaoMovimento, setFgSituacaoMovimento] = useState(situacaoMovimento[0])
    const [fgConciliarAutomatico, setFgConciliarAutomatico] = useState(false)
    const [contaBancaria, setContaBancaria] = useState()
    const [categoria, setCategoria] = useState(null)
    const [idConta, setIdConta] = useState(null)
    const [idCategoria, setIdCategoria] = useState(null)
    const [fgValorParcela, setFgValorParcela] = useState(false)
    const [errors, setErrors] = useState({})

    const setVisible = (r, reload, res) => {
        activeToast(res)
        setHideDialog(r, reload)
        return false
    }

    const setContaBancariaDTO = (conta) => {
        setContaBancaria(conta);
    }

    const setCategoriaDTO = (categoria) => {
        setCategoria(categoria)
    }

    const validation = () => {
        let isValid = true;

        const errors = {
            dsDescricao: '',
            contaBancaria: '',
            vlMovimento: '',
            qtdParcelas: '',
            fgTipoMovimento: '',
            dtMovimento: '',
            dtVencimento: '',
            categoria: ''
        };

        if (!dsDescricao) {
            errors.dsDescricao = 'Descrição não informado';
            isValid = false;
        } else if (dsDescricao.length < 3) {
            errors.dsDescricao = 'Descrição deve ter no minimo 3 caracteres'
            isValid = false;
        }

        if (!contaBancaria) {
            errors.contaBancaria = 'Conta bancaria é obrigatória';
            isValid = false;
        }

        if (!vlMovimento || vlMovimento <= 0) {
            errors.vlMovimento = 'Valor do movimento é obrigatório';
            isValid = false;
        }

        if (!qtdParcelas && idMovimento === null) {
            errors.qtdParcelas = 'Quantidade de parcelas é obrigatório obrigatório';
            isValid = false;
        }

        if (!fgTipoMovimento) {
            errors.fgTipoMovimento = 'Tipo de movimento é obrigatório';
            isValid = false;
        }

        if (!dtMovimento) {
            errors.dtMovimento = 'Data de movimento é obrigatória';
            isValid = false;
        }

        if (!dtVencimento) {
            errors.dtVencimento = 'Data de movimento é obrigatória';
            isValid = false;
        }

        if (!categoria) {
            errors.categoria = 'Categoria é obrigatória';
            isValid = false;
        }

        setErrors(errors)
        return isValid;
    }

    const createMovimento = async (e) => {
        e.preventDefault()
        if (validation()) {
            const movimentoDTO = {
                idMovimento: idMovimento,
                nrParcela: nrParcela,
                qtdParcelas: qtdParcelas,
                dtVencimento: moment(dtVencimento).format('YYYY-MM-DD'),
                dtMovimento: moment(dtMovimento).format('YYYY-MM-DD'),
                fgTipoMovimento: fgTipoMovimento.code,
                fgSituacaoMovimento: fgSituacaoMovimento.code,
                fgConciliarAutomatico: fgConciliarAutomatico,
                fgValorParcela: fgValorParcela,
                contaBancaria: contaBancaria,
                categoria: categoria,
                vlMovimento: vlMovimento,
                dsDescricao: dsDescricao
            }
            if (idMovimento !== null) {
                movimentoService.editarMovimento(movimentoDTO)
                    .then((res) => {
                        setVisible(false, true, res)
                    });
                return
            }

            movimentoService.cadastroMovimento(movimentoDTO)
                .then(() => {
                    setVisible(false, true)
                });
        }

    }

    useEffect(() => {
        if (idMovimento !== null) {
            movimentoService.findById(idMovimento, nrParcela)
                .then((response) => {
                    construirObjectEdit(response.data)
                })
        }
    }, [visible]);

    const construirObjectEdit = (movimentoEdit) => {
        setDsDescricao(movimentoEdit.dsDescricao)
        setVlMovimento(Math.abs(movimentoEdit.vlMovimento))
        setIdConta(movimentoEdit.contaBancaria.idContaBancaria)
        setIdCategoria(movimentoEdit.categoria.idCategoria)
        setFgConciliarAutomatico(movimentoEdit.fgConciliarAutomatico)
        setQtdParcelas(movimentoEdit.qtdParcelas)
        setDtVencimento(new Date(Date.parse(movimentoEdit.dtVencimento)))
        setDtMovimento(new Date(Date.parse(movimentoEdit.dtMovimento)))
        setFgTipoMovimento(tipoMovimento[movimentoEdit.fgTipoMovimento])
        setFgSituacaoMovimento(situacaoMovimento[movimentoEdit.fgSituacaoMovimento])
        setFgValorParcela(tipoMovimento.fgValorParcela)
        setCategoriaDTO(movimentoEdit.categoria)
    }

    const autoCompleteContaContent = () => {
        if (idConta !== null) {
            return <ContaBancariaAutoComplete contaBancariaDTO={setContaBancariaDTO} idContaBancaria={idConta}/>
        }
    }

    const autoCompleteCategoria = () => {
        if (idCategoria !== null) {
            return <CategoriaAutoComplete categoriaDTO={setCategoriaDTO} tipoMovimento={fgTipoMovimento} idCategoria={idCategoria}/>
        }
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false)} className="p-button-text"/>
            <Button label="Salvar" disabled={false} type="submit" icon="pi pi-check" onClick={(e) => {
                createMovimento(e)
            }} autoFocus/>
        </div>
    );
    return (
        <div>
            <Dialog header="Cadastro Movimento" visible={visible} style={{width: '50vw'}}
                    onHide={() => setVisible(false)} footer={footerContent}>
                <div className="formgrid grid m-2 p-3">
                    <div className="card flex col-12 lg:col-6 pb-2 pt-1">
                        <label className="pr-4 pt-1 mb-2" style={{textAlign: "center"}}>Conciliar Automático</label>
                        <InputSwitch checked={fgConciliarAutomatico}
                                     onChange={(e) => setFgConciliarAutomatico(e.value)}
                                     className="ml-auto lg:ml-2"/>
                    </div>
                    <div className="field col-12 lg:col-6 pb-2">
                        <span className="p-float-label">
                            <Dropdown value={fgSituacaoMovimento} onChange={(e) => setFgSituacaoMovimento(e.value)}
                                      options={situacaoMovimento}
                                      optionLabel="name"
                                      className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full dropdown-component
                                      dropdown-component"/>
                            <label htmlFor="fgTipoMovimento">Situação Movimento</label>
                        </span>
                    </div>
                    <div className="field col-12">
                    <span className="p-float-label">
                        <InputText id="dsDescricao" value={dsDescricao}
                                   onChange={(e) => setDsDescricao(e.target.value)}
                                   className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                        <label htmlFor="dsDescricao">Descrição Movimento</label>
                        {errors.dsDescricao && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dsDescricao}</small>}
                    </span>
                    </div>
                    <div className="field col-12 mt-4">
                        {idMovimento !== null ?
                            autoCompleteContaContent(null) :
                            <ContaBancariaAutoComplete contaBancariaDTO={setContaBancariaDTO}
                                                       idContaBancaria={idConta}/>
                        }
                        {errors.contaBancaria && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.contaBancaria}</small>}
                    </div>
                    <div className="field col-12 lg:col-6 mt-4">
                    <span className="p-float-label">
                        <InputNumber id="vlMovimento" value={vlMovimento}
                                     onValueChange={(e) => setVlMovimento(e.value)}
                                     useGrouping={false}
                                     className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full input-number"
                                     inputClassName={'input-number'} minFractionDigits={2} locale="de-DE"/>
                        <label htmlFor="vlMovimento">Valor Movimento</label>
                        {errors.vlMovimento && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.vlMovimento}</small>}
                    </span>
                    </div>
                    {
                        idMovimento === null ?
                            <div className="field col-12 lg:col-6 mt-5">
                                <div>
                                    <div className="flex align-items-center">
                                        <Checkbox inputId="fgValorParcela" name="fgValorParcela"
                                                  onChange={e => setFgValorParcela(e.checked)}
                                                  checked={fgValorParcela}/>
                                        <label htmlFor="fgValorParcela" className="ml-2">Valor Parcela</label>
                                        <div className="card flex justify-content-center ml-2">
                                            <Tooltip target=".custom-target-icon"/>

                                            <i className="custom-target-icon pi pi-info-circle p-text-secondary p-overlay-badge"
                                               data-pr-tooltip="Se você vai informar o valor da parcela marque a caixinha"
                                               data-pr-position="right"
                                               data-pr-at="right+5 top"
                                               data-pr-my="left center-2"
                                               style={{fontSize: '1rem', cursor: 'pointer'}}>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <></>
                    }
                    {
                        idMovimento === null ?
                            <div className="field col-12 lg:col-6 mt-4">
                                <span className="p-float-label">
                                    <InputNumber id="qtdParcelas" value={qtdParcelas}
                                                 onValueChange={(e) => setQtdParcelas(e.value)}
                                                 useGrouping={false}
                                                 className="text-base text-color surface-overlay border-1 border-solid surface-border
                                        border-round appearance-none outline-none focus:border-primary w-full input-number"
                                                 inputClassName={'input-number'}/>
                                    <label htmlFor="vlMovimento">Qtd Parcelas</label>
                                    {errors.qtdParcelas && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.qtdParcelas}</small>}
                                </span>
                            </div> :
                            <></>
                    }
                    <div className="field col-12 lg:col-6 mt-4">
                        <span className="p-float-label">
                            <Dropdown value={fgTipoMovimento} onChange={(e) => setFgTipoMovimento(e.value)}
                                      options={tipoMovimento}
                                      optionLabel="name"
                                      disabled={idMovimento}
                                      className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full dropdown-component
                                      dropdown-component"/>
                            <label htmlFor="fgTipoMovimento">Tipo Movimento</label>
                            {errors.fgTipoMovimento && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.fgTipoMovimento}</small>}
                        </span>
                    </div>
                    <div className="field col-12 lg:col-6 mt-4">
                    <span className="p-float-label">
                        <Calendar id="dtMovimento" value={dtMovimento}
                                  onChange={(e) => setDtMovimento(e.target.value)} dateFormat="dd/mm/yy"
                                  className="text-base text-color surface-overlay border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full
                                    input-date" inputClassName={'input-date'}/>
                        <label htmlFor="dtVencimento">Data Movimento</label>
                        {errors.dtMovimento && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dtMovimento}</small>}
                    </span>
                    </div>
                    <div className="field col-12 lg:col-6 mt-4">
                    <span className="p-float-label">
                        <Calendar id="dtVencimento" value={dtVencimento}
                                  onChange={(e) => setDtVencimento(e.target.value)} dateFormat="dd/mm/yy"
                                  className="text-base text-color surface-overlay border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full
                                    input-date" inputClassName={'input-date'}/>
                        <label htmlFor="dtVencimento">Data Vencimento</label>
                        {errors.dtVencimento && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.dtVencimento}</small>}
                    </span>
                    </div>
                    <div className="field col-12 mt-4">
                        {idMovimento !== null ?
                            autoCompleteCategoria() :
                            <CategoriaAutoComplete categoriaDTO={setCategoriaDTO} tipoMovimento={fgTipoMovimento}
                                                   idCategoria={idCategoria}/>
                        }
                        {errors.categoria && <small style={{ color: 'red', marginLeft: '10px' }}>{errors.categoria}</small>}
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default CadastroMovimento;