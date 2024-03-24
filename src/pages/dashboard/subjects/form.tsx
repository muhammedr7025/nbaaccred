import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/buttons/default'
import { Input } from '@/components/inputs/input'
import { subjectHookType } from '@/hooks/useSubjects'
import { SubjectType } from '@/types/tables'
import { getFormData } from '@/utils/formHandler'
import React from 'react'

export const AddForm = ({ data: dataReceived, close }: any) => {
    const { Subjects } = useAuth()
    return (
        <form onSubmit={handleSubmit(Subjects, close, dataReceived)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' required placeholder='Enter title' defaultValue={dataReceived?.name}>Title</Input>
                    <Input id='code' required placeholder='Enter code' defaultValue={dataReceived?.code}>Code</Input>
                </div>
                <div className="flex w-full gap-3">
                    <Input id='syllabus_file' type="file" >{dataReceived?.syllabus_url ? 'Replace ' : ''}Syllabus</Input>
                </div>
                <div className='flex w-full gap-3 py-7'>
                    <Button type='submit' className='flex-1 hover:bg-green-500 hover:text-white active: '>
                        {dataReceived ? 'Update' : 'Add'}
                    </Button>
                    <Button onClick={close} className='flex-1 hover:bg-red-500 hover:text-white '>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    )
}
export function DeleteForm(data: SubjectType) {
    const { Subjects } = useAuth()
    return (
        <form onSubmit={ }>
            <div className="flex flex-row flex-wrap gap-4 w-[250px] justify-center mt-8">
                <div className='flex w-full  justify-center pb-3'>
                    Do you want to delete?
                </div>
                <div className='flex w-full gap-3 '>
                    <Button type='submit' className='flex-1 hover:bg-red-500 hover:text-white active: '>
                        Delete
                    </Button>
                    <Button onClick={close} className='flex-1 hover:bg-green-500 hover:text-white '>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    )
}
function handleSubmit(Subjects: subjectHookType, close: () => void, dataReceived?: SubjectType) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = getFormData<SubjectType>(e)
        const { syllabus_file } = data as any
        if (syllabus_file) data.syllabus_url = await Subjects.upload(syllabus_file, data)
        if (dataReceived) Subjects.update({ id: dataReceived?.id, ...filterFormData(data) }).then(close)
        else Subjects.add(filterFormData(data)).then(close)
    }
}

const filterFormData = (data: SubjectType) => {
    return {
        name: data?.name,
        code: data?.code,
        syllabus_url: data?.syllabus_url
    }
}