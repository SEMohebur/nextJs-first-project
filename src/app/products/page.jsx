"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const ProductsPage = () => {
  const [dataLoading, setDataLoading] = useState(true);
  const [topics, setTopics] = useState([]);

  const fetchTopics = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/topics", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
      return { topics: [] };
    }
  };

  useEffect(() => {
    (async () => {
      const data = await fetchTopics();
      setTopics(data.topics || []);
      setDataLoading(false);
    })();
  }, []);

  if (dataLoading) {
    return <p className="text-center">Loading....</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-3xl font-bold text-center my-5">All Product</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-4 ">
        {topics.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-md overflow-hidden shadow hover:shadow-2xl duration-300"
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
            <div className="grid m-2 text-center">
              <Link
                href={`/products/${product._id}`}
                className="bg-indigo-500 hover:bg-indigo-600 duration-300 text-white px-2 py-1 rounded cursor-pointer"
              >
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
