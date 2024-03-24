import { supabase } from "@/utils/supbase/supabaseClient";
import { getBatchId, getDepartmentId, getGenderId, getRoleId } from "../students/bulkImport";

export async function bulkImportStaff(data: any) {
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
            const staffData = newData.data.map(async (item: any) => {
                const filteredData = data.find((dataItem: any) => dataItem.email === item.email)
                if (filteredData) {
                    return {
                        is_advisor: filteredData.is_advisor,
                        batch_id: await getBatchId(filteredData.batch),
                        dept_id: await getDepartmentId(filteredData.dept),
                        user_id: item.id,
                    }
                }
            })
            const staffDataList = await Promise.all(staffData)
            const newStaffData = await supabase.from('staff').upsert(staffDataList, { ignoreDuplicates: true, onConflict: 'user_id' }).select('user_id')
        }
    } catch (error) {
        console.log(error)
    }

}