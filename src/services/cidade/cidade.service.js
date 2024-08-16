import pathBackend from "../../axios/config.js";

const cidadeService = {
    async autocompleteCidade (query)  {
        return pathBackend.get(`cidades/buscar-cidade/${query}`)
    }
}

export default cidadeService;