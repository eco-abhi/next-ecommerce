import { useEffect } from 'react';

function useClickOutside(refs: React.RefObject<HTMLElement>[], callback: () => void) {
    const handleClickOutside = (event: MouseEvent) => {
        // First filter out any null refs
        const validRefs = refs.filter(ref => ref.current !== null);

        // If there are no valid refs, don't trigger the callback
        if (validRefs.length === 0) return;

        // Check if the click was outside all valid refs
        if (validRefs.every(ref => !ref.current?.contains(event.target as Node))) {
            callback();
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
