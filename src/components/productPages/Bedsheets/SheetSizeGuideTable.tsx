import React, { useState } from 'react';

interface SheetSizeGuideTableProps {
    data: {
        name: string;
        duvetCover: string;
        fittedSheet: string;
        flatSheet: string;
        pillowcases: string;
    }[];
}

const SheetSizeGuideTable: React.FC<SheetSizeGuideTableProps> = ({ data }) => {
    const [isInches, setIsInches] = useState(true);

    const toggleUnit = () => setIsInches(!isInches);

    const convertToCentimeters = (size: string) => {
        return size.replace(/(\d+)(?=\D|$)/g, (num) => `${(parseFloat(num) * 2.54).toFixed(0)} cm`).replace(/\s*x\s*/g, ' x ');
    };

    const addInchSign = (size: string) => {
        return size.replace(/(\d+)(?=\D|$)/g, (num) => `${num}"`).replace(/\s*x\s*/g, ' x ');
    }


    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4 max-h-[80vh] overflow-y-auto pb-14">
            <div className="overflow-auto">
                <table className="min-w-full text-left text-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-4 font-semibold sticky left-0 bg-gray-50 z-10 border-r">Size</th>
                            <th className="px-4 py-4 font-semibold">Duvet Cover</th>
                            <th className="px-4 py-4 font-semibold">Fitted Sheet</th>
                            <th className="px-4 py-4 font-semibold">Flat Sheet</th>
                            <th className="px-4 py-4 font-semibold">Pillowcases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-4 font-medium border-r sticky left-0 bg-gray-50 z-10">
                                    {row.name}
                                </td>
                                <td className="px-4 py-4">
                                    {isInches ? addInchSign(row.duvetCover) : convertToCentimeters(row.duvetCover)}
                                </td>
                                <td className="px-4 py-4">
                                    {isInches ? addInchSign(row.fittedSheet) : convertToCentimeters(row.fittedSheet)}
                                </td>
                                <td className="px-4 py-4">
                                    {isInches ? addInchSign(row.flatSheet) : convertToCentimeters(row.flatSheet)}
                                </td>
                                <td className="px-4 py-4">
                                    {isInches ? addInchSign(row.pillowcases) : convertToCentimeters(row.pillowcases)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            {/* Unit Toggle */}
            <div className="flex items-center justify-start space-x-4 mt-3">
                <span className={`text-sm font-medium ${isInches ? 'text-gray-900' : 'text-gray-400'}`}>IN</span>
                <button
                    onClick={toggleUnit}
                    className={`relative inline-flex items-center h-6 w-12 rounded-full focus:outline-none transition ${isInches ? 'bg-blue-500' : 'bg-blue-500'
                        }`}
                >
                    <span
                        className={`inline-block w-5 h-5 transform rounded-full bg-white transition ${isInches ? 'translate-x-1' : 'translate-x-6'
                            }`}
                    />
                </button>
                <span className={`text-sm font-medium ${!isInches ? 'text-gray-900' : 'text-gray-400'}`}>CM</span>
            </div>
        </div>
    );
};

export default SheetSizeGuideTable;
