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
    }[]
    roles: {
        id: number
        name: string
    }[]
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isLoading, setLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)
    const [batchs, setBatch] = useState<batch['Row'][]>([])
    const [departments, setDepartments] = useState<any[]>([])
    const [genders, setGenders] = useState<any>([])
    const [roles, setRoles] = useState<any>([])
    async function getBatch() {
        const batchListString = sessionStorage.getItem('batch')
        if (batchListString) {
            const batchList = JSON.parse(batchListString)
            if (batchList.length > 0) {
                setBatch(batchList)
                return
            }
        }
        supabase
            .from('batch')
            .select('*')
            .then(({ data: batch, error }) => {
                if (error) {
                    console.log(error)
                }
                if (batch) {
                    setBatch(batch)
                    sessionStorage.setItem('batch', JSON.stringify(batch))
                }
            })
    }
    async function getDepartments() {
        const deptListString = sessionStorage.getItem('dept')
        if (deptListString) {
            const deptList = JSON.parse(deptListString)
            if (deptList.length > 0) {
                setDepartments(deptList)
                return
            }
        }
        supabase
            .from('departments')
            .select('id,name',)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    setDepartments(data)
                    sessionStorage.setItem('dept', JSON.stringify(data))
                }
            })
    }
    async function getGenders() {
        const genderListString = sessionStorage.getItem('gender')
        if (genderListString) {
            const genderList = JSON.parse(genderListString)
            if (genderList.length > 0) {
                setGenders(genderList)
                return
            }
        }
        supabase
            .from('gender')
            .select('id,name',)
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    setGenders(data)
                    sessionStorage.setItem('gender', JSON.stringify(data))

                }
            })
    }
    async function getRoles() {
        const roleListString = sessionStorage.getItem('role')
        if (roleListString) {
            const roleList = JSON.parse(roleListString)
            if (roleList.length > 0) {
                setRoles(roleList)
                return
            }
        }
        supabase.from('user_roles')
            .select('id,name')
            .then(({ data, error }) => {
                if (error) {
                    console.log(error)
                }
                if (data) {
                    setRoles(data)
                    sessionStorage.setItem('role', JSON.stringify(data))
                }
            })
    }
    useEffect(() => {
        if (session) {
            setLoading(false)
            getBatch()
            getDepartments()
            getGenders()
            getRoles()
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
        const obj = {
            email: email,
            password: password,
            phone: mobile,
            options: {
                data: {
                    name: name,
                    ...extras.extras
                }
            }
        }
        console.log(obj)
        return supabase.auth.signUp(obj)
    }
    return (
        <AuthContext.Provider value={{ isLoading, handleSignIn, batchs, departments, handleSignUp, session, signOut, genders, roles }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
