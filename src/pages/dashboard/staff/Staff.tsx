import { DownloadIcon } from '@/assets/SvgTsx/download'
import { Pagination } from '@/components/Pagination'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { staffHeaderType } from '@/types/tables'
import { BoxLayout } from '../boxLayout'
import { useModal } from '@/components/modal'
import { Input } from '@/components/inputs/input'
import { Option, Select } from '@/components/select/select'
import { supabase } from '@/utils/supbase/supabaseClient'
import { useAuth } from '@/components/AuthContext'
import React from 'react'

const header: staffHeaderType[] = ["Department", "Name", "Mobile", "Email", "Advisor",
    //  "Batch", 
    // "Action"
]

export const Staff = () => {
    const { staff: staffList } = useAuth()
    const { Modal, open, close } = useModal({ fadeTime: 300, title: "Add Staff" })
    const staff = staffList.get()
    function ModalLayout() {
        return (
            <Modal  >
                <ModalBox close={close} />
            </Modal>
        )
    }
    return (
        <BoxLayout
            topBar={
                <TopBarSection openModal={open} />
            }
            table={
                <TableSection staff={staff} />
            }
            pagination={
                <Pagination start={1} total={5} />
            }
            modal={<ModalLayout />}
        />

    )
}
const TopBarSection = ({ openModal }: { openModal: () => void }) => {
    const { staff } = useAuth()
    function getStaff() {
        getStaffFromDB().then(staff.set)
    }
    return (
        <TopBar name='Staff' >
            <Button onClick={getStaff}>Reload</Button>
            <Button onClick={openModal}>Add Staff</Button>
            <Button>Import</Button>
            <Button className='flex gap-2'>
                <DownloadIcon />
                CSV
            </Button>
        </TopBar>
    )
}
const ModalBox = ({ close }: { close: () => void }) => {
    const { departments, genders, roles, staff } = useAuth()
    function closer() {
        close()
        getStaff()
    }
    function getStaff() {
        getStaffFromDB().then(staff.set)
    }
    return (
        <form onSubmit={handleSubmit(roles, closer)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' placeholder='Enter name'>Name</Input>
                    <Input id='email' placeholder='Enter email' >Email</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='mobile' placeholder='Enter mobile'>Mobile</Input>
                    <Select id='gender' header='Gender' >
                        {genders.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name.toUpperCase()}</Option>)}

                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    <Select id='department' header='Department'>
                        {departments.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name}</Option>)}
                    </Select>

                    <Select id='advisor' header='Is Advisor' >
                        <Option selected>No</Option>
                        <Option>Yes</Option>
                    </Select>
                </div>
                <div className='flex w-full gap-3 py-7'>
                    <Button className='flex-1 hover:bg-green-500 hover:text-white active: '>
                        Save
                    </Button>
                    <Button className='flex-1 hover:bg-red-500 hover:text-white '>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    )
}
const TableSection = ({ staff }: any) => {

    return (
        <Table>
            <Thead>
                <THeadRow>
                    {header.map((item, index) => <THeadCell key={index}>{item}</THeadCell>)}
                </THeadRow>
            </Thead>
            <TBody>
                {staff.map((item: any) => {
                    if (item)
                        return (
                            <TBodyRow key={item.id}>
                                <TBodyCell>{item.dept}</TBodyCell>
                                <TBodyCell className='font-semibold'>{item.name}</TBodyCell>
                                <TBodyCell>{item.phone}</TBodyCell>
                                <TBodyCell>{item.email}</TBodyCell>
                                <TBodyCell>{item.is_advisor ? "Yes" : "No"}</TBodyCell>
                                {/* <TBodyCell className='flex gap-2 '>
                                    <button onClick={item.edit}>Edit</button>
                                    <button onClick={item.delete}>Delete</button>
                                </TBodyCell> */}
                            </TBodyRow>
                        )
                    else <></>
                })}
            </TBody>
        </Table>
    )
}

export async function getStaff() {
    const data = sessionStorage.getItem('staff')
    if (data) {
        const staff = JSON.parse(data)
        return Promise.resolve(staff)
    }
    return getStaffFromDB()
}
async function getStaffFromDB() {
    return supabase.from('staff').select(`is_advisor,users(name,phone,email),departments(code)`)
        .then((res: any) => {
            const data = res.data.map((item: any) => ({
                ...item,
                name: item.users.name,
                phone: item.users.phone,
                email: item.users.email,
                dept: item.departments.code
            }))
            if (data.length > 0)
                sessionStorage.setItem('staff', JSON.stringify(data))
            return data
        })
}
function handleSubmit(roles: any, closer: () => void) {
    return (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const e: any = event
        const userData = {
            name: e.currentTarget['name'].value as string,
            email: e.currentTarget['email']?.value as string,
            phone: e.currentTarget['mobile']?.value as string,
            gender: e.currentTarget['gender'].options[e.currentTarget['gender'].selectedIndex].id as string,
            role_id: roles.find((role: any) => role.name === "staff")?.id
        }
        const data = {
            dept_id: e.currentTarget['department'].options[e.currentTarget['department'].selectedIndex].id as string,
            is_advisor: e.currentTarget['advisor'].options[e.currentTarget['advisor'].selectedIndex].value?.toLowerCase() === "yes" ? true : false,
        }
        supabase
            .from('users')
            .insert(userData)
            .select('id')
            .then(addStaff(data, closer))
    }
}
function addStaff(data: any, closer: () => void) {
    return (res: any) => {
        const userId = res ? res.data[0].id : null
        if (userId)
            supabase.from('staff')
                .insert(staffData(userId, data))
                .select('user_id')
                .then(addIfAdvisor(data.is_advisor, userId, closer))
    }
}
function addIfAdvisor(is_advisor: boolean, userId: string, closer: () => void) {
    return (res: any) => {
        if (res) {
            if (is_advisor)
                supabase.from('advisors')
                    .insert({ user_id: userId })
                    .select('user_id')
                    .then(closer)
            else closer()
        }
    }
}
function staffData(userId: string, data: any) {
    return ({
        ...data,
        user_id: userId
    })
}