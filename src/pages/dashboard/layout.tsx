import { useAuth } from '@/components/AuthContext'
import React from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
export const DashboardLayout = () => {
    const { isLoggedIn } = useAuth()
    if (isLoggedIn)
        return (
            <div className='flex'>
                <SideNavigation />
                <div className=' flex flex-col flex-1'>
                    <TopNavigation />
                    <Outlet />
                </div>
            </div>
        )
    else return <Navigate to="/login" />
}

const sideNavigationMenu = [
    { url: '/dashboard/student', name: 'Student' },
    // { url: '/dashboard/batch', name: 'Batch' },
    // { url: '/dashboard/department', name: 'Department' },
    { url: '/dashboard/staff', name: 'Staff' },
]

const TopNavigation = () => {
    const location = useLocation().pathname
    const value = sideNavigationMenu.find(item => item.url === location)
    return (
        <header className="flex items-center justify-between h-14 px-4 border-b lg:h-20 gap-4 dark:border-gray-800">
            <div></div>
            <h1 className="font-semibold text-lg lg:text-2xl ">{value?.name}</h1>
            <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
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
        </header>
    )
}
const SideNavigation = () => {
    const location = useLocation().pathname
    const item = sideNavigationMenu.find(item => item.url === location)

    return (
        <aside className={`flex flex-col sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4  overflow-hidden`}
        >
            <div className={`flex items-center mb-4 space-x-1  overflow-hidden`}

            >
                <h1 className="text-lg font-medium">Dashboard</h1>
            </div>
            {
                sideNavigationMenu.map(({ url, name }, index) =>
                    <Link to={url} key={index}>
                        <nav className="space-y-2" >
                            <button className={`w-full flex items-center space-x-2
                             hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500 ${item?.url === url ? ' bg-white' : ''} `}>
                                <span className="text-sm font-medium" >{name}</span>
                            </button>
                        </nav>
                    </Link>
                )
            }
        </aside>
    )
}

