import { useAuth } from "@/components/AuthContext";
import { useModal } from "@/components/modal";
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from "@/components/table/table";
import { useState } from "react";
import { createPortal } from "react-dom";
import { AddForm, DeleteForm } from "./BatchForms";
import { Button } from "@/components/buttons/default";

const BatchTable = () => {
    const { Batch } = useAuth()
    const [item, setItem] = useState({} as any)
    const { Modal: ModalDelete, open: openDelete, close: closeDelete, } = useModal({ fadeTime: 300, title: "Delete Batch" })
    const { Modal: ModalEdit, open: openEdit, close: closeEdit } = useModal({ fadeTime: 300, title: "Edit Batch" })
    return (
        <>
            {createPortal(
                <>
                    <ModalDelete>
                        <DeleteForm close={closeDelete} data={item} />
                    </ModalDelete>
                    <ModalEdit>
                        <AddForm close={closeEdit} data={item} />
                    </ModalEdit>
                </>
                ,
                document.body
            )}
            <Table>
                <Thead>
                    <THeadRow>
                        <THeadCell >No.</THeadCell>
                        <THeadCell className=" text-center">Batch</THeadCell>
                        <THeadCell className=" text-center">Action</THeadCell>
                    </THeadRow>
                </Thead>
                <TBody>
                    {Batch.data?.map((item, index) => (
                        <TBodyRow key={index} >
                            <TBodyCell>{index + 1}</TBodyCell>
                            <TBodyCell className=" text-center">{item.start_year + " - " + item.end_year}</TBodyCell>
                            <TBodyCell className="flex gap-5 justify-center">
                                <Button className='cursor-pointer' onClick={() => {
                                    openEdit()
                                    setItem(item)
                                }}>
                                    Edit
                                </Button>
                                <Button className='cursor-pointer' onClick={() => {
                                    openDelete()
                                    setItem(item)
                                }}>
                                    Delete
                                </Button>
                            </TBodyCell>
                        </TBodyRow>
                    ))}
                </TBody>
            </Table>
        </>
    );
};
export default BatchTable