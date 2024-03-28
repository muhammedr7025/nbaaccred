import React, { useEffect } from 'react'
import { UserHookType } from './useUser'
import { useParams, useLocation, useNavigation, useNavigate, } from 'react-router-dom'
export type privilegeHookType = ReturnType<typeof useRolePrivileges>
export const useRolePrivileges = (User: UserHookType) => {
    // only to be used inside the router components and not in authContext
    const location = useLocation().pathname
    const navigator = useNavigate()
    useEffect(() => {
        const selected = sideNavigationMenu.find(item => item.url === location)
        if (!selected) return navigator(sideNavigationMenu[0]?.url)
    }, [])
    const staffAdvisorMenu = [
        { url: '/dashboard/student', name: 'Student' },
        { url: '/dashboard/subject', name: 'Subject' },
        { url: '/dashboard/calender', name: 'Calender' },
    ]
    const AdminMenu = [
        { url: '/dashboard/batch', name: 'Batch' },
        { url: '/dashboard/department', name: 'Department' },
        { url: '/dashboard/staff', name: 'Staff' }
    ]
    const sideNavigationMenu = [
        ...((User?.role?.authorization_level ?? 100) <= 3 ? staffAdvisorMenu : []),
        ...((User?.role?.authorization_level ?? 100) <= 2 ? AdminMenu : []),
    ]
    return { sideMenu: sideNavigationMenu }
}
