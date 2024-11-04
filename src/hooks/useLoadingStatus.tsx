import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function useLoadingStatus<T>(data: T, dataType: 'array' | 'object' | 'string'): [boolean, Dispatch<SetStateAction<boolean>>] {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let hasData = false;
        if (dataType === 'array' && Array.isArray(data)) {
            hasData = data.length > 0;
        } else if (dataType === 'object' && typeof data === 'object' && data !== null) {
            hasData = Object.keys(data).length > 0;
        } else if (dataType === 'string' && typeof data === 'string') {
            hasData = data.length > 0;
        }

        setIsLoading(!hasData);
    }, [data, dataType]);

    return [isLoading, setIsLoading];
}

export default useLoadingStatus;
