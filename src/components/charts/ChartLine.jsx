import React, {useEffect, useState} from 'react';
import {Chart} from "primereact/chart";

const ChartLine = ({dados}) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        setChartData(dados.data);
    }, []);

    return (
        <div className="col-12 xl:col-6">
            <div className="card">
                <h3>{dados.title}</h3>
                <Chart type="line" data={chartData} className="w-full xl:w-30rem"/>
            </div>
        </div>
    )
};

export default ChartLine;