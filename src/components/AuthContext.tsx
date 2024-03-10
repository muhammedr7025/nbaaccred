import { batch, department } from "@/utils/supbase/supabase";
import { supabase } from "@/utils/supbase/supabaseClient";
import { AuthResponse, Session } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type auth = {
    email: string,
    password: string,
    name: string,
    mobile: string
    extras?: any
}
type departmentType = department['Row']
type IAuthContext = {
    isLoading: boolean
    session: Session | null
    handleSignIn: (email: string, password: string) => void
    handleSignUp: ({ }: auth) => Promise<AuthResponse>
    signOut: () => void
    batchs: batch['Row'][]
    departments: departmentType[]
    genders: {
        id: number
        name: string
    }
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)
    const [batchs, setBatch] = useState<batch['Row'][]>([])
    const [departments, setDepartments] = useState<any>([])
    const [genders, setGenders] = useState<any>([])
    async function getBatch() {
        supabase
            .from('batch')
            .select('*')
            .then(({ data: batch, error }) => {
                if (error) {
                    console.log(error)
                }
                if (batch) {
                    setBatch(batch)
                }
            })
    }
    async function getDepartments() {
        supabase
            .from('departments')
            .select('id,name',)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    setDepartments(data)
                }
            })
    }
    async function getGenders() {
        supabase
            .from('gender')
            .select('id,name',)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    setGenders(data)
                }
            })
    }
    useEffect(() => {
        if (session) {
            setLoading(false)
            getBatch()
            getDepartments()
            getGenders()
        }
    }, [session])
    useEffect(() => {
        setLoading(true)
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            setLoading(false)
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

    const handleSignUp = async ({ email, password, name, mobile, ...extras }: auth) => {
        return supabase.auth.signUp(
            {
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        phone: mobile,
                        ...extras
                    }
                }
            }
        )
    }
    return (
        <AuthContext.Provider value={{ isLoading, handleSignIn, batchs, departments, handleSignUp, session, signOut, genders }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
