export type staffHeaderType = "Department" | "Name" | "Mobile" | "Email" | "Advisor" | "Batch" | "Action"
export type staffType = {
    department: string
    name: string
    mobile: string
    email: string
    advisor: boolean
    batch: number
    edit?: () => void
    delete?: () => void
}
export type studentType = {

}

export type BatchType = {
    id?: number
    end_year?: string
    start_year?: string
    created_at?: string
}

export type DepartmentType = {
    code?: string | null
    created_at?: string
    id?: number
    mission_url?: string | null
    name?: string | null
    updated_at?: string | null
    vision_url?: string | null
}


export type SubjectType = {
    code?: string | null
    created_at?: string
    id?: number | string | null
    name?: string | null
    syllabus_url?: string | null
}

export type CalenderType = {
    id?: number | string | null
    name?: string | null
    calender_url?: string | null
}