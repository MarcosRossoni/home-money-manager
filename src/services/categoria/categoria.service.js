import pathBackend from "../../axios/config.js";

const categoriaService = {
    async autocompleteCategoria (query, fgTipo)  {
        return pathBackend.get(`categoria/buscar-categoria/${query}/${fgTipo}`)
    },

    async listaPaginacaoCategoria (query) {
        return pathBackend.get(`categoria/paginacao-categoria${query}`);
    },

    async cadastroCategoria (categoriaDTO) {
        return pathBackend.post(`categoria`, categoriaDTO);
    },

    async atualizarCategoria (categoriaDTO) {
        return pathBackend.put(`categoria`, categoriaDTO);
    },

    async findById (idCategoria) {
        return pathBackend.get(`categoria/${idCategoria}`);
    }
}

export default categoriaService;