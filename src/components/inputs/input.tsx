import React from 'react'
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    children?: React.ReactNode
    headerprops?: React.HTMLAttributes<HTMLDivElement>
}
export const Input: React.FC<InputProps> = ({ children, headerprops, className, ...props }) => {
    return (
        <div className="flex flex-col gap-2 flex-1">
            {children && <label
                className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${headerprops?.className}`}
                htmlFor=" profile-url"
            >
                {children}
            </label>}
            <input
                className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
                ${className}
                `}
                id="profile-url"
                {...props}
            />
        </div>
    )
}

