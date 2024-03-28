import { useAuth } from '@/components/AuthContext'
import { supabase } from '@/utils/supbase/supabaseClient'
import { useEffect, useRef } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
export const DashboardLayout = () => {

    return (
        <IsAuthenticated>
            <div className='flex relative'>
                <SideNavigation />
                <div className=' flex flex-col flex-1 relative'>
                    <TopNavigation />
                    <Outlet />
                </div>
            </div>
        </IsAuthenticated>
    )
}

function IsAuthenticated({ children }: { children: React.ReactNode }): JSX.Element {
    const path = useLocation().pathname
    const { session, isLoading, Roles } = useAuth()
    async function handleVisual() {
        const res = await supabase.from('users').select('user_roles(*)').eq('auth_user_id', session?.user?.id)
        const data = res.data
        if (Array.isArray(data)) {
            Roles.setRole(data[0].user_roles as any)
            sessionStorage.setItem('privilege', JSON.stringify(data[0].user_roles))
        }
    }
    useEffect(() => {
        handleVisual()
    }, [])
    if (isLoading) return <></>
    else if (session) {
        if (path === '/dashboard' || path === '/dashboard/') return <Navigate to="/dashboard/student" />
        switch (Roles.userRole?.authorization_level) {
            case 0: return (<>{children}</>)
            case 1: return (<>{children}</>)
            case 2:
        }
        return (<>{children}</>)
    }
    else return <Navigate to="/login" />
}
const sideNavigationMenu = [
    { url: '/dashboard/student', name: 'Student' },
    { url: '/dashboard/batch', name: 'Batch' },
    { url: '/dashboard/department', name: 'Department' },
    { url: '/dashboard/staff', name: 'Staff' },
    { url: '/dashboard/subject', name: 'Subject' },
    { url: '/dashboard/calender', name: 'Calender' },
]

const TopNavigation = () => {
    const { signOut, } = useAuth()

    const location = useLocation().pathname
    const value = sideNavigationMenu.find(item => item.url === location)
    const ref = useRef<HTMLDivElement>(null)
    return (
        <header className="flex items-center justify-between h-14 px-4 border-b lg:h-20 gap-4 dark:border-gray-800" ref={ref}>
            <div>dasdas</div>
            <h1 className="font-semibold text-lg lg:text-2xl ">{value?.name}</h1>
            <div className='flex items-center gap-2'>
                <button
                    className="relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                    type="button"
                    id="radix-:r0:"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    data-state="closed"
                >
                    <img
                        alt="Avatar"
                        className="rounded-full aspect-square object-cover"
                        height="32"
                        src="https://i.pinimg.com/736x/a1/ba/8c/a1ba8ca957c5e60767d42dce30d94105.jpg"
                        width="32"
                    />
                    <span className="sr-only">Toggle user menu</span>
                </button>
                <span>{''}</span>
                <button onClick={signOut}>Logout</button>
            </div>
        </header>
    )
}
const SideNavigation = () => {
    const location = useLocation().pathname
    const item = sideNavigationMenu.find(item => item.url === location)

    return (
        <aside className={`flex flex-col sticky top-0 h-screen w-40 bg-gray-100 text-gray-800 p-4  overflow-hidden`}
        >
            <div className={`flex items-center mb-4  overflow-hidden`}>
                <h1 className="text-lg font-medium">Dashboard</h1>
            </div>
            <aside className=" flex flex-col gap-2">
                {
                    sideNavigationMenu.map(({ url, name }, index) =>
                        <Link to={url} key={index}>
                            <nav  >
                                <button className={`w-full flex items-center space-x-2 
                             hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 ${item?.url === url ? ' bg-white' : ''} `}>
                                    <span className="text-sm font-medium" >{name}</span>
                                </button>
                            </nav>
                        </Link>
                    )
                }
            </aside>
        </aside>
    )
}

