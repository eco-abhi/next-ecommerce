// 'use client' is removed because this is a server component

import { fetchProductData } from '@/utils/api/fetchProductData';
import SheetProductDetails from '@/components/productPages/Bedsheets/SheetProductDetails';
import { products } from '@wix/stores';

const ProductPage = async ({ params }: { params: { slug: string; category: string } }) => {
    console.log('searchParams', params);

    const { slug, category } = params;

    // Fetch product data
    const productData: products.Product | null = await fetchProductData({ slug });

    // Handle missing product data
    if (!productData) {
        return <div>Product not found</div>;
    }

    // Extract product data
    // Get product name
    const productId = productData?._id ?? '';
    console.log('productId', productId);
    const productTitle = productData?.name ?? '';

    // Get variants
    const variants = productData?.variants ?? [];

    const productOptions = productData?.productOptions ?? [];

    const productImages = productData?.media?.items ?? [];

    // const productOptions = productData?.productOptions ?? [];

    // console.log('product', product);



    //    const productOptions = product?.customTextFields || [];
    //     const productTitle: string = product?.name || '';
    //     const variants = product?.variants || [];
    //     // console.log('productTitle', product)

    // Render the component based on the category
    const renderProductComponent = () => {
        switch (category) {
            case 'products':
                return (
                    <SheetProductDetails
                        slug={slug as string}
                        images={productImages}
                        productTitle={productTitle}
                        productRating={4.5}
                        reviewCount={100}
                        productOptions={productOptions}
                        variants={variants}
                        productId={productId}
                    />
                    // <></>
                );
            // Add more cases for other categories as needed
            default:
                return <div>Product not found</div>;
        }
    };

    return <div className='z-[10]'>{renderProductComponent()}</div>;
};

export default ProductPage;
