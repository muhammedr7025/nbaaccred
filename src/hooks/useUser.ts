import { UserType } from "@/types/tables"
import { supabase } from "@/utils/supbase/supabaseClient"
import React, { useEffect } from "react"
import { useRoles } from "./useRoles"
export type UserHookType = ReturnType<typeof useUser>
export const useUser = (authUserId: string | undefined) => {
    const Roles = useRoles()
    const [user, setUser] = React.useState<UserType>()
    const role = Roles.data?.find(role => user?.role_id === role.id)
    useEffect(() => {
        if (!Roles.data) Roles.fetch()
    }, [])
    useEffect(() => {
        if (!user) {
            getUserData(authUserId).then(setUser)
        }
    }, [authUserId])
    return { data: user, set: setUser, role }
}

async function getUserData(authUserId: string | undefined) {
    if (!authUserId) return
    const res = await supabase.from('users').select('*').eq('auth_user_id', authUserId)
    const data: UserType = res.data?.[0] ?? {}
    return data
}
