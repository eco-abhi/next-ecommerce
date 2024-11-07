'use client'
import React, { useEffect, useState } from 'react';
import MessageCarousel from '@/components/layout/MessageCarousel';
import DesktopNavMenu from '@/components/layout/DesktopNavMenu';
import MobileNavMenu from '@/components/layout/MobileNavMenu';
import { useSearchBarStore } from '@/store/searchBarStore';
// import SearchBar from '@/components/Layout/SearchBar';
import InfiniteCarousel from '@/components/layout/Carl';

interface CarouselIt {
    id: number;
    bgColor: string;
    pattern: string;
}

const Page = () => {

    const carouselItems: CarouselIt[] = [
        { id: 1, bgColor: 'bg-emerald-700', pattern: 'hand-eyes' },
        { id: 2, bgColor: 'bg-purple-200', pattern: 'dots' },
        { id: 3, bgColor: 'bg-blue-500', pattern: 'abstract' },
    ];

    return (
        <div className="w-full">
            <span>Page</span>
            <InfiniteCarousel
                items={carouselItems}
                className="max-w-2xl mx-auto"
            />
        </div>
    );
};

export default Page;
