import React, {useEffect, useState} from 'react';
import {AutoComplete} from "primereact/autocomplete";
import contabancariaService from "../../services/contabancaria/contabancaria.service.js";

const ContaBancariaAutoComplete = ({contaBancariaDTO, idContaBancaria}) => {
    const [listContas, setListContas] = useState([]);
    const [filteredContas, setFilteredContas] = useState([])
    const [contaBancaria, setContaBancaria] = useState(null);
    const [trocaConta, setTrocaConta] = useState(false);

    const buscarConta = (e) => {
        contabancariaService.autoCompleteConta(e.query)
            .then(function (response) {
                setListContas(response.data)
            })
    }

    const buscarContaId = (e) => {
        contabancariaService.findById(e)
            .then(function (response) {
                setContaBancaria(response.data.dsDescricao)
                contaBancariaDTO(response.data)
            })
    }

    const addContaBancariaDTO = (e) => {
        setContaBancaria(e)
        listContas.filter((item) => {
            if (item.dsDescricao === e) {
                contaBancariaDTO(item)
            }
            return true
        })
    }

    useEffect(() => {
        if (idContaBancaria === null || trocaConta) {
            let listNomeConta = [];
            listContas.forEach((item) => {
                let dsNome = item.dsDescricao;
                listNomeConta.push(dsNome)
            })
            setFilteredContas(listNomeConta)
            return
        }

        if (!trocaConta) {
            buscarContaId(idContaBancaria)
        }

    }, [listContas])

    return (
        <div>
            <span className="p-float-label">
                <AutoComplete id="contaBancaria" value={contaBancaria}
                              suggestions={filteredContas}
                              completeMethod={buscarConta}
                              onChange={(e) => {
                                  setTrocaConta(true)
                                  addContaBancariaDTO(e.value)
                              }}
                              className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full autocomplete"
                              inputClassName={'w-full autocomplete'}/>
                <label htmlFor="contaBancaria">Conta Bancaria</label>
            </span>
        </div>
    );
};

export default ContaBancariaAutoComplete;