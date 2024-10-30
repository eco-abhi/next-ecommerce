"use client"
import { useEffect, useCallback, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchBarStore } from "@/store/searchBarStore";

interface SearchBarProps {
    isOpen: boolean;
    onClose: () => void;
}

function SearchBar({ isOpen, onClose }: SearchBarProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);
    const { searchBarInputText, setSearchBarInputText } = useSearchBarStore();
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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter') handleSearchSubmit();
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, handleSearchSubmit, onClose]);


    if (!shouldRender) return null;

    return (
        <>
            <div className={`fixed inset-0 z-[501] bg-black transition-opacity ${isAnimating ? 'bg-opacity-30' : 'bg-opacity-0'}`}></div>


            <div
                onClick={onClose}
                className="absolute inset-0 z-[503]"

            />
            <div className="fixed tablet:top-10 top-12 left-0 right-0 z-[1000] flex justify-center h-[88px] bg-white" >
                <div className="w-full max-w-xl font-yantramanav bg-white p-4 flex items-center justify-center">
                    <div className="relative flex items-center w-full">

                        <Image
                            src="/search.svg"
                            alt="Search"
                            width={20}
                            height={20}
                            className="absolute left-3 h-5 w-5 text-gray-400"
                            priority
                        />

                        <input
                            autoFocus
                            name="search-name"
                            value={searchBarInputText}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Search Brooklinen"
                            className="w-full py-2 pl-10 pr-10 rounded-lg outline-none font-light bg-white"
                        />

                        <Image
                            onClick={handleSearchClose}
                            src="/close-button.svg"
                            alt="Close"
                            width={25}
                            height={25}
                            className="cursor-pointer"
                            priority
                        />

                    </div>

                    {searchBarInputText.length > 2 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-[#FCFAF8] rounded-3xl shadow-lg border border-gray-200 overflow-hidden pb-4">
                            <div className="border-t border-gray-100">
                                <button
                                    className="w-full p-3 text-blue-600 hover:bg-gray-50 font-medium text-left"
                                    onClick={handleSearchSubmit}
                                >
                                    <span className="font-semibold text-[#04247D] hover:underline underline-offset-4 text-base font-yantramanav px-4">
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
