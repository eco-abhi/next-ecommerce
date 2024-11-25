import React, { useEffect } from "react";
import Ship from "../../../public/ship.svg";
import Tote from "../../../public/tote.svg";
import CartLineItem from "./CartLineItem";
import { media as wixMedia } from "@wix/sdk";
import { useCartStore } from "@/store/cartStore";



const CartSummary = () => {

  const { cart } = useCartStore();

  console.log("CartSummary rendered", cart);

  const [deliveryDiscountProgress, setDeliveryDiscountProgress] = React.useState<number>(0);
  const [progessPercentage, setProgressPercentage] = React.useState<number>(0);
  const [cartDiscountText, setCartDiscountText] = React.useState<string>("");

  React.useEffect(() => {
    if (cart && cart.subtotal.amount < 100) {
      setCartDiscountText(`You are just $${(100 - parseFloat(cart.subtotal.amount)).toFixed(2)} away from free shipping!`);
      setProgressPercentage((cart.subtotal.amount / 100) * 100);
    } else if (cart && cart.subtotal.amount >= 100) {
      setCartDiscountText("Congratulations! You've unlocked free shipping!");
      setProgressPercentage(100);
    }
    console.log("CartSummary useEffect", cart.subtotal.amount);
  }, [cart.lineItems]);


  return (
    <div className="p-2 bg-white rounded-lg">
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
        <div className="absolute top-0 left-0 h-1 bg-orange-500 rounded-full" style={{ width: `${progessPercentage}%` }} />
      </div>
      <p className="text-sm text-gray-700 mt-4 text-center">
        {cart.subtotal.amount < 100 ? (
          <>
            You are just{" "}
            <span className="font-semibold text-orange-500">
              ${Math.abs(100 - cart.subtotal.amount).toFixed(2)}
            </span>{" "}
            away from free shipping!
          </>
        ) : (
          <span className="font-semibold text-green-500">
            Congratulations! You've unlocked free shipping!
          </span>
        )}
      </p>

      {/* Stock Alert
      <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-lg">
        <p className="text-sm text-blue-700 flex items-center">
          <span className="material-icons text-lg mr-2">hourglass_empty</span>
          These items are moving fast! Checkout to make sure your items are still in stock.
        </p>
      </div> */}

      {/* Product Item */}
      <div className="flex-1 max-h-80 overflow-y-auto p-4 space-y-4">
        {cart.lineItems && cart.lineItems.map(item => (<CartLineItem key={item._id} cartLineItem={item} />))}
      </div>


      {/* Checkout Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-6 mb-9 space-y-6">

        {/* Savings */}
        <div className="mt-4 bg-primary-gray p-2">
          <p className="text-text-color-higlighted font-bold text-sm text-center">You saved $86.24!</p>
        </div>

        {/* Order Summary */}
        <div className="flex justify-between text-gray-800">
          <p>Subtotal</p>
          <p>{cart.subtotal.formattedAmount}</p>
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



