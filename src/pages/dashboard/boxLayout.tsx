import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export const BoxLayout = (
    {
        topBar,
        table,
        pagination,
        modal
    }:
        {
            topBar: React.ReactNode,
            table: React.ReactNode,
            pagination: React.ReactNode,
            modal?: React.ReactNode
        }
) => {
    return (
        <div className='flex flex-col flex-1 relative'>
            <div className='px-6 md:px-8 pt-6 md:pt-8'>
                {topBar}
            </div>
            <main className="flex-1 overflow-y-auto grid gap-4 px-6 my-3 ">
                <div className="border rounded-lg p-4 grid gap-4">
                    <div className="relative w-full overflow-auto">
                        {table}
                    </div>
                </div>
            </main>
            <div className='px-7 pb-7 hidden ' >
                {pagination}
            </div>
            {modal}
        </div>

    )
}

/**
 * Generate a Box Layout with top bar, table, and pagination.
 *
 * @param {{ children?: React.ReactNode }} children - React node children to be displayed in the Box Layout.
 * @example 
 * <BoxLayout2>
 *      <Component1 key="TopBar" />
 *      <Component2 key="Table"/>
 *      <Component3 key="Pagination"/>
 *  </BoxLayout2>
 * @return {JSX.Element} The Box Layout component.
 */
export const BoxLayout2 = ({ children }: { children?: React.ReactNode }): JSX.Element => {
    const [topBar, setTopBar] = React.useState<React.ReactNode>(null)
    const [table, setTable] = React.useState<React.ReactNode>(null)
    const [pagination, setPagination] = React.useState<React.ReactNode>(null)
    useEffect(() => {
        const { topBarChildren, tableChildren, paginationChildren } = getFilteredChildren(children)
        setTopBar(topBarChildren)
        setTable(tableChildren)
        setPagination(paginationChildren)
    }, [])
    return (
        <div className='flex flex-col flex-1 relative'>
            <div className='px-6 md:px-8 pt-6 md:pt-8'>
                {topBar}
            </div>
            <main className="flex-1 overflow-y-auto grid gap-4 px-6 my-3 ">
                <div className="border rounded-lg p-4 grid gap-4">
                    <div className="relative w-full overflow-auto">
                        {table}
                    </div>
                </div>
            </main>
            <div className='px-7 pb-7 hidden ' >
                {pagination}
            </div>
        </div>

    )
}


function getFilteredChildren(children: React.ReactNode) {
    const topBarChildren: React.ReactNode[] = []
    const tableChildren: React.ReactNode[] = []
    const paginationChildren: React.ReactNode[] = []
    if (children && Array.isArray(children)) {
        children.forEach((child: React.JSX.Element) => {
            if (child.key === 'TopBar') {
                topBarChildren.push(child)
            }
            if (child.key === "Table") {
                tableChildren.push(child)
            }
            if (child.key === "Pagination") {
                paginationChildren.push(child)
            }
        });
    }
    return { topBarChildren, tableChildren, paginationChildren }
}