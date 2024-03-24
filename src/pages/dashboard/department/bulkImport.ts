import { supabase } from "@/utils/supbase/supabaseClient";

export async function bulkImportdepartments(data: any) {
    try {
        const departmentsData = data.map((item: any) => ({
            name: item.name,
            code: item.code,
            mission_url: item.mission_url,
            vision_url: item.vision_url,
        })
        )
        const newData = await supabase.from('departments').upsert(departmentsData, { ignoreDuplicates: true, onConflict: 'code' }).select('code')
    } catch (error) {
        console.log(error)
    }

}