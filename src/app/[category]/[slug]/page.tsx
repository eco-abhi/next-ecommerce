'use client';

import { useParams } from 'next/navigation';
import SheetProductDetails from '@/components/productPages/Bedsheets/SheetProductDetails';

const ProductPage = () => {
    const params = useParams();
    const { category, slug } = params;

    if (!category || !slug) return null; // Handle loading or invalid state

    // Render the component based on the category
    const renderProductComponent = () => {
        switch (category) {
            case 'products':
                return (
                    <SheetProductDetails
                        slug={slug as string}
                        images={[
                            'https://static.wixstatic.com/media/45d10e_9e18a8d563fc4774a0b917d7f5e07ff6~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_9e18a8d563fc4774a0b917d7f5e07ff6~mv2.jpg',
                            'https://static.wixstatic.com/media/45d10e_15641be40e0c43d89f5426f8949b51bd~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_15641be40e0c43d89f5426f8949b51bd~mv2.jpg',
                            'https://static.wixstatic.com/media/45d10e_1d14719f23fa4277bddd33220562c678~mv2.jpg/v1/fill/w_750,h_750,al_c,q_85,enc_auto/45d10e_1d14719f23fa4277bddd33220562c678~mv2.jpg'
                        ]}
                    />
                );
            // Add more cases for other categories as needed
            default:
                return <div>Product not found</div>;
        }
    };

    return <div>{renderProductComponent()}</div>;
};

export default ProductPage;
