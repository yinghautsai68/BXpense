import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react"

type JwtPayload = {
    user_id: string
}

type AuthUser = {
    userId: string
}
type AuthContext = {
    token: string | null,
    user: AuthUser | null,
    login: (token: string) => void,
    logout: () => void
};



const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(() => {
        return localStorage.getItem("token")
    });
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("token");
        if (stored) {
            setToken(stored);
        }
    }, []);

    useEffect(() => {
        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            setUser({
                userId: decoded.user_id
            });
        } else {
            setUser(null);
        }
    }, [token]);

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};