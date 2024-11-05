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

interface SheetProductDetailsProps {
    images: string[];
    slug: string;
}

const SheetProductDetails: React.FC<SheetProductDetailsProps> = ({ images, slug }) => {



    const [index, setIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(true);


    const onClose = () => setIsOpen(false);

    return (
        <div className='ml-24 font-geograph'>
            <ProductInfo
                title='Sheet Title'
                rating={4.5}
                reviewCount={100}
                originalPrice='$100'
                discountedPrice='$80'
                discounts={[
                    { label: '20% OFF', color: 'green' },
                    { label: 'Free Shipping', color: 'blue' },
                ]}
                whatsIncluded='Includes 1 bedsheet, 2 pillow covers, and 1 duvet cover' />

            <ProductImageCarousel images={images} />
            <ProductDetailAccordion />
            <ProductColorSelector colors={[
                { name: 'White', color: '#FFFFFF' },
                { name: 'Black', color: '#000000' },
            ]} />
            <ProductSizeSelector
                sizes={[
                    { label: 'Single' },
                    { label: 'Double' },
                    { label: 'King' },
                    { label: 'Queen' },
                    { label: 'Cali King' },
                ]}
            />
            <ProductSizeModal isOpen={isOpen} onClose={onClose} children={<SheetSizeGuideTable data={
                [
                    {
                        'name': 'Single',
                        'duvetCover': '140x200',
                        'fittedSheet': '90x190',
                        'flatSheet': '180x290',
                        'pillowcases': '50x75'
                    },
                    {
                        'name': 'Double',
                        'duvetCover': '200x200',
                        'fittedSheet': '140x190',
                        'flatSheet': '230x290',
                        'pillowcases': '50x75'
                    },
                    {
                        'name': 'King',
                        'duvetCover': '230x220',
                        'fittedSheet': '150x200',
                        'flatSheet': '275x295',
                        'pillowcases': '50x75'
                    },
                    {
                        'name': 'Queen',
                        'duvetCover': '230x220',
                        'fittedSheet': '150x200',
                        'flatSheet': '275x295',
                        'pillowcases': '50x75'
                    },
                    {
                        'name': 'Cali King',
                        'duvetCover': '230x220',
                        'fittedSheet': '150x200',
                        'flatSheet': '275x295',
                        'pillowcases': '50x75'
                    }
                ]


            } />} />
        </div>

    );
};

export default SheetProductDetails;