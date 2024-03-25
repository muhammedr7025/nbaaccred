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

export type batchType = {}

export type departmentType = {}


export type SubjectType = {
    code?: string | null
    created_at?: string
    id?: number | string | null
    name?: string | null
    syllabus_url?: string | null
}