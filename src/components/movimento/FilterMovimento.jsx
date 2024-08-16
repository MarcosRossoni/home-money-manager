import React, {useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {Calendar} from "primereact/calendar";
import moment from "moment";
import "./../styled/CalendarStyled.css"
import CategoriaAutoComplete from "../autocompletes/CategoriaAutoComplete.jsx";
import {Dropdown} from "primereact/dropdown";

const FilterMovimento = ({filter, buscarMovimento}) => {

    const [dtInicio, setDtInicio] = useState(moment().startOf('month').format('YYYY-MM-DD'));
    const [dtFim, setDtFim] = useState(moment().endOf('month').format('YYYY-MM-DD'));
    const [categoria, setCategoria] = useState(null)
    const [fgTipoMovimento, setFgTipoMovimento] = useState(null)

    const tipoMovimento = [
        {name: 'RECEITA', code: 0},
        {name: 'DESPESA', code: 1}
    ];

    Date.prototype.addDays = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const onChange = () => {
        filter.dtInicio = moment(dtInicio).format('YYYY-MM-DD');
        filter.dtFim = moment(dtFim).format('YYYY-MM-DD');
        filter.fgTipoMovimento = fgTipoMovimento !== null ? fgTipoMovimento.code : null;
        filter.idCategoria = categoria !== null ? categoria.idCategoria : null;
        buscarMovimento(0)
    }

    const setCategoriaDTO = (categoria) => {
        setCategoria(categoria)
    }

    useEffect(() => {
        setDtInicio(new Date(Date.parse(dtInicio)).addDays(1))
        setDtFim(new Date(Date.parse(dtFim)))
    }, []);

    return (
        <div>
            <div className="field col-12">
                    <span className="p-float-label">
                        <Calendar id="dtInicio" value={dtInicio}
                                  onChange={(e) => setDtInicio(e.target.value)} dateFormat="dd/mm/yy"
                                  className="text-base text-color surface-overlay border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full
                                    input-date" inputClassName={'input-date'}/>
                        <label htmlFor="dtVencimento">Data Início</label>
                    </span>
            </div>
            <div className="field col-12">
                    <span className="p-float-label">
                        <Calendar id="dtFim" value={dtFim}
                                  onChange={(e) => setDtFim(e.target.value)} dateFormat="dd/mm/yy"
                                  className="text-base text-color surface-overlay border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full
                                    input-date" inputClassName={'input-date'}/>
                        <label htmlFor="dtVencimento">Data Fim</label>
                    </span>
            </div>
            <div className="field col-12 mt-4">
                        <span className="p-float-label">
                            <Dropdown value={fgTipoMovimento} onChange={(e) => setFgTipoMovimento(e.value)}
                                      options={tipoMovimento}
                                      optionLabel="name"
                                      className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full dropdown-component
                                      dropdown-component"/>
                            <label htmlFor="fgTipoMovimento">Tipo Movimento</label>
                        </span>
            </div>
            <div className="field col-12 mt-4">
                <CategoriaAutoComplete categoriaDTO={setCategoriaDTO} tipoMovimento={fgTipoMovimento}
                                       idCategoria={null}/>
            </div>
            <Button onClick={onChange}>Buscar</Button>
        </div>
    );
};

export default FilterMovimento;