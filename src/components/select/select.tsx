import React from 'react'
export interface SelectProps extends React.InputHTMLAttributes<HTMLSelectElement> {
    children: React.ReactNode
    headerprops?: React.HTMLAttributes<HTMLDivElement>
    header?: string
}
export const Select: React.FC<SelectProps> = ({ children, headerprops, header, ...props }) => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <label
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${headerprops?.className}`}
                htmlFor=" profile-url"
            >
                {header}
            </label>
            <select
                className={`flex h-10 w-full rounded-md border border-input
                 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 
                 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                    ${props?.className}
                `}
                id="profile-url"
                {...props}
            >
                {children}
            </select>
        </div>
    )
}

export const Option = ({ children, ...props }: React.OptionHTMLAttributes<HTMLOptionElement>) => {
    return <option {...props} className={`${props.className} text-[16px] my-10 `}>{children}</option>
}
