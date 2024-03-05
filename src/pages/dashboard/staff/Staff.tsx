import { DownloadIcon } from '@/assets/SvgTsx/download'
import { Pagination } from '@/components/Pagination'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { staffHeaderType, staffType } from '@/types/tables'
import { BoxLayout } from '../boxLayout'

const header: staffHeaderType[] = ["Department", "Name", "Mobile", "Email", "Advisor", "Batch", "Action"]
const data: staffType[] = [{
    department: "Physics",
    name: "Dr. A. K. Singh",
    mobile: "9876543210",
    email: "aksingh@example.com",
    advisor: true,
    batch: 2023,
    edit: () => { },
    delete: () => { }
}]
export const Staff = () => {
    return (
        <BoxLayout
            topBar={
                <TopBarSection />
            }
            table={
                <TableSection />
            }
            pagination={
                <Pagination start={1} total={5} />
            }
        />

    )
}
const TopBarSection = () => {
    return (
        <TopBar name='Staff' >
            <Button>Add Staff</Button>
            <Button>Import</Button>
            <Button>Export</Button>
            <Button>Print</Button>
            <Button className='flex gap-2'>
                <DownloadIcon />
                CSV
            </Button>
        </TopBar>
    )
}
const TableSection = () => {
    return (
        <Table>
            <Thead>
                <THeadRow>
                    {header.map((item, index) => <THeadCell key={index}>{item}</THeadCell>)}
                </THeadRow>
            </Thead>
            <TBody>
                {data.map((item, index) => (
                    <TBodyRow key={index}>
                        <TBodyCell>{item.department}</TBodyCell>
                        <TBodyCell className='font-semibold'>{item.name}</TBodyCell>
                        <TBodyCell>{item.mobile}</TBodyCell>
                        <TBodyCell>{item.email}</TBodyCell>
                        <TBodyCell>{item.advisor ? "Yes" : "No"}</TBodyCell>
                        <TBodyCell>{item.batch}</TBodyCell>
                        <TBodyCell className='flex gap-2 '>
                            <button onClick={item.edit}>Edit</button>
                            <button onClick={item.delete}>Delete</button>
                        </TBodyCell>
                    </TBodyRow>
                ))}
            </TBody>
        </Table>
    )
}
