import pathBackend from "../../axios/config.js";

const movimentoRestService = {
    async listarMovimentos (query)  {
        return pathBackend.get(`/movimento/list-movimento${query}`)
    },

    async findById (idMovimento, nrParcela)  {
        return pathBackend.get(`/movimento/${idMovimento}/${nrParcela}`);
    },

    async cadastroMovimento (movimento)  {
        return pathBackend.post("/movimento", movimento)
    },

    async editarMovimento (movimento)  {
        return pathBackend.put("/movimento", movimento)
    },

    async deletarMovimento (idMovimento) {
        return pathBackend.delete(`/movimento/${idMovimento}`);
    }
}

export default movimentoRestService;