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
            className="fixed left-0 top-0 bg-black/50 z-10 flex items-center justify-center w-full h-screen p-2 "
            onClick={onClose}
        >
            <div className="bg-white w-full h-full rounded-2xl p-4 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Modal