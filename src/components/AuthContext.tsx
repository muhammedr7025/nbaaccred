import { apiClient } from "@/utils/apiClient";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type IAuthContext = {
    isLoggedIn: boolean,
    login: (email: string, password: string) => void,
    logout: () => void,
    register: ({ username, email, password }: { username: string, email: string, password: string }) => void
    user: any
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn')
        const user = localStorage.getItem('user')
        if (isLoggedIn) {
            const value = JSON.parse(isLoggedIn)
            if (value)
                setIsLoggedIn(true);
        }
        if (user) {
            setUser(JSON.parse(user))
        }
    }, [])
    function login(email: string, password: string) {
        apiClient.post('/auth/local', {
            identifier: email,
            password: password
        }).then((res) => {
            setUser(res.data.user)
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('isLoggedIn', JSON.stringify(true))
            localStorage.setItem('token', res.data.jwt)
            setIsLoggedIn(true);
            navigate('/dashboard/student')
        })
            .catch((err) => {
                console.log(err)
            })
    }
    function logout() {
        localStorage.setItem('isLoggedIn', JSON.stringify(false))

        setIsLoggedIn(false)
    }
    function register({ username, email, password }: { username: string, email: string, password: string }) {
        apiClient.post('/auth/local/register', {
            username: username,
            email: email,
            password: password
        })
            .then((res) => {
                login(email, password)
                navigate('/dashboard/student')
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, register, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)