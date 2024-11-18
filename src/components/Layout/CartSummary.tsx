import React from "react";
import Ship from "../../../public/ship.svg";
import Tote from "../../../public/tote.svg";

const CartSummary: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-2 bg-white rounded-lg">
      {/* Free Shipping and Free Tote Progress */}
      <div className="flex items-center justify-between px-11">
        <div className="flex items-center space-y-2 flex-col">
          <Ship className="w-6 h-6" />
          <span className="text-orange-500 font-semibold text-xs">Free Shipping</span>
        </div>
        <div className="flex items-center space-y-2 flex-col">
          <Tote className="w-6 h-6" />
          <div className="text-gray-500 font-semibold text-xs">Free Tote</div>
        </div>
      </div>
      <div className="relative mt-4 w-full h-1 bg-gray-200 rounded-full">
        <div className="absolute top-0 left-0 h-1 bg-orange-500 rounded-full" style={{ width: "80%" }} />
      </div>
      <p className="text-sm text-gray-700 mt-4 text-center">
        You're just <span className="font-semibold text-orange-500">$90.24</span> away from a Free Tote!
      </p>

      {/* Stock Alert
      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
        <p className="text-sm text-blue-700 flex items-center">
          <span className="material-icons text-lg mr-2">hourglass_empty</span>
          These items are moving fast! Checkout to make sure your items are still in stock.
        </p>
      </div> */}

      {/* Product Item */}
      <div className="flex mt-12 items-center">
        <div className="flex flex-col space-y-8">
          <img
            src="/path/to/pillow.jpg"
            alt="Marlow Pillow"
            className="w-20 h-20 object-cover rounded-lg"
          />
          <button className="text-sm text-blue-500 underline">Remove</button>
        </div>
        <div className="ml-4 flex-1 space-y-3">
          <p className="font-semibold">Marlow Pillow</p>
          <p className="text-gray-600 text-sm">Blue</p>
          <p className="text-gray-600 text-sm">Size: Standard</p>
          <span className="flex flex-row space-x-3">
            <p className="text-gray-500 text-base line-through">$196</p>
            <p className="font-semibold text-base text-gray-800">$109.76</p>
          </span>

        </div>
        <div>
          <label htmlFor="quantity" className="sr-only">Quantity</label>
          <select
            id="quantity"
            className="border border-gray-300 rounded-md p-2 text-gray-600"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((qty) => (
              <option key={qty} value={qty}>
                {qty}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative mt-5 w-full h-[1px] bg-gray-300 rounded-full" />

      {/* Checkout Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-6 mb-9 space-y-6">

        {/* Savings */}
        <div className="mt-4 bg-primary-gray p-2">
          <p className="text-text-color-higlighted font-bold text-sm text-center">You saved $86.24!</p>
        </div>

        {/* Order Summary */}
        <div className="flex justify-between text-gray-800">
          <p>Subtotal</p>
          <p>$109.76</p>
        </div>
        {/* Checkout Button */}
        <button className="w-full py-3 px-4 bg-blue-900 text-white text-lg font-semibold hover:bg-blue-800 transition duration-300">
          Checkout
        </button>
        {/* Promo Code Text */}
        <p className="mt-3 text-sm text-gray-600 text-center">
          Have a promo code? Enter it on the next page.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
