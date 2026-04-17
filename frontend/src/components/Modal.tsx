import React from 'react'

type ModalProps = {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}
const Modal = ({ isOpen, onClose, children }: ModalProps) => {

    if (!isOpen) return null;
    return (
        <div
            className="fixed left-0 top-0 bg-black/50 z-50 flex items-center justify-center w-full h-screen p-2 "
            onClick={onClose}
        >
            <div className="w-full max-w-md  flex flex-col gap-2 p-4 bg-white rounded-xl" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal