import { z } from 'zod';

export const ProductSchema = z.object({
    name: z.string(),
    slug: z.string(),
    visible: z.boolean().optional(),
    productType: z.string().optional(),
    description: z.string().optional(),
    sku: z.string().optional(),
    weight: z.number().optional(),
    weightRange: z.object({
        minValue: z.number().optional(),
        maxValue: z.number().optional(),
    }).optional(),
    stock: z.object({
        trackInventory: z.boolean().optional(),
        inStock: z.boolean().optional(),
        inventoryStatus: z.string().optional(),
    }).optional(),
    price: z.object({
        currency: z.string().optional(),
        price: z.number().optional(),
        discountedPrice: z.number().optional(),
        formatted: z.object({
            price: z.string().optional(),
            discountedPrice: z.string().optional(),
            pricePerUnit: z.string().optional(),
        }).optional(),
        pricePerUnit: z.number().optional(),
    }).optional(),
    priceData: z.object({
        currency: z.string().optional(),
        price: z.number().optional(),
        discountedPrice: z.number().optional(),
        formatted: z.object({
            price: z.string().optional(),
            discountedPrice: z.string().optional(),
            pricePerUnit: z.string().optional(),
        }).optional(),
        pricePerUnit: z.number().optional(),
    }).optional(),
    convertedPriceData: z.object({
        currency: z.string().optional(),
        price: z.number().optional(),
        discountedPrice: z.number().optional(),
        formatted: z.object({
            price: z.string().optional(),
            discountedPrice: z.string().optional(),
            pricePerUnit: z.string().optional(),
        }).optional(),
        pricePerUnit: z.number().optional(),
    }).optional(),
    priceRange: z.object({
        minValue: z.number().optional(),
        maxValue: z.number().optional(),
    }).optional(),
    costRange: z.object({
        minValue: z.number().optional(),
        maxValue: z.number().optional(),
    }).optional(),
    additionalInfoSections: z.array(
        z.object({
            title: z.string().optional(),
            description: z.string().optional(),
        })
    ).optional(),
    ribbons: z.array(
        z.object({
            text: z.string().optional(),
        })
    ).optional(),
    media: z.object({
        mainMedia: z.object({
            thumbnail: z.object({
                url: z.string().url().optional(),
                width: z.number().optional(),
                height: z.number().optional(),
            }).optional(),
            mediaType: z.string().optional(),
            title: z.string().optional(),
            image: z.object({
                url: z.string().url().optional(),
                width: z.number().optional(),
                height: z.number().optional(),
            }).optional(),
            id: z.string().optional(),
        }).optional(),
        items: z.array(
            z.object({
                thumbnail: z.object({
                    url: z.string().url().optional(),
                    width: z.number().optional(),
                    height: z.number().optional(),
                }).optional(),
                mediaType: z.string().optional(),
                title: z.string().optional(),
                image: z.object({
                    url: z.string().url().optional(),
                    width: z.number().optional(),
                    height: z.number().optional(),
                }).optional(),
                id: z.string().optional(),
            })
        ).optional(),
    }).optional(),
    customTextFields: z.array(
        z.object({
            title: z.string().optional(),
            maxLength: z.number().optional(),
            mandatory: z.boolean().optional(),
        })
    ).optional(),
    manageVariants: z.boolean().optional(),
    productOptions: z.array(
        z.object({
            optionType: z.string().optional(),
            name: z.string().optional(),
            choices: z.array(
                z.object({
                    value: z.string().optional(),
                    description: z.string().optional(),
                    media: z.object({
                        items: z.array(z.any()).optional(),
                    }).optional(),
                    inStock: z.boolean().optional(),
                    visible: z.boolean().optional(),
                })
            ).optional(),
        })
    ).optional(),
    productPageUrl: z.object({
        base: z.string().optional(),
        path: z.string().optional(),
    }).optional(),
    numericId: z.string().optional(),
    inventoryItemId: z.string().optional(),
    discount: z.object({
        type: z.string().optional(),
        value: z.number().optional(),
    }).optional(),
    collectionIds: z.array(z.string()).optional(),
    variants: z.array(
        z.object({
            id: z.string().optional(),
            choices: z.record(z.string(), z.string()).optional(),
            variant: z.object({
                priceData: z.object({
                    currency: z.string().optional(),
                    price: z.number().optional(),
                    discountedPrice: z.number().optional(),
                    formatted: z.object({
                        price: z.string().optional(),
                        discountedPrice: z.string().optional(),
                        pricePerUnit: z.string().optional(),
                    }).optional(),
                    pricePerUnit: z.number().optional(),
                }).optional(),
                convertedPriceData: z.object({
                    currency: z.string().optional(),
                    price: z.number().optional(),
                    discountedPrice: z.number().optional(),
                    formatted: z.object({
                        price: z.string().optional(),
                        discountedPrice: z.string().optional(),
                        pricePerUnit: z.string().optional(),
                    }).optional(),
                    pricePerUnit: z.number().optional(),
                }).optional(),
                costAndProfitData: z.object({
                    itemCost: z.number().optional(),
                    formattedItemCost: z.string().optional(),
                    profit: z.number().optional(),
                    formattedProfit: z.string().optional(),
                    profitMargin: z.number().optional(),
                }).optional(),
                weight: z.number().optional(),
                sku: z.string().optional(),
                visible: z.boolean().optional(),
            }).optional(),
        })
    ).optional(),
    lastUpdated: z.string().datetime().optional(),
    createdDate: z.string().datetime().optional(),
    seoData: z.object({
        tags: z.array(
            z.object({
                type: z.string().optional(),
                children: z.string().optional(),
                custom: z.boolean().optional(),
                disabled: z.boolean().optional(),
                props: z.object({
                    name: z.string().optional(),
                    content: z.string().optional(),
                }).optional(),
            })
        ).optional(),
    }).optional(),
    ribbon: z.string().optional(),
    exportProductId: z.string().optional(),
    _id: z.string(),
    _createdDate: z.string().datetime(),
});
