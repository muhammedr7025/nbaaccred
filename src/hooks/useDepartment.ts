import { DepartmentType } from '@/types/tables'
import { supabase } from '@/utils/supbase/supabaseClient'
import React from 'react'
export type departmentHookType = ReturnType<typeof useDepartments>
const useDepartments = () => {
    const [departments, setDepartments] = React.useState<DepartmentType[]>([])

    function fetch() {
        getDepartments().then(setDepartments)
    }
    function reload() {
        reloadDepartments().then(setDepartments)
    }
    function deleter(id: DepartmentType['id']) {
        deleteDepartment(id).then(reload)
            .catch(err => console.log(err))
    }
    async function add(department: DepartmentType) {
        const res = await addDepartment(department)
        if (res.status === 201) reload()
        return res
    }
    async function update(department: DepartmentType) {
        await updateDepartment(department).then(reload)
    }
    function addBulk(departments: DepartmentType[]) {
        bulkAddDepartments(departments).then(reload)
    }
    function upload(file: File | null | undefined, data: DepartmentType, bucketName: string) {
        return uploadDepartmentPDF(file, bucketName, data)
    }
    function updateUpload(file: File | null | undefined, data: DepartmentType, bucketName: string) {
        return updateDepartmentPDF(file, bucketName, data)
    }
    function download(path: string | undefined | null, bucketName: string) {
        if (!path) throw new Error('Path is required')
        return downloadImage(path, bucketName)
    }
    return {
        data: departments,
        set: setDepartments,
        delete: deleter,
        reload, fetch, add, update, addBulk, upload, download,
        updatePdf: updateUpload
    }
}

export default useDepartments

async function getDepartments() {
    const departments = getDepartmentsFromSessionStorage()
    if (departments) return departments
    else return await reloadDepartments()
}
async function reloadDepartments() {
    const departments = await getDepartmentsFromDB()
    storeDepartmentsInSessionStorage(departments)
    return departments
}
async function getDepartmentsFromDB() {
    const res = await supabase.from('departments').select('*')
    const data: DepartmentType[] = res.data ?? []
    return data
}

function storeDepartmentsInSessionStorage(departments: DepartmentType[]) {
    if (departments.length === 0) return
    sessionStorage.setItem('dept', JSON.stringify(departments))
}
function getDepartmentsFromSessionStorage() {
    const departments = sessionStorage.getItem('dept')
    if (!departments) return null
    return JSON.parse(departments)
}

async function deleteDepartment(departmentId: DepartmentType['id']) {
    if (!departmentId) throw new Error('Department id is required')
    const res = await supabase.from('departments').delete().eq('id', departmentId)
    return res
}

async function addDepartment(department: DepartmentType) {
    const res = await supabase.from('departments').insert(department)
    return res
}

async function updateDepartment(department: DepartmentType) {
    const res = await supabase.from('departments').update(department).eq('id', department.id)
    return res
}

async function bulkAddDepartments(departments: DepartmentType[]) {
    const res = await supabase.from('departments').upsert(departments, {
        onConflict: 'id,code'
    })
    return res
}

async function uploadDepartmentPDF(file: File | null | undefined, bucketName: string, data: DepartmentType) {
    if (!file || !data.code) return null
    const fileExt = file.name.split('.').pop()
    const path = `${data.code}.${fileExt}`
    const res = await supabase.storage.from(bucketName).upload(path, file)
    if (res.data?.path) return res.data?.path
    else if (res.error) throw res.error
    else return null
}

async function updateDepartmentPDF(file: File | null | undefined, bucketName: string, data: DepartmentType) {
    if (!file || !data.code) return null
    const fileExt = file.name.split('.').pop()
    const prevFileExt = (bucketName === 'mission' ? data.mission_url : data.vision_url)?.split('.').pop()
    const deletePath = `${data.code}.${prevFileExt}`
    const path = `${data.code}.${fileExt}`
    const deleteRes = await supabase.storage.from(bucketName).remove([deletePath])
    if (deleteRes.error) console.log(deleteRes.error)
    const res = await supabase.storage.from(bucketName).upload(path, file)
    if (res.data?.path) return res.data?.path
    else if (res.error) throw res.error
    else return null
}

async function downloadImage(path: string, bucketName: string) {
    const res = await supabase.storage.from(bucketName).download(path)
    if (res.data) {
        const url = URL.createObjectURL(res.data)
        window.open(url)
    }
    else if (res.error) throw res.error
}