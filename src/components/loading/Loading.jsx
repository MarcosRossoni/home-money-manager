import React from 'react';
import {ProgressSpinner} from "primereact/progressspinner";

const Loading = () => {
    return (
        <div style={{top: '0', left: '50%'}} className="card flex align-items-center fixed h-full
                    justify-content-center align-items-center">
            <ProgressSpinner/>
        </div>
    );
};

export default Loading;