import Link from "next/link";
import React from "react";

const ProductsPage = () => {
  return (
    <div>
      <h2>products page</h2>
      <div className=" flex flex-col gap-2">
        <Link href="/products/1">product1</Link>
        <Link href="/products/2">product2</Link>
        <Link href="/products/3">product3</Link>
        <Link href="/products/4">product4</Link>
      </div>
    </div>
  );
};

export default ProductsPage;
