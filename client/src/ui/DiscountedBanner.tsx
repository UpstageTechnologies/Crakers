import { discountimageone, discountimagetwo } from "../assets/footerIcons";
import Container from "./Container";
import Title from "./Title";
import { Link } from "react-router-dom";


const DiscountedBanner = () => {
  const popularSearchItems = [
    { title: "Fancy Crackers", link: "fancyCrackers" },
    { title: "Kids Collection", link: "kidsCollection" },
    { title: "Gift Boxes", link: "giftBoxes" },
    { title: "Color Smoke", link: "colorSmoke" },
    { title: "Twinkling Stars", link: "twinklingStars" },
    { title: "Wedding Specials", link: "weddingSpecials" },
  ];
  return (
    <Container>
      <div>
        <Title text="Popular Search" />
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="my-7 flex items-center flex-wrap gap-4">
        {popularSearchItems?.map(({ title, link }) => (
          <Link
            key={title}
            to={`/category/${link}`}
            className="border border-[px] border-gray-300 px-8 py-3 rounded-full capitalize font-medium hover:bg-black hover:text-white duration-200"
          >
            {title}
          </Link>
        ))}
      </div>
      <div className="w-full py-5 md:py-0 my-12 bg-[#F0F4FA] rounded-lg flex items-center justify-between overflow-hidden">
        <img
          src={discountimageone}
          alt="discountedImgOne"
          className="hidden lg:inline-flex h-36"
        />
        <div className="flex flex-col flex-1 gap-1 items-center">
          <div className="flex items-center justify-center gap-x-3 text-xl md:text-4xl font-bold">
            <h2>Crackers</h2>
            <Link
              to={"/product"}
              className="border border-red-600 px-4 py-2 text-xl md:text-3xl text-red-600 rounded-full"
            >
              Discount 20%
            </Link>
          </div>
          <p className="text-sm text-gray-600 font-medium">
            You're out to play or stepping out to make
          </p>
        </div>
        <img
          src={discountimagetwo}
          alt="discountedImgTwo"
          className="hidden lg:inline-flex h-36"
        />
        </div>
    </Container>
  );
};

export default DiscountedBanner;