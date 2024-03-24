import React, { useEffect } from 'react'
interface ModalComponentProps extends React.HTMLAttributes<HTMLDivElement> { }
type ModalHookProps = {
    fadeTime?: number
    viewModal?: boolean
    title?: string
}
import { IoClose } from "react-icons/io5";

export const useModal = ({ fadeTime: fadeTime = 300, viewModal: viewModal = false, title }: ModalHookProps) => {
    const [isOpen, setIsOpen] = React.useState(viewModal)
    const [viewBlock, setViewBlock] = React.useState(viewModal)
    const containerRef = React.useRef<HTMLDivElement>(null)
    function open() {
        setViewBlock(true)
        setTimeout(() => {
            setIsOpen(true)
        }, fadeTime);
    }
    function close() {
        setIsOpen(false)
        setTimeout(() => {
            setViewBlock(false)
        }, fadeTime);
    }
    function toggle() {
        if (viewBlock) {
            close()
        } else open()
    }
    useEffect(() => {
        function handleEscapeClick(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                close()
            }
        }
        window.addEventListener('keydown', handleEscapeClick)
        return () => {
            window.removeEventListener('keydown', handleEscapeClick)
        }
    }, [])
    const Modal: React.FC<ModalComponentProps> = ({ className, children, ...props }) => {

        return (
            <div ref={containerRef}
                onClick={close}
                className=' cursor-pointer bg-black/60 z-10 absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center' style={{ display: viewBlock ? 'flex' : 'none' }}>
                <div onClick={(e) => e.stopPropagation()} className={`drop-shadow-[0_0_5px_rgba(0,0,0,0.2)] p-8  rounded-xl bg-white 
                cursor-auto transition:opacity duration-300 opacity-100 min-h-10 min-w-10 
                max-h-[80vh] overflow-auto 
                ${className}`}
                    style={{ opacity: isOpen ? 1 : 0, }} {...props}>
                    <div className='flex justify-between '>
                        <div className='font-bold'>{title}</div>
                        <IoClose size={24} onClick={close} />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
    return {
        Modal,
        open,
        close,
        toggle,
    }
}

