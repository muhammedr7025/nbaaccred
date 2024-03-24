import { useAuth } from '@/components/AuthContext'
import { Button } from '@/components/buttons/default'
import { useModal } from '@/components/modal'
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import React, { useEffect } from 'react'
import { AddForm } from './form'
import { createPortal } from 'react-dom'
import { SubjectType } from '@/types/tables'
import { DownloadIcon } from '@/assets/SvgTsx/download'
import PdfDownloadButton from './PdfDownloadButton'

export const SubjectTable = () => {
    const { Subjects } = useAuth()
    const { Modal: EditFormModal, open: openEditor, close: closeEditor } = useModal({ fadeTime: 300, title: "Edit Subject" })
    const { Modal: DeleteFormModal, open: openDeleter, close: closeDeleter } = useModal({ fadeTime: 300, title: "Delete Subject" })

    const [data, setData] = React.useState<SubjectType>({})
    useEffect(() => {
        Subjects.fetch()
    }, [])
    return (
        <>
            {
                createPortal(
                    <>
                        <EditFormModal >
                            <AddForm close={closeEditor} data={data} />
                        </EditFormModal>
                        <DeleteFormModal>
                        </DeleteFormModal>
                    </>,

                    document.body
                )
            }
            <Table>
                <Thead>
                    <THeadRow>
                        <THeadCell >No.</THeadCell>
                        <THeadCell className=" text-center">Subject</THeadCell>
                        <THeadCell className=" text-center">Code</THeadCell>
                        <THeadCell className=" text-center">Syllabus</THeadCell>
                        <THeadCell className=" text-center">Action</THeadCell>
                    </THeadRow>
                </Thead>
                <TBody>
                    {Subjects.data?.map((item, index) => (
                        <TBodyRow key={item.id}>
                            <TBodyCell >{index + 1}</TBodyCell>
                            <TBodyCell className=" text-center">{item.name}</TBodyCell>
                            <TBodyCell className=" text-center">{item.code}</TBodyCell>
                            <TBodyCell className=" text-center">
                                <PdfDownloadButton item={item} />
                            </TBodyCell>
                            <TBodyCell className=" text-center">
                                <div className="flex gap-2">
                                    <Button
                                        onClick={() => {
                                            openEditor()
                                            setData(item)
                                        }}>Edit</Button>
                                    <Button
                                        onClick={() => {
                                            Subjects.delete(item.id)
                                        }}>Delete</Button>
                                </div>
                            </TBodyCell>
                        </TBodyRow>
                    ))}
                </TBody>
            </Table>
        </>
    )
}
