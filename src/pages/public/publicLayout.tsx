import { useAuth } from "@/components/AuthContext"
import { Navigate, Outlet } from "react-router-dom"

export function PublicLayout() {
    return (
        <IsNotAuthernticated>
            <Outlet />
        </IsNotAuthernticated>
    )
}


export function IsNotAuthernticated({ children }: { children: React.ReactNode }): JSX.Element {
    const { isLoading, session } = useAuth()
    if (session && isLoading) return <></>
    else if (session) return <Navigate to="/dashboard/student" />
    else return (
        <>
            {children}
        </>
    )
}