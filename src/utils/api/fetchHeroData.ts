import { fetchCMSData } from "./fetchCMSData";
import { wixClientServer } from "@/lib/wixClientServer";
import { convertWixUrl } from "@/utils/convertWixUrl";
import { CMSItemSchema } from "@/lib/schemas/CMSItemSchema";

export const fetchHeroData = async () => {
    // Fetch Wix client
    const wixClient = await wixClientServer();

    // Fetch Hero data
    const fetchedData = await fetchCMSData(wixClient, "HeroImages");

    // Validate and transform data
    const heroData = fetchedData.map((item) => {
        const parsedItem = CMSItemSchema.safeParse(item);

        if (!parsedItem.success) {
            console.error("Validation error for item:", parsedItem.error);
            return null; // Handle invalid item (e.g., skip it)
        }

        // If valid, apply transformations
        return {
            ...parsedItem.data,
            dataCollectionId: parsedItem.data.dataCollectionId,
            _id: parsedItem.data._id,
            data: {
                ...parsedItem.data.data,
                image: parsedItem.data.data.image ? convertWixUrl(parsedItem.data.data.image) : undefined,
            },
        };
    }).filter((item): item is CarouselItem => item !== null); // Filter out nulls for valid CarouselItem[] type

    return heroData;
};
