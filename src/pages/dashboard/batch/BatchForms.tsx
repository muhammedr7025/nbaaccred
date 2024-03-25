import { useAuth } from "@/components/AuthContext";
import { Button } from "@/components/buttons/default";
import { Option, Select } from "@/components/select/select";
import { batchHookType } from "@/hooks/useBatch";
import { BatchType } from "@/types/tables";
import { getFormData } from "@/utils/formHandler";

const currentYear = new Date().getFullYear() as number
const startYears = Array.from({ length: 25 }, (_, i) => currentYear + 5 - i)
const endYears = Array.from({ length: 25 }, (_, i) => currentYear - 10 + i)

export function DeleteForm({ data, close }: { data: BatchType, close: () => void }) {
    const { Batch } = useAuth()
    function handleDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        Batch.delete(data.id)
        close()
    }
    return (
        <form onSubmit={handleDelete}>
            <div className="flex flex-row flex-wrap gap-4 w-[250px] justify-center mt-8">
                <div className='flex flex-col w-full justify-center pb-3 text-center gap-4'>
                    Do you want to delete?
                    <span className='font-medium text-center' >{data?.start_year} - {data?.end_year} </span>
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

export const AddForm = ({ data: dataReceived, close }: { data?: BatchType, close: () => void }) => {
    const { Batch } = useAuth()
    return (
        <form onSubmit={handleSubmit(Batch, close, dataReceived)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Select header="Start Year" id="start_year" defaultValue={dataReceived?.start_year ?? currentYear}>
                        {startYears.map((item, index) => <Option key={index} value={item} >{item}</Option>)}
                    </Select>
                    <Select header="End Year" id="end_year" defaultValue={dataReceived?.end_year ?? currentYear + 4}>
                        {endYears.map((item, index) => <Option key={index} value={item} >{item}</Option>)}
                    </Select>
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
function handleSubmit(Batch: batchHookType, close: () => void, dataReceived?: BatchType) {
    return async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = getFormData<BatchType>(e)
        if (dataReceived) Batch.update({ id: dataReceived?.id, ...filterFormData(data) }).then(close)
        else Batch.add(filterFormData(data)).then(close)
    }
}
function filterFormData(data: any) {
    return {
        start_year: data?.start_year.value,
        end_year: data?.end_year.value,
        updated_at: new Date().toISOString(),
    }
}

