import React from 'react';
import NavBar from "./NavBar.jsx";
import MenuBar from "./MenuBar.jsx";
import useWindowSize from "../context/useWindowSize.js";

function GlobalTemplate({Item}) {
    const { width } = useWindowSize();
    return (
        <div className="p-0 m-0">
            <NavBar width={width}/>
            <div className="grid-nogutter mr-1 flex flex-wrap">
                {width > 800 ?
                    <div className="col-fixed" style={{width: "250px"}}>
                        <MenuBar/>
                    </div> :
                    <></>
                }
                <div className="col justify-content-center overflow-x-hidden">
                    <Item/>
                </div>
            </div>
        </div>
    );
}

export default GlobalTemplate;