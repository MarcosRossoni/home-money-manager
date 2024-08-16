import {createContext, useEffect, useState} from "react";
import pathBackend from "../../axios/config.js";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const userToken = localStorage.getItem("user_token");

        if (userToken) {
            setUser(true)
        }
    }, []);

    const signin = (email, password) => {

        pathBackend.get(
            `/oauth/token?username=${email}&password=${password}&grant_type=password`
        ).then(function(res) {
            if (res.status === 200) {
                localStorage.setItem("user_token", JSON.stringify(res.data));
                setUser(true)
                window.location.href = "/";
            }
        });

        const hasUser = true;

        if (hasUser?.length) {
            if (hasUser[0].email === email && hasUser[0].password === password) {
                const token = Math.random().toString(36).substring(2);
                localStorage.setItem("user_token", JSON.stringify({email, token}));
                setUser({email, password});
                return;
            } else {
                return "E-mail ou senha incorretos";
            }
        } else {
            return "Usuário não cadastrado";
        }
    };

    const signup = (usuarioDTO) => {
        pathBackend.post(`/usuario`, usuarioDTO)
            .then(function (res) {
                if (res.status === 200) {
                    window.location.href = "/login";
                }
            });
    };

    const signout = () => {
        pathBackend.patch(`/revoke`)
            .then(function (res) {
                localStorage.removeItem("user_token");
                window.location.href = "/login";
            })
    };

    const recuperarSenha = (email) => {
        pathBackend.get(`/recuperar-senha${email}`).then(function (res) {
            if (res.status === 200) {
                window.location.href = "/login";
            }
        })
    }

    const redefinirSenha = (query) => {
        pathBackend.get(`recuperar-senha/verifica-token${query}`).then(function (res) {
            if (res.status === 200) {
                window.location.href = "/login";
            }
        });
    }

    return (
        <AuthContext.Provider
            value={{user, signed: !!user, signin, signup, signout, recuperarSenha, redefinirSenha}}
        >
            {children}
        </AuthContext.Provider>
    );
};