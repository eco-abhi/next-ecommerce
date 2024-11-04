// Code to display the homepage
import { fetchHeroData } from "@/utils/api/fetchHeroData";
import ImageCarousel from "@/components/homePage/ImageCarousel";



const HomePage = async () => {

  // Fetch hero data
  const heroData = await fetchHeroData();

  return (
    <>
      <ImageCarousel data={heroData} />
    </>
  );
};

export default HomePage