import { useEffect, useState } from "react";
import { FaRegEye, FaRegStar, FaStar} from "react-icons/fa";
import { LuArrowLeftRight } from "react-icons/lu";
import toast from "react-hot-toast";
import type { ProductProps } from "../../type";
import { store } from "../lib/store";
const ProductCardsSideNav = ({ product }: { product?: ProductProps }) =>{
  const { addToFavorite, favoriteProduct, addToCompare, compareProduct } = store();
  const [existingProduct, setExistingProduct] = useState<ProductProps | null>(
    null
  );
  const [existingCompare, setExistingCompare] =
  useState<ProductProps | null>(null);

  useEffect(() => {
    const availableItem = favoriteProduct.find(
      (item) => item?._id === product?._id
    );
    setExistingProduct(availableItem || null);
    const compareItem = compareProduct.find(
    (item) => item?._id === product?._id
    );
    setExistingCompare(compareItem || null);
    }, [product, favoriteProduct, compareProduct]);

   const handleFavorite = () => {
    if (product) {
      addToFavorite(product).then(() => {
        toast.success(
          existingProduct
            ? `${product?.name.substring(0, 10)} removed successfully!`
            : `${product?.name.substring(0, 10)} added successfully!`
        );
      });
    }}
    const handleCompare = () => {
    if (product) {
      addToCompare(product).then(() => {
        toast.success(
          existingCompare
            ? `${product.name.substring(0, 10)} removed from compare!`
            : `${product.name.substring(0, 10)} added to compare!`
        );
      });
    }};

    return<div  className="absolute right-1 top-1 flex flex-col gap-1 transition translate-x-12 group-hover:translate-x-0 duration-300">
      <span onClick={handleFavorite} className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
         {existingProduct ? <FaStar /> : <FaRegStar />}
      </span>
      <span
        onClick={handleCompare} 
        className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <LuArrowLeftRight/>
      </span>
      <span className="w-11 h-11 inline-flex text-black text-lg items-center justify-center rounded-full hover:text-white hover:bg-black duration-200">
        <FaRegEye />
      </span>
    </div>
}
export default ProductCardsSideNav