import React, {useEffect, useState} from 'react';
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {ColorPicker} from "primereact/colorpicker";
import categoriaService from "../../services/categoria/categoria.service.js";

function CadastroCategoria({visible, setHideDialog, idCategoria}) {
    const [dsDescricao, setDsDescricao] = useState('');
    const [dsCor, setDsCor] = useState('#008000');
    const [fgTipo, setFgTipo] = useState(null);
    const [errors, setErrors] = useState({})

    const setVisible = (r, reload) => {
        setHideDialog(r, reload)
        setDsDescricao('')
        setDsCor('#008000')
        setFgTipo(null)
        return false
    }

    const tipoCategoria = [
        {name: 'RECEITA', code: 0},
        {name: 'DESPESA', code: 1}
    ];

    const validation = () => {
        let isValid = true;

        const errors = {
            dsDescricao: '',
            dsCor: '',
            fgTipo: ''
        };

        if (!dsDescricao) {
            errors.dsDescricao = 'Descrição é obrigatório'
            isValid = false
        }

        if (!dsCor) {
            errors.dsCor = 'Cor da categoria é obrigatório'
            isValid = false
        }

        if (!fgTipo) {
            errors.fgTipo = 'Tipo da categoria é obrigatório'
            isValid = false
        }

        setErrors(errors)
        return isValid

    }

    const createCategoria = (e) => {
        e.preventDefault();

        if (validation()){
            const categoriaDTO = {
                idCategoria: idCategoria,
                dsDescricao: dsDescricao,
                dsCor: '#' + dsCor,
                fgTipo: fgTipo.code
            }

            if (idCategoria !== null) {
                categoriaService.atualizarCategoria(categoriaDTO)
                    .then(() => {
                        setVisible(false, true)
                    })
                return
            }

            categoriaService.cadastroCategoria(categoriaDTO)
                .then(() => {
                    setVisible(false, true)
                })

        }
    }

    useEffect(() => {
        if (idCategoria) {
            categoriaService.findById(idCategoria)
                .then(response =>{
                    construirCategoriaEdit(response.data)
                })
        }
    }, [visible]);

    const construirCategoriaEdit = (categoria) => {
        setDsDescricao(categoria.dsDescricao)
        setDsCor(categoria.dsCor)
        setFgTipo(tipoCategoria.find((item) => item.code === categoria.fgTipo))
    }

    const footerContent = (
        <div>
            <Button label="Cancelar" icon="pi pi-times" onClick={() => setVisible(false, false)}
                    className="p-button-text"/>
            <Button label="Salvar" type="submit" icon="pi pi-check" onClick={(e) => {
                createCategoria(e)
            }} autoFocus/>
        </div>
    );

    return (
        <div className="card flex justify-content-center">
            <Dialog header="Categoria" visible={visible} style={{width: '50vw'}} onHide={() => setVisible(false)}
                    footer={footerContent}>
                <div className="formgrid grid m-2 p-3">
                    <div className="field col-12">
                    <span className="p-float-label">
                        <InputText id="dsDescricao" value={dsDescricao}
                                   onChange={(e) => setDsDescricao(e.target.value)}
                                   className="text-base text-color surface-overlay p-2 border-1 border-solid
                                    surface-border border-round appearance-none outline-none focus:border-primary w-full"/>
                        <label htmlFor="dsNome" className="">Descrição da Categoria</label>
                        {errors.dsDescricao &&
                            <small style={{color: 'red', marginLeft: '10px'}}>{errors.dsDescricao}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <label htmlFor="cp-hex" className="font-bold block mb-2">Cor da Categoria</label>
                        <span className="p-float-label">
                        <ColorPicker inputId="cp-hex" format="hex" value={dsCor} onChange={(e) => setDsCor(e.value)}
                                     className="mb-3"/>
                            {errors.dsCor &&
                                <small style={{color: 'red', marginLeft: '10px'}}>{errors.dsCor}</small>}
                    </span>
                    </div>
                    <div className="field col-12 md:col-6 mt-4">
                        <span className="p-float-label">
                            <Dropdown value={fgTipo} onChange={(e) => setFgTipo(e.value)}
                                      options={tipoCategoria}
                                      optionLabel="name"
                                      className="text-base text-color surface-overlay border-1 border-solid surface-border
                                     border-round appearance-none outline-none focus:border-primary w-full dropdown-component"/>
                            <label htmlFor="fgTipoConta">Tipo Conta</label>
                            {errors.fgTipoConta &&
                                <small style={{color: 'red', marginLeft: '10px'}}>{errors.fgTipoConta}</small>}
                        </span>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}

export default CadastroCategoria;
