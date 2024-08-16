import movimentoRestService from "./movimento.rest.service.js";

const movimentoService = {
    async listarMovimentos (query) {
        return movimentoRestService.listarMovimentos(query);
    },

    async findById (idMovimento, nrParcela) {
        return movimentoRestService.findById(idMovimento, nrParcela);
    },

    async cadastroMovimento (movimento) {
        return movimentoRestService.cadastroMovimento(movimento)
    },

    async editarMovimento (movimento) {
        return movimentoRestService.editarMovimento(movimento)
    },

    async deletarMovimento (idMovimento) {
        return movimentoRestService.deletarMovimento(idMovimento)
    }
}

export default movimentoService;