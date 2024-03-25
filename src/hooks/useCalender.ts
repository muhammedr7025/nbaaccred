import { CalenderType } from '@/types/tables'
import { supabase } from '@/utils/supbase/supabaseClient'
import React from 'react'
export type calenderHookType = ReturnType<typeof useCalenders>
const useCalenders = () => {
    const [calenders, setCalenders] = React.useState<CalenderType[]>([])

    function fetch() {
        getCalenders().then(setCalenders)
    }
    function reload() {
        reloadCalenders().then(setCalenders)
    }
    function deleter(id: CalenderType['id']) {
        deleteCalender(id).then(reload)
            .catch(err => console.log(err))
    }
    async function add(calender: CalenderType) {
        const res = await addCalender(calender)
        if (res.status === 201) reload()
        return res
    }
    async function update(calender: CalenderType) {
        await updateCalender(calender).then(reload)
    }
    function addBulk(calenders: CalenderType[]) {
        bulkAddCalenders(calenders).then(reload)
    }
    function upload(file: File | null | undefined, data: CalenderType) {
        return uploadCalenderPDF(file, data)
    }
    function updateUpload(file: File | null | undefined, data: CalenderType) {
        return updateCalenderPDF(file, data)
    }
    function download(path: string | undefined | null) {
        if (!path) throw new Error('Path is required')
        return downloadImage(path)
    }
    return {
        data: calenders,
        set: setCalenders,
        delete: deleter,
        reload, fetch, add, update, addBulk, upload, download,
        updatePdf: updateUpload
    }
}

export default useCalenders

async function getCalenders() {
    const calenders = getCalendersFromSessionStorage()
    if (calenders) return calenders
    else return await reloadCalenders()
}
async function reloadCalenders() {
    const calenders = await getCalendersFromDB()
    storeCalendersInSessionStorage(calenders)
    return calenders
}
async function getCalendersFromDB() {
    const res = await supabase.from('calenders').select('*')
    const data: CalenderType[] = res.data ?? []
    return data
}

function storeCalendersInSessionStorage(calenders: CalenderType[]) {
    if (calenders.length === 0) return
    sessionStorage.setItem('calenders', JSON.stringify(calenders))
}
function getCalendersFromSessionStorage() {
    const calenders = sessionStorage.getItem('calenders')
    if (!calenders) return null
    return JSON.parse(calenders)
}

async function deleteCalender(calenderId: CalenderType['id']) {
    if (!calenderId) throw new Error('Calender id is required')
    const res = await supabase.from('calenders').delete().eq('id', calenderId)
    return res
}

async function addCalender(calender: CalenderType) {
    const res = await supabase.from('calenders').insert(calender)
    return res
}

async function updateCalender(calender: CalenderType) {
    const res = await supabase.from('calenders').update(calender).eq('id', calender.id)
    return res
}

async function bulkAddCalenders(calenders: CalenderType[]) {
    const res = await supabase.from('calenders').upsert(calenders, {
        onConflict: 'id'
    })
    return res
}

async function uploadCalenderPDF(file: File | null | undefined, data: CalenderType) {
    console.log('uploading calender pdf')
    if (!file || !data.name) return null
    const fileExt = file.name.split('.').pop()
    const path = `${data.name}.${fileExt}`
    const res = await supabase.storage.from('calenders').upload(path, file)
    if (res.data?.path) return res.data?.path
    else if (res.error) throw res.error
    else return null
}

async function updateCalenderPDF(file: File | null | undefined, data: CalenderType) {
    console.log('updating calender pdf')
    if (!file || !data.name) return null
    const fileExt = file.name.split('.').pop()
    const path = `${data.name}.${fileExt}`
    const deleteRes = await supabase.storage.from('calenders').remove([path])
    if (deleteRes.error) throw deleteRes.error
    const res = await supabase.storage.from('calenders').upload(path, file,)
    if (res.data?.path) return res.data?.path
    else if (res.error) throw res.error
    else return null
}

async function downloadImage(path: string) {
    const res = await supabase.storage.from('calenders').download(path)
    console.log(res)
    if (res.data) {
        const url = URL.createObjectURL(res.data)
        window.open(url)
    }
    else if (res.error) throw res.error
}