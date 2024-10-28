import { create } from 'zustand';

interface State {
    navItems: MenuItem[];
}

export const useNavLinkStore = create<State>((set) => ({

    navItems: [{ 'label': 'Our Stores', 'href': '/collections/' },
    { 'label': 'Reviews', 'href': '/collections/' },
    { 'label': 'About', 'href': '/collections/' },
    { 'label': 'Login', 'href': '/login' },
    ]

}))