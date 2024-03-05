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

export const THeadCell = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[150px] ${className}`}>
        {children}
    </th>)
}

export const TBody = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<tbody className={`[&amp;_tr:last-child]:border-0 ${className} `}>
        {children}
    </tbody>)
}

export const TBodyRow = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
        {children}
    </tr>)
}

export const TBodyCell = ({ children, className = "" }: {
    children: React.ReactNode,
    className?: string
}) => {
    return (<td className={`p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 text-nowrap ${className}`} >
        {children}
    </td >)
}