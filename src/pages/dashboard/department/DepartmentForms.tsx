import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/buttons/default'
import { Input } from '@/components/inputs/input'
import { departmentHookType } from '@/hooks/useDepartment'
import { DepartmentType } from '@/types/tables'

import { getFormData } from '@/utils/formHandler'
import React from 'react'
export function AddEditForm({ data: dataReceived, close }: any) {
    const { Departments } = useAuth()
    return (
        <form onSubmit={handleSubmit(Departments, close, dataReceived)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className="flex w-full gap-3">
                    <Input placeholder="Enter name" defaultValue={dataReceived?.name} id="name">Name</Input>
                    <Input placeholder="Enter name" defaultValue={dataReceived?.code} id="code">Code</Input>
                </div>
                <div className="flex w-full gap-3">
                    <Input type="file" id="mission_file">{dataReceived?.mission_url ? 'Add New ' : ''}Mission</Input>
                    <Input type="file" id="vision_file" >{dataReceived?.vision_url ? 'Add New ' : ''}Vision</Input>
                </div>
                <div className="flex w-full gap-3 py-7">
                    <Button className="flex-1 hover:bg-green-500 hover:text-white active: " type="submit">
                        Save
                    </Button>
                    <Button className="flex-1 hover:bg-red-500 hover:text-white " onClick={close}>
                        Cancel
                    </Button></div>
            </div>
        </form>
    )
}
function handleSubmit(Departments: departmentHookType, close: () => void, dataReceived?: DepartmentType) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = getFormData<DepartmentType>(e)
        const { mission_file, vision_file } = formData as any
        if (dataReceived?.mission_url && mission_file) formData.mission_url = await Departments.updatePdf(mission_file, dataReceived, 'mission')
        else if (mission_file) formData.mission_url = await Departments.upload(mission_file, filterFormData(formData), 'mission')
        if (dataReceived?.vision_url && vision_file) formData.vision_url = await Departments.updatePdf(vision_file, dataReceived, 'vision')
        else if (vision_file) formData.vision_url = await Departments.upload(vision_file, filterFormData(formData), 'vision')
        if (dataReceived) Departments.update({ id: dataReceived?.id, ...filterFormData(formData) }).then(close)
        else Departments.add(filterFormData(formData)).then(close)
    }
}
const filterFormData = (data: DepartmentType): DepartmentType => {
    return {
        name: data?.name,
        code: data?.code,
        mission_url: data?.mission_url,
        vision_url: data?.vision_url,
    }
}
