export const TopBar = ({ name, children }: { name: string, children?: React.ReactNode }) => {
    return (
        <div className="container grid gap-4 sm:gap-6 lg:gap-10">
            <div className="flex gap-4 justify-between w-full items-center">
                <h1 className="text-2xl md:text-xl font-bold text-nowrap ">{name} List</h1>
                <div className='flex gap-4 md:gap-1 sm:w-0 md:w-auto overflow-hidden'>
                    {children}
                </div>
            </div>
        </div>
    )
}


