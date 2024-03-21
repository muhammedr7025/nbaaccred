import { ButtonHTMLAttributes } from 'react'
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
    return (
        <button
            className={`inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3
            hover:bg-gray-100 active:bg-black active:text-white
            
            ${className}`}
            type='button'
            {...props}
        >
            {children}
        </button>
    )
}
