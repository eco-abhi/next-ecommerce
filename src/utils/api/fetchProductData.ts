import { wixClientServer } from "@/lib/wixClientServer";
import { notFound } from "next/navigation";
import { productDataValidation } from "@/lib/actions/productDataValidation";
import { products } from "@wix/stores";

// Fetch function with validation
export const fetchProductData = async ({ slug }: { slug: string }): Promise<products.Product> => {
    // Fetch Wix client
    const wixClient = await wixClientServer();

    // Fetch product data
    const fetchedProductData = await wixClient.products.queryProducts().eq('slug', slug).find();


    // Handle missing data
    if (!fetchedProductData || fetchedProductData.items.length === 0) {
        return notFound();
    }

    // Type assertion to Product type
    const product = fetchedProductData.items[0] as products.Product;

    return product;
};