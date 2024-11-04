import { useState, useEffect } from 'react';

function useScrollDownVisibility(scrollThreshold: number = 6) {
    const [isNanobarVisible, setIsNanobarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setIsNanobarVisible(window.scrollY < scrollThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        // Check initial position
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [scrollThreshold]);

    return isNanobarVisible;
}

export default useScrollDownVisibility;
