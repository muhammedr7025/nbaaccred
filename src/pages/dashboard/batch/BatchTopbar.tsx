import { TopBar } from "@/components/TopBar"
import { Button } from "@/components/buttons/default"
import { useModal } from "@/components/modal"
import { createPortal } from "react-dom"
import { useAuth } from "@/components/AuthContext"
import { AddForm } from "./BatchForms"

function BatchTopbar() {
    const { Modal: AddModal, open: openAdd, close: closeAdder } = useModal({ fadeTime: 300, title: "Add Batch" })
    const { Batch } = useAuth()
    return (
        <TopBar name='Batch'>
            <Button onClick={Batch.reload}>Reload</Button>
            <Button onClick={openAdd}>Add Batch</Button>
            {
                createPortal(
                    <AddModal >
                        <AddForm close={closeAdder} />
                    </AddModal>,
                    document.body
                )
            }
        </TopBar>
    )
}
export default BatchTopbar