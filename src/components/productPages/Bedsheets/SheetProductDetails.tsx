'use client';

import { products } from "@wix/stores";
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
import { motion, useScroll, useTransform } from 'motion/react';
import { Container } from "postcss";


interface SheetProductDetailsProps {
    images: products.MediaItem[];
    slug: string;
    productTitle: string;
    productRating: number;
    reviewCount: number;
    originalPrice?: string;
    variants: products.Variant[];
    productId: string;
    // discountedPrice: string;
    // discounts: { label: string; color: string }[];
    // productSizes: { label: string }[];
    productOptions: products.ProductOption[];
}

function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


const SheetProductDetails: React.FC<SheetProductDetailsProps> = ({ images, variants, productOptions, productTitle, productId }) => {
    const [cartModalOpen, setCartModalOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<{
        [key: string]: string;
    }>({});
    const [selectedVariant, setSelectedVariant] = useState<products.Variant>();

    const contentRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    // Memoize the variant finding logic
    useEffect(() => {
        const findVariant = () => {
            return variants.find((v) => {
                const variantChoices = v.choices;
                if (!variantChoices) return false;
                return Object.entries(selectedOptions).every(
                    ([key, value]) => variantChoices[key] === value
                );
            });
        };

        const variant = findVariant();
        if (variant !== selectedVariant) {
            setSelectedVariant(variant);
        }

    }, [selectedOptions, variants]);

    // Memoize the option select handler
    const handleOptionSelect = useCallback((optionType: string, choice: string) => {
        setSelectedOptions(prev => {
            // Only update if the value actually changed
            if (prev[optionType] === choice) return prev;
            return { ...prev, [optionType]: choice };
        });
    }, []);

    // Memoize the isVariantInStock function
    const isVariantInStock = useCallback((choices: { [key: string]: string }) => {
        return variants.some((variant) => {
            const variantChoices = variant.choices;
            if (!variantChoices) return false;

            return (
                Object.entries(choices).every(
                    ([key, value]) => variantChoices[key] === value
                ) &&
                variant.stock?.inStock &&
                variant.stock?.quantity &&
                variant.stock?.quantity > 0
            );
        });
    }, [variants]);

    return (
        <div className="z-[10] font-geograph mx-auto max-w-10xl pt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-screen h-full">
            {/* Product Images */}
            <div className="col-span-1 lg:col-span-6 border ml-28 sticky top-20">
                <div className="w-full border-2 border-red-200">
                    <ProductImageCarousel imageUrls={images} />
                </div>
            </div>

            <div className={`col-span-1 lg:col-span-5 pt-5`} ref={contentRef}>
                <ProductInfo
                    title={productTitle}
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
                {productOptions.map((option) => (
                    <div className="flex flex-col gap-4" key={option.name}>

                        <div className="flex justify-between items-center">
                            {/* Title and Selected Color */}
                            <div className="flex items-center space-x-2">
                                <span className="text-lg font-normal">{option.name}: </span>
                                <span className="text-base font-normal text-gray-700">
                                    {option.name?.toUpperCase() && selectedOptions[capitalizeFirstLetter(option.name)] ? selectedOptions[capitalizeFirstLetter(option.name)] : `Select a ${option.name?.toLowerCase()}`}
                                </span>
                            </div>
                            {/* <h4 className="font-medium">Choose a {option.name}</h4> */}
                            {option.name === "Size" && <button
                                onClick={() => setCartModalOpen(true)}
                                className="text-sm text-gray-600 underline hover:text-gray-800"
                            >
                                Size Guide
                            </button>}
                        </div>


                        <ul className={`${option.name === "Color" ? "flex items-center gap-3" : "grid grid-cols-3 gap-2 mt-2 w-full"}`}>
                            {option.choices?.map((choice, index) => {
                                const disabled = !isVariantInStock({
                                    ...selectedOptions,
                                    [option.name!]: choice.description!,
                                });

                                const selected =
                                    selectedOptions[option.name!] === choice.description;

                                const clickHandler = disabled
                                    ? undefined
                                    : () => handleOptionSelect(option.name!, choice.description!);

                                return option.name === "Color" ? (
                                    <li
                                        className="w-8 h-8 rounded-full ring-1 ring-gray-300 relative"
                                        style={{
                                            backgroundColor: choice.value,
                                            cursor: disabled ? "not-allowed" : "pointer",
                                        }}
                                        onClick={clickHandler}
                                        key={`${choice.description}-${index}`}
                                    >
                                        {selected && (
                                            <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                        {disabled && (
                                            <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                                        )}
                                    </li>






                                ) : (


                                    <li
                                        className="text-nowrap text-center border transition font-medium text-gray-800 py-2 px-4"
                                        style={{
                                            cursor: disabled ? "not-allowed" : "pointer",
                                            backgroundColor: selected
                                                ? "#111827"
                                                : disabled
                                                    ? "#FBCFE8"
                                                    : "white",
                                            color: selected || disabled ? "white" : "#f35c7a",
                                            boxShadow: disabled ? "none" : "",

                                        }}
                                        key={`${choice.description}-${index}`}
                                        onClick={clickHandler}
                                    >
                                        {choice.description}
                                    </li>

                                );
                            })}
                        </ul>
                    </div>

                ))}
                {/* Add to Cart Section */}
                <div className='mt-9'>
                    <AddToCartSection originalPrice={"$100"}
                        discountedPrice={"$80"} productId={productId} variantId={selectedVariant?._id || ''}
                        maxQuantity={selectedVariant?.stock?.quantity || 0}
                    />
                </div>


                {/* Product Details Accordion */}
                <div className='mt-9'>
                    <ProductDetailAccordion />
                </div>
                {/* Size Guide Modal */}
                {(
                    <ProductSizeModal isOpen={cartModalOpen} onClose={() => setCartModalOpen(false)}>
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
        </div>
    );
};


export default React.memo(SheetProductDetails);