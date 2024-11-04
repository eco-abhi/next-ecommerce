import { fetchCMSData } from "./fetchCMSData";
import { wixClientServer } from "@/lib/wixClientServer";
import { convertWixUrl } from "@/utils/convertWixUrl";





export const fetchHeroData = async () => {
    // Fetch Wix client
    const wixClient = await wixClientServer();

    // Fetch Hero data
    const fetchedData = await fetchCMSData(wixClient, "HeroImages");
    const heroData: CarouselItem[] = fetchedData.map((item) => ({
        ...item,
        dataCollectionId: item.dataCollectionId,
        _id: item._id,
        data: {
            ...item.data,
            image: item.data.image ? convertWixUrl(item.data.image) : undefined,
        },
    }));

    return heroData;
}