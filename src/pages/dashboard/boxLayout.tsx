import React from 'react'
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
