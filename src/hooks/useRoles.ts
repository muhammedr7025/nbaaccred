import { UserRoleType } from '@/types/tables'
import { supabase } from '@/utils/supbase/supabaseClient'
import React from 'react'
export type roleHookType = ReturnType<typeof useRoles>

export const useRoles = () => {
    const [roles, setRoles] = React.useState<UserRoleType[]>()
    const [currentUserRole, setCurrentUserRole] = React.useState<UserRoleType>()

    function fetch() {
        getRoles().then(setRoles)
    }
    function reload() {
        reloadRoles().then(setRoles)
    }

    return { data: roles, set: setRoles, fetch, reload, userRole: currentUserRole, setRole: setCurrentUserRole }
}

async function getRoles() {
    const roles = getRolesFromSessionStorage()
    if (roles) return roles
    else return await reloadRoles()
}
async function reloadRoles() {
    const roles = await getRolesFromDB()
    storeRolesInSessionStorage(roles)
    return roles
}
async function getRolesFromDB() {
    const res = await supabase.from('user_roles').select('*')
    const data: UserRoleType[] = res.data ?? []
    return data
}

function storeRolesInSessionStorage(roles: UserRoleType[]) {
    if (roles.length === 0) return
    sessionStorage.setItem('user_roles', JSON.stringify(roles))
}
function getRolesFromSessionStorage() {
    const roles = sessionStorage.getItem('user_roles')
    if (!roles) return null
    return JSON.parse(roles)
}

async function deleteRoles(rolesId: UserRoleType['id']) {
    if (!rolesId) throw new Error('Roles id is required')
    const res = await supabase.from('user_roles').delete().eq('id', rolesId)
    return res
}

async function addRoles(roles: UserRoleType) {
    const res = await supabase.from('user_roles').insert(roles)
    return res
}

async function updateRoles(roles: UserRoleType) {
    const res = await supabase.from('user_roles').update(roles).eq('id', roles.id)
    return res
}

async function bulkAddRoles(roles: UserRoleType[]) {
    const res = await supabase.from('user_roles').upsert(roles, {
        onConflict: 'id'
    })
    return res
}


