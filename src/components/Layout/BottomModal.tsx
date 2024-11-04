import React from 'react'
import CloseButton from "../../../public/close-button.svg"
import useEscapeKey from '@/hooks/useEscapeKey';
import useAnimatedRender from '@/hooks/useAnimatedRender';

interface BottomModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const BottomModal: React.FC<BottomModalProps> = ({ isOpen, onClose, children }) => {

    const { shouldRender, isAnimating } = useAnimatedRender(isOpen, 600);

    useEscapeKey(onClose, isOpen);

    if (!shouldRender) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-end justify-center bg-black transition-opacity duration-500 px-4
            ${isAnimating ? 'bg-opacity-30 no-doc-scroll' : 'bg-opacity-0'}`}>
            <div
                onClick={onClose}
                className="absolute inset-0"
            />
            <div
                className={`relative w-full max-w-screen h-1/3 p-6 bg-[#F9F3ED] rounded-t-[50px] transform
                    ${isAnimating ? 'animate-slide-up' : 'animate-slide-down'}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className='group relative'>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-200 absolute top--2 right-24 cursor-pointer text-gray-900 object-cover"
                    >
                        <CloseButton className="h-6 w-6" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default BottomModal;