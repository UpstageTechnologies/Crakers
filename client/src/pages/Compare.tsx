import { Link } from "react-router-dom";
import { store } from "../lib/store";
import Container from "../ui/Container";
import CompareProduct from "../ui/CompareProduct";

const Compare = () => {
  const { compareProduct } = store();

  return (
    <Container>
      {compareProduct.length > 0 ? (
        <>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Compare Products
          </h1>

          <div className="mt-10">
            <div className="divide-y divide-gray-200 border-b border-t border-gray-200">
              {compareProduct.map((product) => (
                <CompareProduct
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white h-96 flex flex-col gap-2 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Compare Products
          </h1>

          <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6">
            No products added for comparison.
          </p>

          <Link
            to="/product"
            className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
          >
            Go to Shopping
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Compare;