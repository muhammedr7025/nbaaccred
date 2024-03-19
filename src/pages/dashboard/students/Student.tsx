import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { BoxLayout } from '../boxLayout'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
// import { DownloadIcon } from '@/assets/SvgTsx/download'
import { Pagination } from '@/components/Pagination'
import { Input } from '@/components/inputs/input'
import { Option, Select } from '@/components/select/select'
import { useModal } from '@/components/modal'
import React, { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { supabase } from '@/utils/supbase/supabaseClient'

const header = ["Reg.No", "Name", "Adm.No", "Gender", "Physics", "Chemistry", "Maths", "Average", "Higher Secondary", "KEAM", "College Rank", "Batch", "Department", "Proof", "Remark",
    // "Action"
]
export const Student = () => {
    const { Modal, open, close, } = useModal({ fadeTime: 300, title: "Add Staff" })
    const [students, setStudent] = React.useState<any[]>([])
    useEffect(() => {
        getStudents().then(setStudent)
    }, [])

    return (
        <>
            <BoxLayout
                topBar={<TopBar name='Staff'>
                    <Button onClick={open}>Add Student</Button>
                    {/* <Button>Import</Button>
                    <Button className='flex gap-2'>
                        <DownloadIcon />
                        CSV
                    </Button> */}
                </TopBar>}
                table={
                    <Table>
                        <Thead>
                            <THeadRow>
                                {header.map((item, index) => <THeadCell key={index}>{item}</THeadCell>)}
                            </THeadRow>
                        </Thead>
                        <TBody>
                            {students?.map((item: any) => {
                                if (item)
                                    return (<TBodyRow key={item.id}>
                                        <TBodyCell>{item.reg_no}</TBodyCell>
                                        <TBodyCell className='font-semibold'>{item.name}</TBodyCell>
                                        <TBodyCell className=''>{item.adm_no}</TBodyCell>

                                        <TBodyCell>{item.gender}</TBodyCell>
                                        <TBodyCell>{item.physics}</TBodyCell>
                                        <TBodyCell>{item.chemistry}</TBodyCell>
                                        <TBodyCell>{item.maths}</TBodyCell>
                                        <TBodyCell>{((item.maths + item.chemistry + item.physics) / 3).toFixed(2)}</TBodyCell>
                                        <TBodyCell>{item.pre_degree}</TBodyCell>
                                        <TBodyCell>{item.keam}</TBodyCell>
                                        <TBodyCell>{item.rank}</TBodyCell>
                                        <TBodyCell>{item.batch}</TBodyCell>
                                        <TBodyCell>{item.department}</TBodyCell>
                                        <TBodyCell>{''}</TBodyCell>
                                        <TBodyCell>{''}</TBodyCell>

                                        <TBodyCell className='flex gap-2 '>
                                            <></>
                                            {/* <button>Edit</button>
                                            <button>Delete</button> */}
                                        </TBodyCell>
                                    </TBodyRow>)
                                else return <TBodyRow><></></TBodyRow>
                            })}
                        </TBody>
                    </Table>
                }
                pagination={<Pagination start={1} total={5} />}
                modal={<Modal><ModalBox close={close} setStudent={setStudent} /></Modal>}
            /></>
    )
}
const ModalBox = ({ close, setStudent }: { close: () => void, setStudent: React.Dispatch<React.SetStateAction<any[]>> }) => {
    const { batchs, departments, genders, roles } = useAuth()

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const e: any = event
        const userData = {
            name: e.currentTarget['name'].value as string,
            email: e.currentTarget['email']?.value as string,
            phone: e.currentTarget['mobile']?.value as string,
            gender: e.currentTarget['gender'].options[e.currentTarget['gender'].selectedIndex].id as string,
            role_id: roles.find((role) => role.name === "student")?.id
        }
        const data = {
            reg_no: e.currentTarget['reg_no'].value as string,
            adm_no: e.currentTarget['adm_no'].value as string,
            physics: e.currentTarget['physics'].value as string,
            chemistry: e.currentTarget['chemistry'].value as string,
            maths: e.currentTarget['maths'].value as string,
            pre_degree: e.currentTarget['higher_secondary'].value as string,
            keam: e.currentTarget['keam'].value as string,
            rank: e.currentTarget['rank'].value as string,
            batch_id: e.currentTarget['batch'].options[e.currentTarget['batch'].selectedIndex].id as string,
            dept_id: e.currentTarget['department'].options[e.currentTarget['department'].selectedIndex].id as string,
        }
        const studentData = (userId: string) => ({
            ...data,
            user_id: userId
        })
        supabase
            .from('users')
            .insert(userData)
            .select('id')
            .then((res: any) => {
                const userId = res.data[0].id
                supabase.from('students')
                    .insert(studentData(userId))
                    .then(({ status, }) => {
                        if (status === 201) {
                            close()
                            getStudents().then(setStudent)
                        }
                    })
            })
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' required placeholder='Enter name'>Name</Input>
                    <Input id='email' required placeholder='Enter email' >Email</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='reg_no' required placeholder='Enter registration number'>Registration No.</Input>
                    <Input id='adm_no' required placeholder='Enter admission number' >Admission No. </Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='mobile' required placeholder='Enter mobile'>Mobile</Input>

                    <Select id='gender' header='Gender' >
                        {genders?.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name.toUpperCase()}</Option>)}

                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    <Select id='department' header='Department'>
                        {departments?.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name}</Option>)}
                    </Select>
                    <Select id='batch' header='Batch' placeholder='Selector' >
                        {
                            batchs?.map((item) => <Option id={`${item.id}`} key={item.id} >{item.start_year + ' - ' + item.end_year}</Option>)
                        }
                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='physics' placeholder='Enter marks'>Physics</Input>
                    <Input id='maths' placeholder='Enter marks'>Maths</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='chemistry' placeholder='Enter marks'>Chemistry</Input>
                    <Input id='higher_secondary' placeholder='Enter higher secondary score'>Higher Secondary</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='rank' placeholder='Enter college rank'>Rank</Input>
                    <Input id='keam' placeholder='Enter KEAM score'>KEAM</Input>
                </div>
                <div className='flex w-full gap-3 py-7'>
                    <Button type='submit' className='flex-1 hover:bg-green-500 hover:text-white active: '>
                        Save
                    </Button>
                    <Button onClick={close} className='flex-1 hover:bg-red-500 hover:text-white '>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>

    )
}
async function getStudents() {
    return supabase.from('students').select(`*,users(name,gender(name),phone),batch(start_year,end_year),departments(name)`)
        .then((res: any) => {
            return (res.data.map((item: any) => ({
                ...item,
                name: item.users.name,
                gender: item.users.gender.name,
                batch: item.batch.start_year + "-" + item.batch.end_year,
                department: item.departments.name,
                phone: item.users.phone,
            })))
        })
}