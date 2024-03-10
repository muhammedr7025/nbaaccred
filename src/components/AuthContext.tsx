import { supabase } from "@/utils/supbase/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type IAuthContext = {
    isLoading: boolean
    session: Session | null
    handleSignIn: (email: string, password: string) => void
    handleSignUp: (event: Event) => void
    signOut: () => void
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
type target = {
    value: string
}
type auth = {
    email: target,
    password: target,
    name: target,
    phone: target
}
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        if (session) {
            setLoading(false)
        }
    }, [session])
    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    const signOut = () => {
        supabase.auth.signOut()
        console.log(session, supabase.auth.getSession())
        setSession(null)
    }

    const handleSignIn = async (email: string, password: string) => {
        supabase.auth.signInWithPassword({ email, password })
            .then((data) => {
                setSession(data.data.session)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleSignUp = async (event: Event) => {
        event.preventDefault()
        const { email, password, name, phone }: auth = event.currentTarget as any
        supabase.auth.signUp(
            {
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        name: name.value,
                        phone: phone.value,
                    }
                }
            }
        )
    }
    return (
        <AuthContext.Provider value={{ isLoading, handleSignIn, handleSignUp, session, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
