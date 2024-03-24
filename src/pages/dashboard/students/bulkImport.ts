import { supabase } from "@/utils/supbase/supabaseClient";

export async function bulkImportStudent(data: any) {
    console.log(data)
    try {
        const role_id = await getRoleId('student')
        const promises = data.map(
            async (item: any) => ({
                name: item.name,
                email: item.email,
                phone: item.mobile,
                gender: await getGenderId(item.gender),
                role_id: role_id
            })
        )
        const userData = await Promise.all(promises);
        const newData = await supabase.from('users').upsert(userData, { ignoreDuplicates: true, onConflict: 'email' }).select('id,email')
        if (newData?.data) {
            const studentData = newData.data.map(async (item: any) => {
                const filteredData = data.find((dataItem: any) => dataItem.email === item.email)
                if (filteredData) {
                    return {
                        adm_no: filteredData.adm_no,
                        reg_no: filteredData.reg_no,
                        physics: filteredData.physics,
                        chemistry: filteredData.chemistry,
                        maths: filteredData.maths,
                        pre_degree: filteredData.pre_degree,
                        keam: filteredData.keam,
                        rank: filteredData.clg_rank,
                        batch_id: await getBatchId(filteredData.batch),
                        dept_id: await getDepartmentId(filteredData.dept),
                        user_id: item.id,
                    }
                }
            })
            const studentDataList = await Promise.all(studentData)
            const newStudentData = await supabase.from('students').upsert(studentDataList, { ignoreDuplicates: true, onConflict: 'user_id,rank' }).select('')
        }
    } catch (error) {
        console.log(error)
    }

}
async function getRoleId(roleName: string) {
    const roles = sessionStorage.getItem('role')
    if (roles) {
        const roleList = JSON.parse(roles)
        const role = roleList.find((role: any) => role.name === roleName)
        if (role)
            return role.id

    }
    const res: any = await supabase.from('user_roles').select('id').eq('name', `%${roleName}%`)
    sessionStorage.setItem('role', JSON.stringify(res.data))
    const role_id = res.data[0].id
    return role_id

}
async function getGenderId(gender: string) {
    const genders = sessionStorage.getItem('gender')
    if (genders) {
        const genderList = JSON.parse(genders)
        const genderData = genderList.find((genderObj: any) => genderObj.name.toLowerCase() === gender.toLowerCase())
        if (genderData) {
            return genderData.id
        }
    }
    const res: any = await supabase.from('gender').select('id').ilike('name', `%${gender}%`)
    sessionStorage.setItem('gender', JSON.stringify(res.data))
    const gender_id = res.data[0].id
    return gender_id
}
export async function getDepartmentId(deptCode: string) {
    console.log(deptCode)
    const departments = sessionStorage.getItem('dept')
    if (departments) {
        const deptList = JSON.parse(departments)
        const dept = deptList.find((dept: any) => dept.code?.toLowerCase() === deptCode?.toLowerCase())
        console.log(dept)
        if (dept)
            return dept.id
    }
    const res: any = await supabase.from('departments').select('id').ilike('code', `%${deptCode.toLowerCase()}%`)
    console.log(res.data)
    sessionStorage.setItem('dept', JSON.stringify(res.data))
    const dept_id = res.data[0].id
    return dept_id
}

export async function getBatchId(years: string) {
    const noSpaceYears = years.replace(/ /g, '');
    const [start_year, end_year] = noSpaceYears.split('-')

    const batches = sessionStorage.getItem('batch')
    if (batches) {
        const batchList = JSON.parse(batches)
        console.log(batchList, start_year, end_year)
        const batch = batchList.find((batch: any) => batch.start_year === start_year)
        console.log(batch)
        if (batch)
            return batch.id
    }
    const res: any = await supabase.from('batch').select('id').ilike('start_year', `%${start_year}%`)
    sessionStorage.setItem('batch', JSON.stringify(res.data))
    const batch_id = res.data[0].id
    return batch_id

}