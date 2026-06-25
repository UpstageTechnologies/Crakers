import type { ProductProps } from "../../type";
import { store } from "../lib/store";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutBtn = ({ products }: { products: ProductProps[] }) => {
  const { currentUser } = store();

  const handleCheckout = () => {
    if (!currentUser) {
      alert("Please login first");
      return;
    }

    if (!currentUser?.address) {
      alert("Please add delivery address first");
      return;
    }

    try {
      const totalAmount = products.reduce(
        (total, item) => total + Number(item.discountedPrice) * Number(item.quantity),
        0
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: totalAmount * 100, 
        currency: "INR",
        name: "Crackers Store",
        description: "Order Payment (Frontend Only Test)",
        handler: function (response: any) {
          alert("Payment Successful");
          console.log(response);
        },
        prefill: {
          email: currentUser?.email,
        },
        theme: {
          color: "#0F172A",
        },
      };

      if (window.Razorpay) {
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Razorpay SDK not loaded");
      }
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  return (
    <div className="mt-6">
      {currentUser ? (
        <button
          onClick={handleCheckout}
          type="button"
          className="w-full rounded-md border border-transparent bg-gray-800 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-skyText focus:ring-offset-2 focus:ring-offset-gray-50 duration-200"
        >
          Checkout
        </button>
      ) : (
        <button className="w-full text-base text-white text-center rounded-md border border-transparent bg-gray-500 px-4 py-3 cursor-not-allowed">
          Checkout
        </button>
      )}
      {!currentUser && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to sign in to make checkout
        </p>
      )}
      {currentUser && !currentUser?.address && (
        <p className="mt-2 text-sm font-medium text-red-500 text-center">
          Need to add address for delivery
        </p>
      )}
    </div>
  );
};

export default CheckoutBtn;