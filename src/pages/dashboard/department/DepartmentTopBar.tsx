import { TopBar } from "@/components/TopBar"
import { Button } from "@/components/buttons/default"
import { useModal2 } from "@/components/modal"
import { useAuth } from "@/components/AuthContext"
import { AddEditForm } from "./DepartmentForms"

function TopBarSection() {
    const { Modal, open, close } = useModal2({ fadeTime: 300, title: "Add Department" })
    const { Departments } = useAuth()
    return (
        <TopBar name='Department'>
            <Button onClick={Departments.reload}>Reload</Button>
            <Button onClick={open}>Add Subject</Button>
            <Modal>
                <AddEditForm close={close} />
            </Modal>
        </TopBar>
    )
}
export default TopBarSection