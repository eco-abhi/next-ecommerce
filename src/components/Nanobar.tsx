// Code for the Nanobar component
'use client';
import { useState, useEffect } from 'react'

const Nanobar: React.FC<NanobarProps> = ({ messages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // If there's more than one message, cycle through them every 5 seconds
        if (messages.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % messages.length);
            }, 5000); // 5000ms = 5 seconds

            // Cleanup the interval when the component is unmounted or the messages change
            return () => clearInterval(interval);
        }
    }, [messages]);

    return (
        <div className="w-full md:h-10 h-[60px] bg-[#273455] text-white text-center flex items-center justify-center text-sm font-semibold">
            {/* Display the current message */}
            <div>{messages[currentIndex]}</div>
        </div>
    );
};

export default Nanobar;