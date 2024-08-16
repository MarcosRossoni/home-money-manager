import React, {useEffect, useState} from 'react';
import {AutoComplete} from "primereact/autocomplete";
import categoriaService from "../../services/categoria/categoria.service.js";

const CategoriaAutoComplete = ({categoriaDTO, tipoMovimento, idCategoria}) => {
    const [listCategoria, setListCategoria] = useState([]);
    const [filteredCategoria, setFilteredCategoria] = useState([])
    const [categoria, setCategoria] = useState();
    const [trocaCategoria, setTrocaCategoria] = useState(false);

    const buscarCategoria = (e) => {
        categoriaService.autocompleteCategoria(e.query, tipoMovimento.code)
            .then(function (response) {
                setListCategoria(response.data)
            })
    }

    const buscarCategoriaId = (e) => {
        categoriaService.findById(e)
            .then(function (response) {
                setCategoria(response.data.dsDescricao)
                categoriaDTO(response.data)
            })
    }

    const addCategoriaDTO = (e) => {
        setCategoria(e)
        listCategoria.filter((item) => {
            if (item.dsDescricao === e) {
                categoriaDTO(item)
            }
            return true
        })
    }

    useEffect(() => {
        if (idCategoria === null || trocaCategoria) {
            let listNomeCategoria = [];
            listCategoria.forEach((item) => {
                let dsNome = item.dsDescricao;
                listNomeCategoria.push(dsNome)
            })
            setFilteredCategoria(listNomeCategoria)
            return
        }

        if (!trocaCategoria) {
            buscarCategoriaId(idCategoria)
        }

    },[listCategoria, idCategoria, trocaCategoria])
    return (
        <div>
            <div>
            <span className="p-float-label">
            <AutoComplete id="contaBancaria" value={categoria} suggestions={filteredCategoria} completeMethod={buscarCategoria}
                          onChange={(e) => {
                              setTrocaCategoria(true)
                              addCategoriaDTO(e.value)
                          }}
                          className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full autocomplete"
                          inputClassName={'w-full autocomplete'}/>
                <label htmlFor="contaBancaria">Categoria</label>
            </span>

            </div>
        </div>
    );
};

export default CategoriaAutoComplete;