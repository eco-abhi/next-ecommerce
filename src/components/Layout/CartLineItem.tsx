import React, { useEffect } from 'react'
import { currentCart } from '@wix/ecom'
import { useCartStore } from '@/store/cartStore'
import { useWixClient } from '@/hooks/useWixClient';
import { media as wixMedia } from '@wix/sdk'
import Image from 'next/image'
import { CartLineItemSkeleton } from './CartLineItemSkeleton';


interface CartLineItemProps {
    cartLineItem: currentCart.LineItem
}

const createArrayFromOneToN = (n: number) => Array.from({ length: n }, (_, i) => i + 1)

export const CartLineItem = ({ cartLineItem }: CartLineItemProps) => {

    const [quantity, setQuantity] = React.useState(cartLineItem.quantity)

    const { maxQty, updateItemQuantity, isLoading, removeItem } = useCartStore()

    const color = cartLineItem.descriptionLines?.find(
        (attribute) => attribute?.name?.original === "Color" && attribute)?.colorInfo?.original || "";

    const size = cartLineItem.descriptionLines?.find(
        (attribute) => attribute?.name?.original === "Size" && attribute.plainText
    )?.plainText?.original || "";

    const wixClient = useWixClient()

    const handleQuantitychange = (newQuantity: number) => {

        setQuantity(newQuantity);

        if (cartLineItem.rootCatalogItemId) {
            updateItemQuantity(
                wixClient,
                cartLineItem.rootCatalogItemId,
                cartLineItem._id ? cartLineItem._id : "",
                newQuantity || 0,
            );
        }
    }

    return (
        isLoading ? (
            <CartLineItemSkeleton />
        ) :

            (<div className="group">
                <div className="flex items-start gap-6 py-6 transition-all duration-200 hover:bg-gray-50/50 px-4 rounded-xl">
                    <div className="relative aspect-square h-24 w-24 min-w-24 overflow-hidden rounded-xl bg-gray-100">
                        {cartLineItem.image && (
                            <Image
                                src={wixMedia.getScaledToFillImageUrl(cartLineItem.image, 72, 96, {})}
                                alt={cartLineItem.productName?.original || "Product image"}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                width={72}
                                height={96}
                            />
                        )}
                    </div>

                    <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-medium text-gray-900">
                                    {cartLineItem.productName?.original}
                                </h3>
                                <div className="mt-1 space-y-0.5">
                                    {size && <p className="text-sm text-gray-500">Size: {size}</p>}
                                    {color && <p className="text-sm text-gray-500">Color: {color}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-500 line-through">
                                        {cartLineItem.price?.formattedAmount}
                                    </span>
                                    <span className="font-medium text-gray-900">
                                        {cartLineItem.price?.formattedAmount}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <label htmlFor="quantity" className="text-sm text-gray-600">
                                    Quantity:
                                </label>
                                <select
                                    id="quantity"
                                    className="rounded-lg border-gray-200 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:ring-blue-500"
                                    defaultValue={quantity}
                                    onChange={(e) => {
                                        const newQuantity = parseInt(e.target.value);
                                        if (newQuantity !== quantity) {
                                            handleQuantitychange(newQuantity);
                                        }
                                    }}
                                >
                                    {cartLineItem.rootCatalogItemId &&
                                        createArrayFromOneToN(maxQty[cartLineItem.rootCatalogItemId]).map((qty) => (
                                            <option key={qty} value={qty}>
                                                {qty}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <button
                                className="text-sm text-blue-500 transition-colors hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                disabled={isLoading}
                                onClick={() => removeItem(wixClient, cartLineItem._id!)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
                <div className="h-px w-full bg-gray-100" />
            </div>
            ))
}

export default React.memo(CartLineItem);
