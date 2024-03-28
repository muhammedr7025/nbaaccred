import { DownloadIcon } from '@/assets/SvgTsx/download'
import { useAuth } from '@/components/AuthContext'
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import React, { useEffect } from 'react'
import PdfDownloadButton from './DownloadButtons'
import { useModal2 } from '@/components/modal'
import { AddEditForm } from './DepartmentForms'
import { Button } from '@/components/buttons/default'

const DepartmentTable = () => {
    const { Departments } = useAuth()
    useEffect(() => {
        Departments.fetch()
    }, [])
    const [item, setItem] = React.useState({} as any)
    const { Modal: EditModal, open: EditOpen, close: EditClose } = useModal2({ fadeTime: 300, title: "Edit Department" })
    const { Modal: DeleteModal, open: DeleteOpen, close: DeleteClose } = useModal2({ fadeTime: 300, title: "Delete Department" })
    return (
        <>
            <EditModal>
                <AddEditForm close={EditClose} data={item} reload={Departments.reload} />
            </EditModal>
            <DeleteModal>
                {/* <DeleteForm close={DeleteClose} data={item} reload={Departments.reload} /> */}
            </DeleteModal>
            <Table>
                <Thead>
                    <THeadRow>
                        <THeadCell>Code</THeadCell>
                        <THeadCell>Department</THeadCell>
                        <THeadCell>
                            <div className="flex w-full items-center justify-center">
                                Mission
                            </div>
                        </THeadCell>
                        <THeadCell>
                            <div className="flex w-full items-center justify-center">
                                Vision
                            </div>
                        </THeadCell>
                        <THeadCell>
                            <div className="flex w-full items-center justify-center">
                                Action
                            </div>
                        </THeadCell>
                    </THeadRow>
                </Thead>
                <TBody>
                    {Departments?.data?.map((item) => (
                        <TBodyRow key={item?.id}>
                            <TBodyCell className="">{item?.code}</TBodyCell>
                            <TBodyCell className="">{item?.name}</TBodyCell>
                            <TBodyCell >
                                <div className="flex w-full items-center justify-center">
                                    <PdfDownloadButton url={item?.mission_url as string} bucketName='mission' />
                                </div>
                            </TBodyCell>
                            <TBodyCell >
                                <div className="flex w-full items-center justify-center">
                                    <PdfDownloadButton url={item?.vision_url as string} bucketName='vision' />
                                </div>
                            </TBodyCell>
                            <TBodyCell >
                                <div className="flex w-full items-center justify-center gap-5">
                                    <Button className='cursor-pointer ' onClick={() => {
                                        setItem(item)
                                        EditOpen()
                                    }}>
                                        Edit
                                    </Button>
                                    <Button className='cursor-pointer ' onClick={() => {
                                        setItem(item)
                                        DeleteOpen()
                                    }}>
                                        Delete
                                    </Button>

                                </div>
                            </TBodyCell>
                        </TBodyRow>
                    ))}
                </TBody>
            </Table>
        </>
    )
}

export default DepartmentTable