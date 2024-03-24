import { Pagination } from '@/components/Pagination'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { staffHeaderType, } from '@/types/tables'
import { BoxLayout } from '../boxLayout'
import { useModal } from '@/components/modal'
import { Input } from '@/components/inputs/input'
import { Option, Select } from '@/components/select/select'
import { supabase } from '@/utils/supbase/supabaseClient'
import { useAuth } from '@/components/AuthContext'
import React from 'react'
import { createPortal } from 'react-dom'
import deleteIcon from '@assets/svg/deleteIcon.svg'
import { Helmet } from 'react-helmet'
import { convertCsvToJson } from '@/utils/convertCsvToJson'
import { bulkImportStaff } from './bulkImport'

const header: staffHeaderType[] = ["Name", "Mobile", "Email", "Advisor", "Department",
    "Batch",
    "Action"
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
        <>
            <Helmet>
                <title>Staff</title>
                <meta name="description" content="Staff List" />
            </Helmet>
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

        </>
    )
}
const TopBarSection = ({ openModal }: { openModal: () => void }) => {
    const { staff } = useAuth()
    function getStaff() {
        getStaffFromDB().then(staff.set)
    }
    const { Modal: ModalImport, open: openImport, close: closeImport } = useModal({ fadeTime: 300, title: "Import Student Data" })

    return (
        <TopBar name='Staff' >
            <Button onClick={getStaff}>Reload</Button>
            <Button onClick={openModal}>Add Staff</Button>
            <Button onClick={openImport}>Import</Button>
            {createPortal(
                <ModalImport>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        const file = e.currentTarget['import'].files[0]
                        convertCsvToJson(file).then((data) => {
                            bulkImportStaff(data)
                        })
                    }} className='flex flex-col gap-3 pt-5'>
                        <Input name='import' type="file" />
                        <Button type='submit'>Import</Button>
                    </form>
                </ModalImport>
                ,
                document.body
            )}
            {/* <Button className='flex gap-2'>
                <DownloadIcon />
                CSV
            </Button> */}
        </TopBar>
    )
}
const ModalBox = ({ close }: { close: () => void }) => {
    const [isAdvisor, setIsAdvisor] = React.useState(false)
    const { departments, genders, roles, staff, batchs } = useAuth()
    function closer() {
        close()
        getStaff()
    }
    function getStaff() {
        getStaffFromDB().then(staff.set)
    }
    function handleIsAdvisor(e: React.ChangeEvent<HTMLSelectElement>) {
        setIsAdvisor(e.target.value.toLowerCase() === "yes")
    }
    return (
        <form onSubmit={handleSubmit(roles, closer)}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' placeholder='Enter name' required>Name</Input>
                    <Input id='email' placeholder='Enter email' required>Email</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='mobile' placeholder='Enter mobile' required>Mobile</Input>
                    <Select id='gender' header='Gender' >
                        {genders?.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name.toUpperCase()}</Option>)}

                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    <Select id='department' header='Department' required >
                        {departments?.map((item) => <Option id={`${item?.id}`} key={item?.id} >{item?.name}</Option>)}
                    </Select>

                    <Select id='advisor' header='Is Advisor' onChange={handleIsAdvisor} defaultValue={'no'}>
                        <Option value='yes' >Yes</Option>
                        <Option value='no'>No</Option>
                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    {isAdvisor && <Select id='batch' header='Batch Incharge' required={isAdvisor}>
                        {batchs?.map((item) => <Option id={`${item?.id}`} key={item?.id} >{`${item.start_year}-${item.end_year}`}</Option>)}
                    </Select>}
                    <div className='flex flex-1'></div>
                </div>
                <div className='flex w-full gap-3 py-7'>
                    <Button className='flex-1 hover:bg-green-500 hover:text-white active: ' type='submit'>
                        Save
                    </Button>
                    <Button className='flex-1 hover:bg-red-500 hover:text-white ' onClick={close}>
                        Cancel
                    </Button>
                </div>
            </div>
        </form>
    )
}
const TableSection = ({ staff, }: any) => {
    const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete S" })

    return (
        <Table>
            <Thead>
                <THeadRow>
                    {header.map((item, index) => <THeadCell key={index}>{item}</THeadCell>)}
                </THeadRow>
            </Thead>
            <TBody>
                {staff?.map((item: any) => {
                    if (item)
                        return (
                            <TBodyRow key={item?.id}>
                                <TBodyCell className='font-semibold'>{item.name}</TBodyCell>
                                <TBodyCell>{item.phone}</TBodyCell>
                                <TBodyCell>{item.email}</TBodyCell>
                                <TBodyCell>{item.is_advisor ? "Yes" : "No"}</TBodyCell>
                                <TBodyCell>{item.dept}</TBodyCell>
                                <TBodyCell>{item?.batch}</TBodyCell>
                                <TBodyCell className='flex gap-2 justify-center items-center'>
                                    <button className='cursor-pointer' onClick={openDelete}>
                                        <img src={deleteIcon} alt="edit" />
                                    </button>
                                    {createPortal(
                                        <ModalDelete>
                                            <DeleteStaffModal close={closeDelete} id={item.id} />
                                        </ModalDelete>,
                                        document.body
                                    )}
                                </TBodyCell>
                            </TBodyRow>
                        )
                    else <div></div>
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
    return supabase.from('staff').select(`is_advisor,users(id,name,phone,email),departments(code),batch(start_year,end_year)`)
        .then((res: any) => {

            const data = res.data.map((item: any) => {
                const id = item.users.id

                return ({
                    ...item,
                    id: id,
                    name: item.users.name,
                    phone: item.users.phone,
                    email: item.users.email,
                    dept: item.departments.code,
                    batch: item?.batch ? `${item?.batch.start_year}-${item?.batch.end_year}` : ''
                })
            })
            console.log(data)
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
            batch_id: e.currentTarget['batch']?.options[e.currentTarget['batch'].selectedIndex].id as string
        }
        console.log(userData)
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

export function DeleteStaffModal({ close, setValues = () => { }, id }: any) {
    const { staff } = useAuth()
    function handleSubmit(e: any) {
        e.preventDefault();
        supabase
            .from('users')
            .delete()
            .eq('id', id)
            .then((res: any) => {
                console.log(res)
                if (res.status === 204) {
                    getStaffFromDB().then(staff.set)
                    close()
                    console.log('deleted')

                }
            })
    }
    return (
        <form onSubmit={handleSubmit}>
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