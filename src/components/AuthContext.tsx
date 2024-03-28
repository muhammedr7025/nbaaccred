import useBatch, { batchHookType } from "@/hooks/useBatch";
import useCalenders, { calenderHookType } from "@/hooks/useCalender";
import useDepartments, { departmentHookType } from "@/hooks/useDepartment";
import { privilegeHookType, useRolePrivileges } from "@/hooks/useRolePrivileges";
import { roleHookType, useRoles } from "@/hooks/useRoles";
import useSubjects, { subjectHookType } from "@/hooks/useSubjects";
import { UserHookType, useUser } from "@/hooks/useUser";
import { getStaff } from "@/pages/dashboard/staff";
import { batch, department } from "@/utils/supbase/supabase";
import { supabase } from "@/utils/supbase/supabaseClient";
import { AuthResponse, Session, User as SupabaseUser } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type auth = {
    email: string,
    password: string,
}
export type departmentType = department['Row']
type IAuthContext = {
    isLoading: boolean

    session: Session | null
    handleSignIn: (email: string, password: string) => void
    handleSignUp: ({ }: auth) => Promise<AuthResponse | any>
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
    staff: {
        get: () => any
        set: React.Dispatch<React.SetStateAction<any>>
    },
    setDepartments: React.Dispatch<React.SetStateAction<departmentType[]>>,
    setBatch: React.Dispatch<React.SetStateAction<batch['Row'][]>>
    Subjects: subjectHookType
    Calenders: calenderHookType
    Batch: batchHookType
    Departments: departmentHookType
    Roles: roleHookType
    User: UserHookType
}
const AuthContext = createContext<IAuthContext>({} as IAuthContext);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const Subjects = useSubjects()
    const Calenders = useCalenders()
    const Batch = useBatch()
    const Departments = useDepartments()
    const Roles = useRoles()
    const [isLoading, setLoading] = useState(true)
    const [session, setSession] = useState<Session | null>(null)
    const [authUser, setAuthUser] = useState<SupabaseUser>()
    const User = useUser(authUser?.id)
    const [batchs, setBatch] = useState<batch['Row'][]>([])
    const [departments, setDepartments] = useState<any[]>([])
    const [genders, setGenders] = useState<any>([])
    const [roles, setRoles] = useState<any>([])
    const [staffList, setStaff] = useState<any>([])
    const staff = {
        get: () => staffList,
        set: setStaff
    }
    useEffect(() => {
        if (session && !authUser) {
            setAuthUser(session.user)
            setLoading(false)
            Batch.fetch()
            Departments.fetch()
            Roles.fetch()
            getGenders().then(setGenders)
            getStaff().then(staff.set)
        }
    }, [session])
    useEffect(() => {
        if (session) return
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

    const handleSignUp = async ({ email, password, }: auth) => {
        const { data, error } = await checkIfUserExists(email)
        if (error) {
            console.error(error)
            return
        }
        else if (data) {
            return supabase.auth.signUp({
                email,
                password
            })
        }
        else return
    }
    return (
        <AuthContext.Provider value={{
            Subjects, Calenders, Batch, Departments, Roles, User,
            isLoading,
            handleSignIn, handleSignUp, signOut,
            session,
            batchs, departments,
            genders, roles,
            staff, setDepartments,
            setBatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export async function getDepartments() {
    const deptListString = sessionStorage.getItem('dept')
    if (deptListString) {
        const deptList = JSON.parse(deptListString)
        if (deptList.length > 0) {
            return Promise.resolve(deptList)
        }
    }
    return getDepartmentsFromDB()

}
export async function getDepartmentsFromDB() {
    return supabase
        .from('departments')
        .select('*',)
        .then(({ data, error }) => {
            if (error) {
                console.log(error)
                return []
            }
            if (data) {
                sessionStorage.setItem('dept', JSON.stringify(data))
                return data
            }
        })
}
async function getBatch() {
    const batchListString = sessionStorage.getItem('batch')
    if (batchListString) {
        const batchList = JSON.parse(batchListString)
        if (batchList.length > 0) {

            return Promise.resolve(batchList)
        }
    }
    return getBatchFromDB()
}
export async function getBatchFromDB() {
    return supabase
        .from('batch')
        .select('*')
        .then(({ data: batch, error }) => {
            if (error) {
                console.log(error)
            }
            if (batch) {
                sessionStorage.setItem('batch', JSON.stringify(batch))
                return batch
            }
        })
}
async function getGenders() {
    const genderListString = sessionStorage.getItem('gender')
    if (genderListString) {
        const genderList = JSON.parse(genderListString)
        if (genderList.length > 0) {

            return Promise.resolve(genderList)
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
                sessionStorage.setItem('gender', JSON.stringify(data))
                return data
            }
        })
}
async function getRoles() {
    const roleListString = sessionStorage.getItem('role')
    if (roleListString) {
        const roleList = JSON.parse(roleListString)
        if (roleList.length > 0) {

            return Promise.resolve(roleList)
        }
    }
    supabase.from('user_roles')
        .select('id,name')
        .then(({ data, error }) => {
            if (error) {
                console.log(error)
            }
            if (data) {
                sessionStorage.setItem('role', JSON.stringify(data))
                return data
            }
        })
}

function checkIfUserExists(email: string) {
    return supabase.from('users')
        .select('id')
        .eq('email', email)
        .single()

}