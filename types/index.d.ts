declare type MenuItem = {
    label: string;
    href: Url;
};

declare interface SubMenuDropdownProps {
    subMenuItems: CollectionItem[];
    closeMenu: (bool: boolean) => void;
}

declare type SubMenuItem = {
    label: string;
    href: Url;
    tag?: string;
}

declare interface SubMenuProps {
    label: string;
    submenuItems: CollectionItem[];
    backButtonSelected: (bool: boolean) => void;
    closeMenu: (bool: boolean) => void;

}

declare type CollectionItem = {
    label: string;
    href?: Url;
    subCollection?: CollectionItem[];
    tag?: string;
}

declare interface NanobarProps {
    messages: string[];
}