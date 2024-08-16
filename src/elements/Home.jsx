import React, {useEffect, useState} from 'react';
import ChartStackedBar from "../components/charts/ChartStackedBar.jsx";
import ChartLine from "../components/charts/ChartLine.jsx";
import ChartPie from "../components/charts/ChartPie.jsx";
import homeService from "../services/home/home.service.js";
import Loading from "../components/loading/Loading.jsx";

const Home = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCharts().then((res) => {
            setData(res.data);
            setLoading(false);
        });

    }, []);

    async function loadCharts () {
        return homeService.buscarDadosGrafico();
    }

    return (
        <div style={{height: ("88vh")}}>
            <div className="grid p-fluid">
                {
                    loading ? <Loading/> :
                        data.map((item, index) => (
                            <div className="col-12 xl:col-6" key={index}>
                                {item.type === 'line' && <ChartLine dados={item}/>}
                                {item.type === 'bar' && <ChartStackedBar dados={item}/>}
                                {item.type === 'pie' && <ChartPie dados={item}/>}
                            </div>
                        ))
                }
            </div>
        </div>
    );
};

export default Home;