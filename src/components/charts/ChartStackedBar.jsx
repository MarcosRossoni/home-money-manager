import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";

const ChartStackedBar = ({dados}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData(dados.data);
        setChartOptions(dados.options);
    }, []);

    return (
        <div className="card align-items-center">
            <h3>{dados.title}</h3>
            <Chart type="bar" data={chartData} options={chartOptions}/>
        </div>
    )
};

export default ChartStackedBar;