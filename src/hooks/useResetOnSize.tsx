import { useEffect } from 'react';

interface CallbackWithDeps {
    callback: () => void;
    dependencies?: any[];
}

const useResetOnResize = (callbacks: Array<CallbackWithDeps>, breakpoint: number = 850) => {
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= breakpoint) {
                callbacks.forEach(({ callback }) => callback());
            }
        };

        window.addEventListener('resize', handleResize);
        // Run once to check the initial window size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint, ...callbacks.flatMap(({ dependencies = [] }) => dependencies)]);
};

export default useResetOnResize;
