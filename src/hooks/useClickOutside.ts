import { useEffect } from 'react';

function useClickOutside(refs: React.RefObject<HTMLElement>[], callback: () => void) {
    const handleClickOutside = (event: MouseEvent) => {
        if (refs.every(ref => ref.current && !ref.current.contains(event.target as Node))) {
            callback(); // Run the callback if clicked outside all elements
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs, callback]);
}

export default useClickOutside;
