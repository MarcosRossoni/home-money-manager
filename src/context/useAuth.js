import {useContext} from "react";
import {AuthContext} from "../services/auth/auth.jsx";

const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;