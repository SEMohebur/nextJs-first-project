import React from "react";

const ProductsDetailpage = async ({ params }) => {
  const { id } = await params;
  return <div>products dettaile page {id}</div>;
};

export default ProductsDetailpage;
