import { create } from 'zustand';

interface State {
    categoryItems: CollectionItem[];
}

export const useSaleCategoryStore = create<State>((set) => ({
    categoryItems: [
        {
            'label': 'Bed',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' }
            ]
        },
        {
            'label': 'Bath',
            'subCollection': [
                { 'label': 'Towels', 'href': '/collections/towels' },
                { 'label': 'Robes', 'href': '/collections/robes' },
                { 'label': 'Shower Curtains', 'href': '/collections/shower-curtains' },
                { 'label': 'Bath Mats', 'href': '/collections/bath-mats' },
                { 'label': 'Bath Bundles', 'href': '/collections/bath-bundles' }
            ]
        },
        {
            'label': 'Best Sellers',
            'subCollection': [
                { 'label': 'Luxe Core Sheet Set', 'href': '/collections/luxe-core-sheet-set' },
                { 'label': 'Super-Plush Robe', 'href': '/collections/super-plush-robe' },
                { 'label': 'Classic Core Sheet Set', 'href': '/collections/classic-core-sheet-set' },
                { 'label': 'Luxe Move-In Bundle', 'href': '/collections/luxe-move-in-bundle' },
                { 'label': 'Luxe Hardcore Sheet', 'href': '/collections/luxe-hardcore-sheet' }
            ]
        },
        {
            'label': 'Home',
            'subCollection': [
                { 'label': 'Candles', 'href': '/collections/candles' },
                { 'label': 'Laundry', 'href': '/collections/laundry' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
            ]
        },
        {
            'label': 'New Arrivals',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
                { 'label': 'Comforters', 'href': '/collections/comforters' },
                { 'label': 'Blankets', 'href': '/collections/blankets' },
                { 'label': 'Bedding Bundles', 'href': '/collections/bedding-bundles', 'tag': 'SAVE UP TO 30%' }
            ]
        },
        {
            'label': 'Sale',
            'subCollection': [
                { 'label': 'Sheets', 'href': '/collections/sheets' },
                { 'label': 'Duvet Covers', 'href': '/collections/duvet-covers' },
                { 'label': 'Pillows', 'href': '/collections/pillows' },
                { 'label': 'Comforters', 'href': '/collections/comforters' },
                { 'label': 'Blankets', 'href': '/collections/blankets' },
                { 'label': 'Bedding Bundles', 'href': '/collections/bedding-bundles' }
            ]
        }
    ]
}));