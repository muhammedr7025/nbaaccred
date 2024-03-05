export type staffHeaderType = "Department" | "Name" | "Mobile" | "Email" | "Advisor" | "Batch" | "Action"
export type staffType = {
    department: string
    name: string
    mobile: string
    email: string
    advisor: boolean
    batch: number
    edit: () => void
    delete: () => void
}
export type studentType = {

}