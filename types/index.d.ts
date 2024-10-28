declare type MenuItem = {
    label: string;
    href: Url;
};

declare interface SubMenuDropdownProps {
    subMenuItems: CollectionItem[];
    closeMenu: (bool: boolean) => void;
    otherCollection?: CollectionItem;
}

declare type SubMenuItem = {
    label: string;
    href: Url;
    tag?: string;
}

declare interface SubMenuProps {
    label: string;
    submenuItems: CollectionItem[];
    otherCollection?: CollectionItem;
    backButtonSelected: (bool: boolean) => void;
    closeMenu: (bool: boolean) => void;

}

declare type CollectionItem = {
    label: string;
    href?: Url;
    subCollection?: CollectionItem[];
    tag?: string;
    webPageLabel?: string;
    otherCollection?: CollectionItem
}

declare interface NanobarProps {
    messages: string[];
}

declare interface Message {
    id: number;
    content: string;
}

interface MessageCarouselProps {
    messages: string[];
    autoPlayInterval?: number;
}
