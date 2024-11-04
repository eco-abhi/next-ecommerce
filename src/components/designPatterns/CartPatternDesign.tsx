import React from 'react';

const CartPatternDesign: React.FC = () => {
    return (
        <div className="w-full h-screen bg-pattern-vertical">
            {/* This div acts as a background pattern on the left side of the screen */}
            <div className="relative h-full w-10 bg-pattern"></div>
        </div>
    );
};

export default CartPatternDesign;
