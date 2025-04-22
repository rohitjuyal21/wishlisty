import React from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { ProductItem } from "@/types/product";
import AddProductModal from "./AddProductModal";

export default function MainProducts({
  products,
}: {
  products: ProductItem[];
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-extrabold">Your WishList</h3>
        <AddProductModal />
      </div>
      {products.length > 0 ? (
        <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <Image
            src="/assets/empty-wishlist.png"
            alt="Empty Wishlist"
            width={72}
            height={72}
          />
          <h2 className="mt-2 mb-1 text-xl font-semibold">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground text-sm">
            Add items to your wishlist to keep track of what you love!
          </p>
        </div>
      )}
    </div>
  );
}
