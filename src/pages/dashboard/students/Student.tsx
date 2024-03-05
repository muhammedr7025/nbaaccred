import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
import { BoxLayout } from '../boxLayout'
import { TopBar } from '@/components/TopBar'
import { Button } from '@/components/buttons/default'
import { DownloadIcon } from '@/assets/SvgTsx/download'
import { Pagination } from '@/components/Pagination'
const header = ["Reg.No", "Name", "Adm.No", "Gender", "Physics", "Chemistry", "Maths", "Average", "Higher Secondary", "KEAM", "College Rank", "Proof", "Remark", "Batch", "Department",
    "Action"]
export const Student = () => {
    return (
        <>
            <BoxLayout
                topBar={<TopBar name='Staff'>
                    <Button>Add Staff</Button>
                    <Button>Import</Button>
                    <Button>Export</Button>
                    <Button>Print</Button>
                    <Button className='flex gap-2'>
                        <DownloadIcon />
                        CSV
                    </Button>
                </TopBar>}
                table={
                    <Table>
                        <Thead>
                            <THeadRow>
                                {header.map((item, index) => <THeadCell key={index}>{item}</THeadCell>)}
                            </THeadRow>
                        </Thead>
                        <TBody>
                            <TBodyRow>
                                <TBodyCell>Physics</TBodyCell>
                                <TBodyCell className='font-semibold'>Dr. A. K. Singh</TBodyCell>
                                <TBodyCell>9876543210</TBodyCell>
                                <TBodyCell>aksingh@example.com</TBodyCell>
                                <TBodyCell>Yes</TBodyCell>
                                <TBodyCell>2023</TBodyCell>
                                <TBodyCell className='flex gap-2 '>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </TBodyCell>
                            </TBodyRow>
                        </TBody>
                    </Table>
                }
                pagination={<Pagination start={1} total={5} />}
            /></>
    )
}
