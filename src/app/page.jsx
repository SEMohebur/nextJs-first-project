export const dynamic = "force-dynamic";

import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdOutlineWatchLater } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import BannerSlider from "@/Component/Banner";

const getAllData = async () => {
  try {
    const res = await fetch("/api/topics", { cache: "no-store" });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.log("Error loading topics:", err);
    return { topics: [] };
  }
};

const Homepage = async () => {
  const data = await getAllData();
  const topics = data.topics || [];

  const items = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Products Sold" },
    { number: "120+", label: "Cities Covered" },
    { number: "5", label: "Customer Rating" },
  ];

  return (
    <div className=" w-11/12 mx-auto">
      <BannerSlider />

      <section>
        <h2 className=" font-bold text-3xl text-gray-700 text-center my-4">
          Recent Product
        </h2>

        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4">
          {topics.slice(0, 6).map((product, id) => {
            return (
              <div
                key={id}
                className=" bg-white rounded-md overflow-hidden shadow hover:shadow-2xl duration-300"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    {product.description.slice(0, 40)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-sm">
                      {product.category}
                    </span>
                    <span className="font-semibold text-gray-700">
                      ${product.price}
                    </span>
                  </div>
                </div>
                <div className=" grid m-2 text-center">
                  <Link
                    href={`/products/${product._id}`}
                    className=" bg-indigo-500 hover:bg-indigo-600 duration-300 text-white px-2 py-1 rounded cursor-pointer"
                  >
                    Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* তোমার বাকি সেকশনগুলো fully ঠিক আছে */}
    </div>
  );
};

export default Homepage;
