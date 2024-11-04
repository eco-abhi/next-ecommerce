import { useState, useEffect } from 'react';

function useAnimatedRender(isOpen: boolean, animationDuration = 600) {
    const [shouldRender, setShouldRender] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setIsAnimating(true);
        } else {
            setIsAnimating(false);
            // Wait for animation to complete before removing from DOM
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, animationDuration);

            return () => clearTimeout(timer);
        }
    }, [isOpen, animationDuration]);

    return { shouldRender, isAnimating };
}

export default useAnimatedRender;

