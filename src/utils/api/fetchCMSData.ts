// Define a type for CMS items (adjust fields as needed based on actual CMS data structure)
type CMSItem = {
    id: string;
    title: string;
    subtitle?: string;
    url?: string;
    image?: string;
    background?: string;
    [key: string]: any; // To allow other dynamic fields if needed
};

// Define a type for the function's return value
type FetchCMSData = (wixClient: any, collectionId?: string) => Promise<CMSItem[]>;

// Main function with types, accepting wixClient as a parameter
export const fetchCMSData: FetchCMSData = async (wixClient, collectionId = 'HeroImages') => {
    // Inner function to fetch CMS data
    const fetchCMSData = async () => {
        const res = (await wixClient.items.queryDataItems({ dataCollectionId: collectionId, consistentRead: true }).find()).items;
        const data = res.map((item: CMSItem) => item);
        return data;
    };

    try {
        const data = await fetchCMSData();
        return data;
    } catch (error) {
        console.error('Error fetching CMS data:', error);
        return [];
    }
};
