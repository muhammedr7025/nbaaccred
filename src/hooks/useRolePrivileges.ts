import { UserRoleType } from '@/types/tables'
import React from 'react'

export const useRolePrivileges = (role: UserRoleType) => {

}
function accessibleRoutes(role: UserRoleType) {
    switch (role.authorization_level) {
        case 0:
    }
}