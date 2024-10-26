"use client"
import { use, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SearchBarProps {
    closeSearchBar: () => void;
}

function SearchBar({ closeSearchBar }: SearchBarProps) {

    const [searchText, setSearchText] = useState('');

    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleSearchClose = () => {
        setSearchText('');
        closeSearchBar();
    }

    const handleSearchSubmit = () => {
        if (searchText) {
            router.push(`/search?q=${searchText}`);
        }
        closeSearchBar();
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto font-yantramanav">
            <div className="relative flex items-center">

                <Image
                    src="/search.svg"
                    alt="Search"
                    width={20}
                    height={20}
                    className="absolute left-3 h-5 w-5 text-gray-400"
                    priority
                />

                <input
                    name="search-name"
                    value={searchText}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Search Brooklinen"
                    className="w-full py-2 pl-10 pr-10 rounded-lg outline-none font-light focus:outline-none bg-[#FCFAF8]"
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

            {searchText.length > 2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#FCFAF8] rounded-3xl shadow-lg border border-gray-200 overflow-hidden pb-4">
                    <div className="border-t border-gray-100">
                        <button
                            className="w-full p-3 text-blue-600 hover:bg-gray-50 font-medium text-left"
                            onClick={handleSearchSubmit}
                        >
                            <span className="font-semibold text-[#04247D] hover:underline underline-offset-4 text-base font-yantramanav px-4">
                                View all search results for {searchText}
                            </span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;