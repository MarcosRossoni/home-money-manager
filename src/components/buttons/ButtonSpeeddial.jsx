import {useRef} from 'react';
import {Toast} from "primereact/toast";
import {SpeedDial} from "primereact/speeddial";
import {Speeddial} from "../styled/ButtonsStyled.js";

const ButtonSpeeddial = ({itemsSpeed}) => {
    const toast = useRef(null);

    return (
        <div className="card relative">
            <Speeddial>
                <Toast ref={toast} />
                <div className="fixed bottom-0 right-0 mr-2 mb-2">
                    <SpeedDial model={itemsSpeed} radius={120} type="quarter-circle" direction="up-left" style={{ right: 0, bottom: 0 }} />
                </div>
            </Speeddial>
        </div>
    )
};

export default ButtonSpeeddial;