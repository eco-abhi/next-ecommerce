import React, { useState } from 'react';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import { ProductImageCarousel } from '../ProductImageCarousel';
import { ProductDetailAccordion } from '../ProductDetailAccordion';
import ProductColorSelector from '../ProductColorSelector';
import ProductInfo from '../ProductInfo';
import ProductSizeSelector from '../ProductSizeSelector';
import ProductSizeModal from '../ProductSizeModal';
import SheetSizeGuideTable from './SheetSizeGuideTable';
import AddToCartSection from '../AddToCartSection';
import { useEffect, useRef } from 'react';

interface SheetProductDetailsProps {
    images: string[];
    slug: string;
}

const SheetProductDetails: React.FC<SheetProductDetailsProps> = ({ images, slug }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);

    const onClose = () => setIsOpen(false);

    return (
        <div className="font-geograph mx-auto max-w-10xl pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 space-y-8 lg:space-y-0 border">
            {/* Product Images */}
            <div className="col-span-1 lg:col-span-7 border ml-28">
                <div className="w-full h-full">
                    <ProductImageCarousel images={images} />
                </div>
            </div>

            {/* Product Info and Actions */}
            <div className={`${isScrollable ? 'overflow-y-auto' : ''} col-span-1 lg:col-span-5  border`}>
                {/* Product Info */}
                <ProductInfo
                    title="Sheet Title"
                    rating={3.4}
                    reviewCount={100}
                    originalPrice="$100"
                    discountedPrice="$80"
                    discounts={[
                        { label: '20% OFF', color: 'green' },
                        { label: 'Free Shipping', color: 'blue' },
                    ]}
                    whatsIncluded="Includes 1 bedsheet, 2 pillow covers, and 1 duvet cover"
                />

                {/* Color Selector */}
                <div className='mt-9'>
                    <ProductColorSelector
                        colors={[
                            { name: 'White', color: '#FFFFFF' },
                            { name: 'Black', color: '#000000' },
                            { name: 'Blue', color: '#0000FF' },
                            { name: 'Red', color: '#FF0000' },
                            { name: 'Green', color: '#008000' },
                            { name: 'Yellow', color: '#FFFF00' },
                        ]}
                    />
                </div>

                {/* Size Selector with Size Guide Modal */}
                <div className="flex items-center space-x-4 mt-9">
                    <ProductSizeSelector
                        sizes={[
                            { label: 'Single' },
                            { label: 'Double' },
                            { label: 'King' },
                            { label: 'Queen' },
                            { label: 'Cali King' },
                        ]}
                        sizeGuideModalChild={<button
                            onClick={() => setIsOpen(true)}
                            className="text-sm text-gray-600 underline hover:text-gray-800"
                        >
                            Size Guide
                        </button>}
                    />

                </div>

                {/* Add to Cart Section */}
                <div className='mt-9'>
                    <AddToCartSection onAddToCart={(quantity) => console.log(quantity)} originalPrice={"$100"}
                        discountedPrice={"$80"} />
                </div>


                {/* Product Details Accordion */}
                <div className='mt-9'>
                    <ProductDetailAccordion />
                </div>

            </div>

            {/* Size Guide Modal */}
            {isOpen && (
                <ProductSizeModal isOpen={isOpen} onClose={onClose}>
                    <SheetSizeGuideTable
                        data={[
                            {
                                name: 'Single',
                                duvetCover: '140x200',
                                fittedSheet: '90x190',
                                flatSheet: '180x290',
                                pillowcases: '50x75',
                            },
                            {
                                name: 'Double',
                                duvetCover: '200x200',
                                fittedSheet: '140x190',
                                flatSheet: '230x290',
                                pillowcases: '50x75',
                            },
                            {
                                name: 'King',
                                duvetCover: '230x220',
                                fittedSheet: '150x200',
                                flatSheet: '275x295',
                                pillowcases: '50x75',
                            },
                            {
                                name: 'Queen',
                                duvetCover: '230x220',
                                fittedSheet: '150x200',
                                flatSheet: '275x295',
                                pillowcases: '50x75',
                            },
                            {
                                name: 'Cali King',
                                duvetCover: '230x220',
                                fittedSheet: '150x200',
                                flatSheet: '275x295',
                                pillowcases: '50x75',
                            },
                        ]}
                    />
                </ProductSizeModal>
            )}
        </div>
    );
};

export default SheetProductDetails;
