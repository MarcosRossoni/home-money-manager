import pathBackend from "../../axios/config.js";

const homeService = {

    async buscarDadosGrafico () {
        return pathBackend.get("/chart/find")
    }
}

export default homeService