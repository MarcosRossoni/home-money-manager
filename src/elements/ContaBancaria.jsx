import {useEffect, useRef, useState} from 'react';
import CadastroContaCorrente from "../components/contacorrente/CadastroContaCorrente.jsx";
import ButtonSpeeddial from "../components/buttons/ButtonSpeeddial.jsx";
import {IoIosAdd} from "react-icons/io";
import contabancariaService from "../services/contabancaria/contabancaria.service.js";
import {InputSwitch} from "primereact/inputswitch";
import {FaMoneyBillTransfer, FaMoneyBillTrendUp} from "react-icons/fa6";
import {FaPiggyBank} from "react-icons/fa";
import {Button} from "primereact/button";
import {DataScroller} from "primereact/datascroller";
import {Image} from "primereact/image";
import "../../src/components/styled/ListContasStyled.css"
import Loading from "../components/loading/Loading.jsx";

const ContaBancaria = () => {
    const [visible, setVisible] = useState(false)
    const [reload, setReaload] = useState(false)
    const [listContas, setListContas] = useState([])
    const [idConta, setIdConta] = useState()
    const [loading, setLoading] = useState(true);
    const [itemsMenu, setItemsMenu] = useState([
        {
            label: 'Cadastrar Conta',
            icon: <IoIosAdd style={{fontSize: '1.5rem'}}/>,
            command: () => {
                setIdConta(null)
                setVisible(true)
            }
        },
        {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {

            }
        },
        {
            label: 'Delete',
            icon: 'pi pi-trash',
            command: () => {

            }
        },
        {
            label: 'Upload',
            icon: 'pi pi-upload'
        },
    ]);

    const setHideDialog = (r, reload) => {
        setVisible(r)
        setReaload(reload)
    }

    const formatNumber = (n) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
    }

    const editarConta = (id) => {
        setIdConta(id)
        setVisible(true)
    }

    const tipoConta = [
        { name: 'CONTA CORRENTE', code: 0 },
        { name: 'CONTA POUPANÇA', code: 1 },
        { name: 'APLICAÇÃO', code: 2 }
    ];

    useEffect(() => {

        loadListContas()
        setHideDialog()
    }, [reload])

    const ativarDesativarConta = (contaBancaria, fgAtiva) => {
        contaBancaria.fgAtiva = fgAtiva
        contabancariaService.alterarContaBancaria(contaBancaria).then(() => {
            loadListContas()
        })
    }

    const loadListContas = () => {
        contabancariaService.findListContas()
            .then(function (response) {
                setListContas(response.data)
                setLoading(false)
            })
    }

    const verificarTipoConta = (code) => {
        let tipoContaList = tipoConta.find((item) => item.code === code);
        return tipoContaList.name
    }

    const itemTemplate = (data) => {
        return (
            <div className="col-12">
                <div className="card flex justify-content-end pr-4 pt-1">
                    <InputSwitch checked={data.fgAtiva} onChange={(e) => ativarDesativarConta(data, e.value)}/>
                </div>
                <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                    <div
                        className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
                        <div className="flex flex-column align-items-center lg:align-items-start gap-3">
                            <div className="flex flex-column gap-1">
                                <div className="text-2xl font-bold text-900">{data.dsBanco}</div>
                                <div className="text-700">{data.dsDescricao}</div>
                            </div>
                            <div className="flex flex-column gap-2">
                                <span className="flex align-items-center gap-2">
                                    {data.fgContaBancaria === 0 ? <FaMoneyBillTransfer/> :
                                        data.fgContaBancaria === 1 ? <FaPiggyBank /> : <FaMoneyBillTrendUp />}
                                    <span className="font-semibold">{verificarTipoConta(data.fgContaBancaria)}</span>
                                </span>
                            </div>
                        </div>
                        <div
                            className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
                            <span className="text-2xl font-semibold">{formatNumber(data.vlSaldoAtual)}</span>
                            <div className="col-12 text-right">
                                <Button icon="pi pi-pencil" onClick={() => editarConta(data.idContaBancaria)}
                                        rounded text aria-label="Editar"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{height: ("88vh")}}>
            <div>
                {loading ? <Loading/> :
                    listContas.length > 0 ?
                        <div className="mt-2 shadow-5">
                            <DataScroller value={listContas} itemTemplate={itemTemplate} rows={5} inline
                                          scrollHeight={`84.5vh`}
                                          header="Lista Contas Bancarias" className=""/>
                        </div> :
                        <div className="card flex justify-content-center flex-column align-content-center w-full">
                            <Image src="/sem_conta_cadastrada.jpg" alt="Image"
                                   width="550" className="mx-auto"/>
                            <label className="align-self-center">Não existe conta bancaria cadastrada</label>
                        </div>
                }
                {visible ?
                    <CadastroContaCorrente visible={visible} setHideDialog={setHideDialog} idConta={idConta}/> : <></>}
            </div>
            <ButtonSpeeddial itemsSpeed={itemsMenu}/>
        </div>

    );
};

export default ContaBancaria;