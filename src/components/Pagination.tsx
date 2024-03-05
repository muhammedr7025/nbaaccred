import { Arrow, DoubleArrow } from '@/assets/SvgTsx/arrow'
import { Button } from './buttons/default'

export const Pagination = ({ start, total }: { start: number, total: number }) => {
    return (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">{start} </span> of <span className="font-medium">{total}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-l-full">
                    <DoubleArrow />
                    <span className="sr-only">Go to first page</span>
                </Button>

                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <Arrow />
                    <span className="sr-only">Go to previous page</span>
                </Button>
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10">
                    <Arrow variant='right' />
                    <span className="sr-only">Go to next page</span>
                </Button>

                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10 rounded-r-full">
                    <DoubleArrow variant='right' />
                    <span className="sr-only">Go to last page</span>
                </Button>
            </div>
        </div>

    )
}

