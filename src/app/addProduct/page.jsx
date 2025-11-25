"use client";

import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { apiUrl } from "@/lib/apiUrl";

const AddProductPage = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Redirect if user not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/register");
    }
  }, [user, loading, router]);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${apiUrl}/api/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, category, price, image }),
      });

      if (res.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product has been added!",
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/manageProducts");
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Could not create product.",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong.",
      });
    }
  };

  if (loading || !user) {
    return <p className="text-center mt-10 text-xl">Loading...</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      <form onSubmit={handleSubmit} className="p-5 bg-gray-100 rounded-2xl m-5">
        <h3 className="text-3xl font-bold text-center text-gray-700">
          Add Product
        </h3>

        <div className="mb-4 grid grid-cols space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Title
            </label>
            <input
              type="text"
              required
              placeholder="Enter title..."
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              required
              placeholder="Enter description..."
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              required
              placeholder="Enter category..."
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Price
            </label>
            <input
              type="number"
              required
              placeholder="Enter price..."
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Image URL
            </label>
            <input
              type="text"
              required
              placeholder="Enter image URL..."
              onChange={(e) => setImage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-indigo-500 py-2 px-5 md:px-20 rounded text-white cursor-pointer">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
