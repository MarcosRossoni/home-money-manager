import {useRef} from 'react';
import {Toast} from "primereact/toast";
import {Menu} from "primereact/menu";
import {FaBookmark, FaLandmark} from "react-icons/fa";
import {FaMoneyBillTransfer} from "react-icons/fa6";

const MenuBar = () => {
    const toast = useRef(null);
    const items = [
        {
            label: 'Módulos',
            items: [
                {
                    label: 'Conta Banco',
                    icon: <FaLandmark className="pr-1"/>,
                    url: '/conta-bancaria'
                },
                {
                    label: 'Movimento',
                    icon: <FaMoneyBillTransfer className="pr-1"/>,
                    url: '/movimento'
                },
                {
                    label: 'Categoria',
                    icon: <FaBookmark className="pr-1"/>,
                    url: '/categoria'
                }
            ]
        },
        {
            label: 'Preferências',
            items: [
                {
                    label: 'Em Progresso',
                    icon: 'pi pi-cog'
                }
            ]
        }
    ];

    return (
        <div className="card flex justify-content-center h-full py-2">
            <Toast ref={toast} />
            <Menu className="surface-ground" model={items} />
        </div>
    )
};

export default MenuBar;