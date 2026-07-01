import { Link } from "react-router-dom";
import { useEffect } from "react";
import { store } from "../lib/store";
import Container from "../ui/Container";
import toast from "react-hot-toast";

const Success = () => {
  const { resetCart } = store();

  useEffect(() => {
    resetCart();
    toast.success("Payment Successful!");
  }, []);

  return (
    <Container>
      <div className="min-h-[400px] flex flex-col items-center justify-center gap-y-5">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Payment Successful 🎉
        </h2>

        <p className="text-center text-gray-600 max-w-lg">
          Thank you for your purchase! Your order has been placed successfully.
          You can view your order details or continue shopping.
        </p>

        <div className="flex items-center gap-x-5">
          <Link to="/orders">
            <button className="bg-black text-white w-52 h-12 rounded-full text-base font-semibold hover:bg-gray-800 duration-300">
              View Orders
            </button>
          </Link>

          <Link to="/">
            <button className="bg-black text-white w-52 h-12 rounded-full text-base font-semibold hover:bg-gray-800 duration-300">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Success;