import React, {useEffect, useState} from 'react';
import {AutoComplete} from "primereact/autocomplete";
import '../styled/FormStyled.css'
import cidadeService from "../../services/cidade/cidade.service.js";

const CidadeAutoComplete = ({cidadeDTO}) => {
    const [cidade, setCidade] = useState(null);
    const [listCidades, setListCidades] = useState([]);
    const [filteredCidade, setFilteredCidade] = useState([])

    const buscarCidade = (e) => {
        cidadeService.autocompleteCidade(e.query)
            .then(function (response) {
                setListCidades(response.data)
            })
    }

    const addCidadeDTO = (e) => {
        setCidade(e)
        listCidades.filter((item) => {
            if (item.dsNome === e) {
                cidadeDTO(item)
            }
            return true
        })
    }

    useEffect(() => {
        let listNomeCidade = [];
        listCidades.forEach((item) => {
            let dsNome = item.dsNome;
            listNomeCidade.push(dsNome)
        })
        setFilteredCidade(listNomeCidade)

    },[listCidades])

    return (
        <div>
            <span className="p-float-label">
            <AutoComplete id="cidade" value={cidade} suggestions={filteredCidade} completeMethod={buscarCidade}
                          onChange={(e) => addCidadeDTO(e.value)}
                          className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full autocomplete"
                          inputClassName={'w-full autocomplete'}/>
                <label htmlFor="cidade">Cidade</label>
            </span>

        </div>
    )
};

export default CidadeAutoComplete;