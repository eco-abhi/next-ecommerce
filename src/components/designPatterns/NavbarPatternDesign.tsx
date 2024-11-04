import React from 'react';

interface NavbarPatternDesignProps {
    className?: string;
    waveColor?: string;
    backgroundColor?: string;
}

const NavbarPatternDesign = ({
}: NavbarPatternDesignProps) => {

    return (
        <div className="grid grid-cols-4 gap-2 p-4">
            {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center aspect-square">
                    <div className="w-3/4 h-3/4 bg-white flex items-center justify-center">
                        <div className="w-1/2 h-1/2 bg-black flex items-center justify-center">
                            <div className="w-1/4 h-1/4 bg-white" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default NavbarPatternDesign;