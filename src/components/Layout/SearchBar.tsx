"use client"
import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchBarStore } from "@/store/searchBarStore";
import CloseButton from "../../../public/close-button.svg";
import useEscapeKey from "@/hooks/useEscapeKey";
import useEnterKey from "@/hooks/useEnterKey";

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

function SearchBar({ isOpen, onClose }: SearchBarProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const { searchBarInputText, setSearchBarInputText } = useSearchBarStore();
    const searchContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBarInputText(e.target.value);
    };

    const handleSearchClose = useCallback(() => {
        setSearchBarInputText('');
        onClose();
    }, [setSearchBarInputText, onClose]);

    const handleSearchSubmit = useCallback(() => {
        if (!searchBarInputText) return;
        router.push(`/search?q=${searchBarInputText}`);
        setSearchBarInputText('');
        onClose();
    }, [searchBarInputText, router, setSearchBarInputText, onClose]);

    useEffect(() => {
        if (isOpen) {
            setShouldRender(true);
            setTimeout(() => setIsAnimating(true), 50); // slight increase to ensure CSS animation
        } else {
            setIsAnimating(false);
            const timer = setTimeout(() => setShouldRender(false), 600);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);


    useEscapeKey(handleSearchClose, isOpen);
    useEnterKey(handleSearchSubmit, isOpen);


    if (!shouldRender) return null;

    return (
        <>
            <div className={`fixed inset-0 z-40 bg-black transition-opacity ${isAnimating ? 'bg-opacity-30 no-doc-scroll' : 'bg-opacity-0'}`}></div>

            <div onClick={handleSearchClose} className="absolute inset-0 z-40" />

            <div ref={searchContainerRef} className={`fixed ${window.scrollY < 4 ? 'top-10' : 'top-0'} left-0 right-0 z-50 flex justify-center h-[88px] bg-white`}>
                <div className="w-full max-w-xl font-geograph bg-white p-4 flex items-center justify-center">
                    <div className="relative flex items-center w-full">
                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={24}
                            height={24}
                            className="absolute left-3 h-5 w-5 text-gray-400"
                            priority
                        />
                        <input
                            autoFocus
                            name="search-name"
                            value={searchBarInputText}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search My Home Theory"
                            className="w-full py-2 pl-10 pr-10 rounded-lg outline-none font-light bg-white"
                        />
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                        >
                            <CloseButton className="h-5 w-5" />
                        </button>
                    </div>

                    {searchBarInputText.length > 2 && (
                        <div className="absolute w-full max-w-xl right-0 flex justify-center top-20 left-1/2 transform -translate-x-1/2">
                            <div className="bg-white rounded-b-3xl shadow-lg border-b-gray-200 overflow-hidden pb-4 w-full">
                                <button
                                    className="w-full p-3 text-blue-600 font-medium text-left"
                                    onClick={handleSearchSubmit}
                                >
                                    <span className="font-semibold text-[#04247D] hover:underline underline-offset-4 text-base font-geograph px-4">
                                        View all search results for {searchBarInputText}
                                    </span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>

    );
}

export default SearchBar;
