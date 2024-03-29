import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { BoxLayout } from '../boxLayout'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
// import { DownloadIcon } from '@/assets/SvgTsx/download'
import deleteIcon from '@assets/svg/deleteIcon.svg'
import editIcon from '@assets/svg/editIcon.svg'

import { Helmet } from 'react-helmet';
import { Pagination } from '@/components/Pagination'
import { Input } from '@/components/inputs/input'
import { Option, Select } from '@/components/select/select'
import { useModal } from '@/components/modal'
import React, { useEffect } from 'react'
import { useAuth } from '@/components/AuthContext'
import { supabase } from '@/utils/supbase/supabaseClient'
import { createPortal } from 'react-dom'
import { convertCsvToJson } from '@/utils/convertCsvToJson'
import { bulkImportStudent } from './bulkImport'

const header = ["Reg.No", "Name", "Adm.No", "Gender", "Physics", "Chemistry", "Maths", "Average", "Higher Secondary", "KEAM", "College Rank", "Batch", "Department",
    // "Proof", "Remark",
    "Action"
]
type modalType = 'delete' | 'add' | undefined
export const Student = () => {

    const { Modal, open, close, } = useModal({ fadeTime: 300, title: "Add Student" })
    const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete Student" })

    const [students, setStudent] = React.useState<any[]>([])
    const [modalToView, setModalToView] = React.useState<modalType>()
    function Modals() {
        return (
            <div id='modals'>

                <Modal>
                    <ModalBox close={close} setStudent={setStudent} />
                </Modal >
            </div>
        )
    }

    useEffect(() => {
        getStudents().then(setStudent)
    }, [])
    const [data, setData] = React.useState<any[]>([])
    const { Modal: ModalImport, open: openImport, close: closeImport } = useModal({ fadeTime: 300, title: "Import Student Data" })
    const { Modal: ModalEdit, open: openEdit, close: closeEdit } = useModal({ fadeTime: 300, title: "Edit Student " })
    const [item, setItem] = React.useState<any>(null)
    return (
        <>
            <ModalEdit>
                <ModalBox close={closeEdit} setStudent={setStudent} data={item} />
            </ModalEdit>
            {createPortal(
                <ModalDelete>
                    <DeleteStudentModal close={closeDelete} setValues={setStudent} id={item?.user_id} />
                </ModalDelete>,
                document.body
            )}
            <BoxLayout
                topBar={<TopBar name='Staff'>
                    <Button >Reload</Button>
                    <Button onClick={open}>Add Student</Button>
                    <Button onClick={openImport}>Import</Button>
                    {createPortal(
                        <ModalImport>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                const file = e.currentTarget['import'].files[0]
                                convertCsvToJson(file).then((data) => {
                                    bulkImportStudent(data)
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
                                        <TBodyCell>{((parseInt(item.maths) + parseInt(item.chemistry) + parseInt(item.physics)) / 3).toFixed(2)}</TBodyCell>
                                        <TBodyCell>{item.pre_degree}</TBodyCell>
                                        <TBodyCell>{item.keam}</TBodyCell>
                                        <TBodyCell>{item.rank}</TBodyCell>
                                        <TBodyCell>{item.batch}</TBodyCell>
                                        <TBodyCell>{item.department}</TBodyCell>
                                        {/* <TBodyCell>{''}</TBodyCell>
                                        <TBodyCell>{''}</TBodyCell> */}

                                        <TBodyCell className='flex gap-5 justify-center'>
                                            <button className='cursor-pointer' onClick={() => {
                                                setItem(item)
                                                openEdit()
                                            }}>
                                                <img src={editIcon} alt="edit" />
                                            </button>
                                            <button className='cursor-pointer' onClick={() => {
                                                setItem(item)
                                                openDelete()
                                            }}>
                                                <img src={deleteIcon} alt="edit" />
                                            </button>

                                        </TBodyCell>
                                    </TBodyRow>)
                                else return <TBodyRow><></></TBodyRow>
                            })}
                        </TBody>
                    </Table >
                }
                pagination={< Pagination start={1} total={5} />}
                modal={<Modals />}
            /></ >
    )
}
const ModalBox = ({ close, setStudent, data: dataReceived }: { close: () => void, setStudent: React.Dispatch<React.SetStateAction<any[]>>, data?: any }) => {
    const { batchs, departments, genders, roles } = useAuth()
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
        const studentData = (userId: string) => {
            if (userId)
                return ({
                    ...data,
                    user_id: userId
                })
        }
        const reqData = studentData(dataReceived?.user_id ?? null)
        if (dataReceived) {
            console.log('update')
            if (checkChanges(dataReceived, userData)) {
                const res = await supabase
                    .from('users')
                    .update(userData)
                    .eq('id', dataReceived.user_id)
                if (res.status === 204) {
                    close()
                    getStudents().then(setStudent)
                }
            }
            if (checkChanges(dataReceived, reqData)) {
                const res = await supabase
                    .from('students')
                    .update(reqData)
                    .eq('user_id', dataReceived.user_id)
                if (res.status === 204) {
                    close()
                    getStudents().then(setStudent)
                }
            }
            else close()
        }
        else {
            console.log('create')
            return supabase
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
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-row flex-wrap gap-4 w-[500px] justify-center mt-8">
                <div className='flex w-full gap-3'>
                    <Input id='name' required placeholder='Enter name' defaultValue={dataReceived?.name}>Name</Input>
                    <Input id='email' required placeholder='Enter email' defaultValue={dataReceived?.email}>Email</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='reg_no' required placeholder='Enter registration number' defaultValue={dataReceived?.reg_no}>Registration No.</Input>
                    <Input id='adm_no' required placeholder='Enter admission number' defaultValue={dataReceived?.adm_no}>Admission No. </Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='mobile' placeholder='Enter mobile' defaultValue={dataReceived?.phone}>Mobile</Input>

                    <Select id='gender' header='Gender' defaultValue={dataReceived?.gender}>
                        {genders?.map((item) => <Option id={`${item?.id}`} value={item?.name} key={item?.id} >{item?.name.toUpperCase()}</Option>)}

                    </Select>
                </div>
                <div className='flex w-full gap-3' defaultValue={'0'}>
                    <Select id='department' header='Department' defaultValue={dataReceived?.department}>
                        {departments?.map((item) => <Option id={`${item?.id}`} value={item?.name as string} key={item?.id} >{item?.name}</Option>)}
                    </Select>
                    <Select id='batch' header='Batch' placeholder='Selector' defaultValue={dataReceived?.batch}>
                        {
                            batchs?.map((item) => <Option id={`${item.id}`} value={item.start_year + '-' + item.end_year} key={item.id} >{item.start_year + ' - ' + item.end_year}</Option>)
                        }
                    </Select>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='physics' placeholder='Enter marks' defaultValue={dataReceived?.physics}>Physics</Input>
                    <Input id='maths' placeholder='Enter marks' defaultValue={dataReceived?.maths}>Maths</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='chemistry' placeholder='Enter marks' defaultValue={dataReceived?.chemistry}>Chemistry</Input>
                    <Input id='higher_secondary' placeholder='Enter higher secondary score' defaultValue={dataReceived?.pre_degree}>Higher Secondary</Input>
                </div>
                <div className='flex w-full gap-3'>
                    <Input id='rank' placeholder='Enter college rank' defaultValue={dataReceived?.rank}>Rank</Input>
                    <Input id='keam' placeholder='Enter KEAM score' defaultValue={dataReceived?.keam}>KEAM</Input>
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
async function getStudents() {
    return supabase.from('students').select(`*,users(name,gender(name),phone,email),batch(start_year,end_year),departments(name)`)
        .then((res: any) => {
            return (res.data.map((item: any) => ({
                ...item,
                name: item.users.name,
                email: item.users.email,
                gender: item.users.gender.name,
                batch: item.batch.start_year + "-" + item.batch.end_year,
                department: item.departments.name,
                phone: item.users.phone,
            })))
        })
}
export function DeleteStudentModal({ close, setValues = () => { }, id }: any) {
    function handleSubmit(e: any) {
        e.preventDefault();
        supabase
            .from('users')
            .delete()
            .eq('id', id)
            .then((res: any) => {
                if (res.status === 204) {
                    getStudents().then(setValues)
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

function checkChanges(currentData: any, updatedData: any) {
    for (let key in updatedData) {
        if (currentData[key] !== updatedData[key]) {
            console.log(currentData[key], updatedData[key])
            return true
        }
    }
    return false
}
