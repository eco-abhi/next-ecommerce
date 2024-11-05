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
        return size.replace(/\d+/g, (num) => (parseFloat(num) * 2.54).toFixed(0));
    };

    return (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-4">
            <div className="overflow-auto">
                <table className="min-w-full text-left text-gray-700">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 font-semibold">Size</th>
                            <th className="px-4 py-2 font-semibold">Duvet Cover</th>
                            <th className="px-4 py-2 font-semibold">Fitted Sheet</th>
                            <th className="px-4 py-2 font-semibold">Flat Sheet</th>
                            <th className="px-4 py-2 font-semibold">Pillowcases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="border-t">
                                <td className="px-4 py-2 font-medium">{row.name}</td>
                                <td className="px-4 py-2">{isInches ? row.duvetCover : convertToCentimeters(row.duvetCover)}</td>
                                <td className="px-4 py-2">{isInches ? row.fittedSheet : convertToCentimeters(row.fittedSheet)}</td>
                                <td className="px-4 py-2">{isInches ? row.flatSheet : convertToCentimeters(row.flatSheet)}</td>
                                <td className="px-4 py-2">{isInches ? row.pillowcases : convertToCentimeters(row.pillowcases)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Unit Toggle */}
            <div className="flex items-center justify-end space-x-4">
                <span className={`text-sm font-medium ${isInches ? 'text-gray-900' : 'text-gray-400'}`}>IN</span>
                <button
                    onClick={toggleUnit}
                    className={`relative inline-flex items-center h-6 w-12 rounded-full focus:outline-none transition ${isInches ? 'bg-gray-400' : 'bg-blue-500'
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
