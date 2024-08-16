import {useEffect, useState} from 'react';

function useWindowSize() {
    // Inicializa o estado com as dimensões da janela,
    // ou com 1000px caso seja a primeira renderização no lado do servidor
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 1000,
        height: typeof window !== 'undefined' ? window.innerHeight : 800,
    });

    useEffect(() => {
        // Função para atualizar o estado com as novas dimensões da janela
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Adiciona o event listener quando o componente é montado
        window.addEventListener('resize', handleResize);

        // Remove o event listener quando o componente é desmontado
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
}

export default useWindowSize;