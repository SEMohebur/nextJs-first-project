"use client";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

const getAllData = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/topics", {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Faild to fetch topics");
    }
    return res.json();
  } catch (err) {
    console.log("Error loading topics: ", err);
  }
};

const ManageProductPage = () => {
  const [user, loading] = useAuthState(auth);
  const [dataLoading, setDataLoading] = useState(true);
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/register");
    }
  }, [user, router, loading]);
  //

  // const { topics } = getAllData();
  // console.log(topics);

  useEffect(() => {
    const fetchTopics = async () => {
      const data = await getAllData();
      setTopics(data.topics || []);
      setDataLoading(false);
    };
    fetchTopics();
  }, []);

  console.log(topics);

  //
  if (loading || !user || dataLoading) {
    return <p className="text-center mt-10 text-xl">Loading...</p>; // loading state
  }
  return (
    <div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full border border-gray-200  ">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Category
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Price
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Image
              </th>

              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="">
            {topics.map((product, id) => (
              <tr
                key={id}
                className="hover:bg-gray-50 border-b border-gray-300"
              >
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.title}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.description}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  {product.category}
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  ${product.price}
                </td>
                <td className="px-4 py-2">
                  <Image
                    src={product.image} // product.image URL
                    alt={product.title} // alt text
                    width={64} // 16 * 4px
                    height={64} // 16 * 4px
                    className="object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-800">
                  <button className=" bg-red-400 p-1 rounded text-white cursor-pointer">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductPage;
