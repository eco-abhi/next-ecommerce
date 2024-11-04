import { useEffect } from 'react';

function useEnterKey(onSubmit: () => void, isOpen: boolean = true) {
    useEffect(() => {
        const handleEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                onSubmit();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEnter);
        }

        return () => {
            document.removeEventListener('keydown', handleEnter);
        };
    }, [isOpen, onSubmit]);
}

export default useEnterKey;
