declare type MenuItem = {
    label: string;
    href: Url;
};

declare interface CarouselItem {
    _id: string;
    dataCollectionId: string;
    data: CMSItem

};

declare type CMSItem = {
    id: number;
    _id: string;
    title: string;
    subtitle?: string;
    url: string;
    image: string;
    background?: string;
    [key: string]: any; // To allow other dynamic fields if needed
};

declare type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

declare interface CarouselProps {
    data: CarouselItem[];
}

declare interface MobileSubMenuDropdownProps {
    subMenuItems: CollectionItem[];
    closeMenu: (bool: boolean) => void;
    otherCollection?: CollectionItem;
}

declare interface DesktopMenuDropdownProps {
    subMenuItems: CollectionItem[];
    otherCollection?: CollectionItem;
}

declare type SubMenuItem = {
    label: string;
    href: Url;
    tag?: string;
}

declare interface MobileSubMenuProps {
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
