import { z } from 'zod';
import { CMSItemSchema } from '@/lib/schemas/CMSItemSchema';

type CMSItem = z.infer<typeof CMSItemSchema>;

// Define a type for the function's return value
type FetchCMSData = (wixClient: any, collectionId?: string) => Promise<CMSItem[]>;

// Main function with types, accepting wixClient as a parameter
export const fetchCMSData: FetchCMSData = async (wixClient, collectionId = 'HeroImages') => {
    // Inner function to fetch CMS data
    const fetchedData = async () => {
        const res = (await wixClient.items.queryDataItems({ dataCollectionId: collectionId, consistentRead: true }).find()).items;
        // Validate each item with Zod
        const data = res.map((item: unknown) => {
            try {

                return CMSItemSchema.parse(item); // Parse and validate
            } catch (error) {
                console.error('Validation error:', error);
                return null; // Handle invalid items as needed
            }
        }).filter(Boolean); // Remove nulls if validation fails
        return data as CMSItem[];
    };

    try {
        const data = await fetchedData();
        return data;
    } catch (error) {
        console.error('Error fetching CMS data:', error);
        return [];
    }
};
