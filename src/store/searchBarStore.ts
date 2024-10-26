import { create } from 'zustand';

interface SearchBarState {
    openSearchBar: boolean;
    searchBarInputText: string;
    toggleOpenSearchBar: (isOpen: boolean) => void;
    setSearchBarInputText: (text: string) => void;
}

export const useSearchBarStore = create<SearchBarState>((set) => ({
    openSearchBar: false,
    searchBarInputText: '',
    toggleOpenSearchBar: (bool) => set({ openSearchBar: bool }),
    setSearchBarInputText: (text) => set({ searchBarInputText: text }),
}));

