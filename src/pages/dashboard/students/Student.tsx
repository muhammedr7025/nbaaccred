import { TBody, TBodyCell, TBodyRow, THeadCell, THeadRow, Table, Thead } from '@/components/table/table'
const header = ["Reg.No", "Name", "Adm.No", "Gender", "Physics", "Chemistry", "Maths", "Average", "Higher Secondary", "KEAM", "College Rank", "Proof", "Remark", "Batch", "Department",
    "Action"]
export const Student = () => {
    return (
        <main className="flex-1 overflow-y-auto p-4 grid gap-4 md:p-6 lg:p-8">
            <div className="border rounded-lg p-4 grid gap-4">
                <div className="relative w-full overflow-auto">
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

                </div>

            </div>
        </main>
    )
}
