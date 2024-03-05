
export const DoubleArrow = ({ variant = "left" }: { variant?: "left" | "right" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
        >
            {variant === "left" ?
                <>
                    <path d="m11 17-5-5 5-5"></path>
                    <path d="m18 17-5-5 5-5"></path>
                </> :
                <>

                    <path d="m6 17 5-5-5-5"></path>
                    <path d="m13 17 5-5-5-5"></path>
                </>
            }
        </svg>
    )
}

export const Arrow = ({ variant = "left" }: { variant?: "left" | "right" }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
        >
            {
                variant === "left" ?
                    <path d="m15 18-6-6 6-6" /> :
                    <path d="m9 6 6 6-6 6" />
            }
        </svg>
    )
}