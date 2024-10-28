import { create } from 'zustand';

interface State {
    categoryItems: CollectionItem[];
}

export const useSaleCategoryStore = create<State>((set) => ({
    categoryItems: [
        {
            label: 'Bed',
            subCollection: [
                { label: 'Sheets', href: '/collections/sheets', webPageLabel: 'Bedding', },
                { label: 'Duvet Covers', href: '/collections/duvet-covers', }
            ],
            otherCollection: {
                label: 'Shop by Fabric', subCollection: [
                    { label: 'Luxe', href: '/collections/luxe-sheets', webPageLabel: 'Luxxe Comforts', tag: 'Best Seller' },
                    { label: 'Classic', href: '/collections/classic-sheets' },
                    { label: 'Linen', href: '/collections/linen-sheets' },
                    { label: 'Percale', href: '/collections/percale-sheets' },
                    { label: 'Sateen', href: '/collections/sateen-sheets' }
                ]
            }
        },
        {
            label: 'Bath',
            subCollection: [
                { label: 'Towels', href: '/collections/towels' },
                { label: 'Robes', href: '/collections/robes' },
                { label: 'Shower Curtains', href: '/collections/shower-curtains' },
                { label: 'Bath Mats', href: '/collections/bath-mats' },
                { label: 'Bath Bundles', href: '/collections/bath-bundles' },
            ],
            otherCollection: {
                label: 'Shop by Type', subCollection: [
                    { label: 'Super-Plush', href: '/collections/super-plush-towels' },
                    { label: 'Classic', href: '/collections/classic-towels' },
                    { label: 'Organic Ribbed', href: '/collections/organic-ribbed-towels' },
                    { label: 'Waffle', href: '/collections/waffle-towels' },
                    { label: 'Beach', href: '/collections/beah-bundles' }
                ]
            }
        },
        {
            label: 'Best Sellers',
            subCollection: [
                { label: 'Luxe Core Sheet Set', href: '/collections/luxe-core-sheet-set' },
                { label: 'Super-Plush Robe', href: '/collections/super-plush-robe' },
                { label: 'Classic Core Sheet Set', href: '/collections/classic-core-sheet-set' },
                { label: 'Luxe Move-In Bundle', href: '/collections/luxe-move-in-bundle' },
                { label: 'Luxe Hardcore Sheet', href: '/collections/luxe-hardcore-sheet' }
            ],
        },
        {
            label: 'Home',
            subCollection: [
                { label: 'Candles', href: '/collections/candles' },
                { label: 'Laundry', href: '/collections/laundry' },
                { label: 'Pillows', href: '/collections/pillows' },
            ]
        },
        {
            label: 'New Arrivals',
            subCollection: [
                { label: 'Sheets', href: '/collections/sheets' },
                { label: 'Duvet Covers', href: '/collections/duvet-covers' },
                { label: 'Pillows', href: '/collections/pillows' },
                { label: 'Comforters', href: '/collections/comforters' },
                { label: 'Blankets', href: '/collections/blankets' },
                { label: 'Bedding Bundles', href: '/collections/bedding-bundles', tag: 'SAVE UP TO 30%' }
            ]
        },
        {
            label: 'Sale',
            subCollection: [
                { label: 'Sheets', href: '/collections/sheets' },
                { label: 'Duvet Covers', href: '/collections/duvet-covers' },
                { label: 'Pillows', href: '/collections/pillows' },
                { label: 'Comforters', href: '/collections/comforters' },
                { label: 'Blankets', href: '/collections/blankets' },
                { label: 'Bedding Bundles', href: '/collections/bedding-bundles' }
            ]
        }
    ]
}));