import pathBackend from "../../axios/config.js";

const contabancariaService = {

    async cadastrarContaBancaria(contaBancaria) {
        return pathBackend.post("/conta-bancaria", contaBancaria)
    },

    async alterarContaBancaria(contaBancaria) {
        return pathBackend.put("/conta-bancaria", contaBancaria)
    },

    async findById(idConta) {
        return pathBackend.get(`/conta-bancaria/${idConta}`)
    },

    async findListContas() {
        return pathBackend.get("/conta-bancaria")
    },

    async autoCompleteConta(dsConta) {
        return pathBackend.get(`/conta-bancaria/buscar-conta/${dsConta}`)
    }
}

export default contabancariaService