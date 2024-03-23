import { student } from "@/utils/supbase/supabase";
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
            const studentData = newData.data.map((item: any) => {
                const filteredData = data.find((dataItem: any) => dataItem.email === item.email)

                if (filteredData) {
                    return {
                        adm_no: filteredData.adm_no,
                        physics: filteredData.physics,
                        chemistry: filteredData.chemistry,
                        maths: filteredData.maths,
                        pre_degree: filteredData.pre_degree,
                        keam: filteredData.keam,
                        rank: filteredData.rank,
                        batch_id: filteredData.batch_id,
                        dept_id: filteredData.dept_id,
                    }
                }
            })
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