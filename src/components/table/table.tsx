interface TableProps extends React.HTMLAttributes<HTMLTableSectionElement> { }
export const Table = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<table className={`w-full caption-bottom text-sm text-nowrap${className}`}>
        {children}
    </table>)
}



export const Thead = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<thead className={`[&amp;_tr]:border-b ${className}`}>
        {children}
    </thead>)
}

export const THeadRow = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
        {children}
    </tr>)
}

export const THeadCell: React.FC<TableProps> = ({ children, className = "" }) => {
    return (<th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[150px] ${className}`}>
        {children}
    </th>)
}
export const TBody: React.FC<TableProps> = ({ ...props }) => {
    return (<tbody className={`[&amp;_tr:last-child]:border-0 ${props?.className} `}>
        {props?.children}
    </tbody>)
}

export const TBodyRow: React.FC<TableProps> = ({ children, className = "" }) => {
    return (<tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
        {children}
    </tr>)
}

export const TBodyCell: React.FC<TableProps> = ({ children, className = "" }) => {
    return (<td className={`p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-nowrap ${className}`} >
        {children}
    </td >)
}