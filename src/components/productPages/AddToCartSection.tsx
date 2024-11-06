import React, { useState } from 'react';
import { FaTruckFast } from "react-icons/fa6";

interface AddToCartSectionProps {
  onAddToCart: (quantity: number) => void;
  maxQuantity?: number;
  discountedPrice?: string;
  originalPrice: string;
}

const AddToCartSection: React.FC<AddToCartSectionProps> = ({ onAddToCart, maxQuantity = 10, discountedPrice, originalPrice }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart(quantity);
  };

  return (
    <div className="space-y-4">
      {/* Free Shipping Information */}
      <div className="flex items-center space-x-2 text-gray-800">
        <FaTruckFast className="text-lg" />
        <span className="font-semibold">FREE SHIPPING</span>
        <span className="text-gray-600">on orders $40 and above</span>
      </div>

      {/* Add to Cart and Quantity Selector */}
      <div className="flex items-center space-x-4">
        <button
          onClick={handleAddToCart}
          className="bg-gray-800 border text-white px-6 py-3 w-3/5 font-semibold transition space-x-2 hover:bg-white hover:border-gray-800 hover:text-black hover:border"
        >
          <span className='mr-1'>{"ADD TO CART -"}</span>

          {discountedPrice ? (
            <>
              <span className="line-through mr-1 text-gray-400">{originalPrice}</span>
              <span>{discountedPrice}</span>
            </>
          ) : (
            <span>{originalPrice}</span>
          )}
        </button>

        <select
          value={quantity}
          onChange={handleQuantityChange}
          className="border border-gray-500 rounded-md px-6 py-3 font-medium text-gray-800 focus:outline-none"
        >
          {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AddToCartSection;
