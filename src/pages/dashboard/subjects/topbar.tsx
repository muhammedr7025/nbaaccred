import { TopBar } from "@/components/TopBar"
import { Button } from "@/components/buttons/default"
import { Input } from "@/components/inputs/input"
import { useModal } from "@/components/modal"
import { createPortal } from "react-dom"
import { AddForm } from "./form"
import { useAuth } from "@/components/AuthContext"

function TopBarSection() {
    const { Modal: AddModal, open: openAdd, close: closeAdder } = useModal({ fadeTime: 300, title: "Add Subject" })
    const { Subjects } = useAuth()
    return (
        <TopBar name='Staff'>
            <Button onClick={Subjects.reload}>Reload</Button>
            <Button onClick={openAdd}>Add Subject</Button>
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
export default TopBarSection