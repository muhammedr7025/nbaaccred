import { SubjectType } from '@/types/tables'
import { supabase } from '@/utils/supbase/supabaseClient'
import { error } from 'console'
import React, { useEffect } from 'react'
export type subjectHookType = ReturnType<typeof useSubjects>
const useSubjects = () => {
    const [subjects, setSubjects] = React.useState<SubjectType[]>([])

    function fetch() {
        getSubjects().then(setSubjects)
    }
    function reload() {
        reloadSubjects().then(setSubjects)
    }
    function deleter(id: SubjectType['id']) {
        deleteSubject(id).then(reload)
            .catch(err => console.log(err))
    }
    async function add(subject: SubjectType) {
        const res = await addSubject(subject)
        if (res.status === 201) reload()
        return res
    }
    async function update(subject: SubjectType) {
        await updateSubject(subject).then(reload)
    }
    function addBulk(subjects: SubjectType[]) {
        bulkAddSubjects(subjects).then(reload)
    }
    function upload(file: File | null | undefined, data: SubjectType) {
        return uploadSubjectPDF(file, data)
    }
    function download(path: string | undefined | null) {
        if (!path) throw new Error('Path is required')
        return downloadImage(path)
    }
    return {
        data: subjects, set: setSubjects, delete: deleter,
        reload, fetch, add, update, addBulk, upload, download
    }
}

export default useSubjects

async function getSubjects() {
    const subjects = getSubjectsFromSessionStorage()
    if (subjects) return subjects
    else return await reloadSubjects()
}
async function reloadSubjects() {
    const subjects = await getSubjectsFromDB()
    storeSubjectsInSessionStorage(subjects)
    return subjects
}
async function getSubjectsFromDB() {
    const res = await supabase.from('subjects').select('*')
    const data: SubjectType[] = res.data ?? []
    return data
}

function storeSubjectsInSessionStorage(subjects: SubjectType[]) {
    if (subjects.length === 0) return
    sessionStorage.setItem('subjects', JSON.stringify(subjects))
}
function getSubjectsFromSessionStorage() {
    const subjects = sessionStorage.getItem('subjects')
    if (!subjects) return null
    return JSON.parse(subjects)
}

async function deleteSubject(subjectId: SubjectType['id']) {
    if (!subjectId) throw new Error('Subject id is required')
    const res = await supabase.from('subjects').delete().eq('id', subjectId)
    return res
}

async function addSubject(subject: SubjectType) {
    const res = await supabase.from('subjects').insert(subject)
    return res
}

async function updateSubject(subject: SubjectType) {
    const res = await supabase.from('subjects').update(subject).eq('id', subject.id)
    return res
}

async function bulkAddSubjects(subjects: SubjectType[]) {
    const res = await supabase.from('subjects').upsert(subjects, {
        onConflict: 'id,code'
    })
    return res
}

async function uploadSubjectPDF(file: File | null | undefined, data: SubjectType) {
    if (!file || !data.code) return null
    const fileExt = file.name.split('.').pop()
    const path = `${data.code}.${fileExt}`
    const res = await supabase.storage.from('subjects').upload(path, file)
    if (res.data?.path) return res.data?.path
    else return null
}
async function downloadImage(path: string) {
    const res = await supabase.storage.from('subjects').download(path)
    console.log(res)
    if (res.data) {
        const url = URL.createObjectURL(res.data)
        window.open(url)
    }
    else if (res.error) throw res.error
}