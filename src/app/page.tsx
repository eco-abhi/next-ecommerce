'use client';

import { useEffect, useState } from "react"
import { fetchCMSData } from '../utils/api/fetchCMSData'
import { useWixClient } from "../hooks/useWixClient"
import { convertWixUrl } from "@/utils/convertWixUrl";
import ImageCarousel from "@/components/homePage/ImageCarousel";



const HomePage = () => {

  const [heroData, setHeroData] = useState<any[]>([])
  const wixClient = useWixClient()

  useEffect(() => {
    // Fetch data
    fetchCMSData(wixClient, "HeroImages").then((fetchedData) => {
      // Ensure `item.data.image` is handled correctly
      const updatedData = fetchedData.map((item) => ({
        ...item,
        data: {
          ...item.data,
          image: item.data.image ? convertWixUrl(item.data.image) : item.data.image, // Convert if image exists
        },
      }));
      setHeroData(updatedData);
    });
  }, [wixClient]);



  return (
    <>
      <ImageCarousel data={heroData} />
    </>

  )
}

export default HomePage