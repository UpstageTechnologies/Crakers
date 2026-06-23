import { useEffect, useState } from "react";
import { config } from "../../config";
import { getData } from "../lib";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import type { CategoryProps } from "../../type";
const BannerCategories = () => {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const endpoint = `${config?.baseUrl}/categories`;

      try {
        const data = await getData(endpoint);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          464: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {categories.map((item: CategoryProps) => (
          <SwiperSlide key={item._id}>
            <Link
              to={`category/${item?._base}`}
              className="flex items-center gap-x-2 p-2 border border-gray-100 rounded-md hover:border-sky-500 hover:shadow-lg"
            >
              <img
                src={item?.image || "https://via.placeholder.com/40"}
                alt="categoryImage"
                className="w-10 h-10 rounded-full object-cover"
              />

              <p className="text-sm font-semibold">
                {item?.name}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerCategories;