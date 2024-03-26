import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/buttons/default'
import { Input } from '@/components/inputs/input'
import { calenderHookType } from '@/hooks/useCalender'
import { CalenderType } from '@/types/tables'
import { getFormData } from '@/utils/formHandler'
import React from 'react'

export const AddForm = ({ data: dataReceived, close }: any) => {
    const { Calenders } = useAuth()
    return (
        <form onSubmit={handleSubmit(Calenders, close, dataReceived)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' required placeholder='Enter title' defaultValue={dataReceived?.name}>Title</Input>
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
export function DeleteForm({ data, close }: { data: CalenderType, close: () => void }) {
    const { Calenders } = useAuth()
    function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        Calenders.delete(data.id)
        close()
    }
    return (
        <form onSubmit={handleDelete}>
            <div className="flex flex-row flex-wrap gap-4 w-[250px] justify-center mt-8">
                <div className='flex flex-col w-full justify-center pb-3 text-center gap-4'>
                    Do you want to delete?
                    <span className=' font-medium text-center' >{data?.name} </span>
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
function handleSubmit(Calenders: calenderHookType, close: () => void, dataReceived?: CalenderType) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = getFormData<CalenderType>(e)
        const { syllabus_file } = data as any
        if (dataReceived?.calender_url && syllabus_file) data.calender_url = await Calenders.updatePdf(syllabus_file, data)
        else if (syllabus_file) data.calender_url = await Calenders.upload(syllabus_file, data)
        if (dataReceived) Calenders.update({ id: dataReceived?.id, ...filterFormData(data) }).then(close)
        else Calenders.add(filterFormData(data)).then(close)
    }
}

const filterFormData = (data: CalenderType) => {
    return {
        name: data?.name,
        calender_url: data?.calender_url
    }
}
