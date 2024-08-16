import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";

const ChartPie = ({dados}) => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        setChartData(dados.data);
        setChartOptions(dados.options);
    }, []);

    return (
        <div className="card">
            <h3 className="text-left w-full">{dados.title}</h3>
            <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem"/>
        </div>
    );
};

export default ChartPie;