import { createContext, useContext, useEffect, useState } from "react";

import authService from "../services/auth.service";

import {
    saveToken,
    getToken,
    removeToken,
} from "../utils/token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    //--------------------------------------

    const register = async (data) => {

        const response = await authService.register(data);

        saveToken(response.data.token);

        setUser(response.data.user);

        return response;
    };

    //--------------------------------------

    const login = async (data) => {

        const response = await authService.login(data);

        saveToken(response.data.token);

        setUser(response.data.user);

        return response;
    };

    //--------------------------------------

    const logout = () => {

        removeToken();

        setUser(null);

    };

    //--------------------------------------

    const loadUser = async () => {

        const token = getToken();

        if (!token) {

            setLoading(false);

            return;

        }

        try {

            const response = await authService.getCurrentUser();

            setUser(response.data);

        } catch {

            removeToken();

            setUser(null);

        } finally {

            setLoading(false);

        }
    };

    //--------------------------------------

    useEffect(() => {

        loadUser();

    }, []);

    //--------------------------------------

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;