"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { ProductItem } from "@/types/product";
import AddEditProductModal from "./AddEditProductModal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import PriorityFilter from "./PriorityFilter";
import axios from "axios";
import { toast } from "sonner";
import MobileSidebar from "../Sidebar/MobileSidebar";

export default function MainProducts({
  products,
}: {
  products: ProductItem[];
}) {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <MobileSidebar />
          </div>
          <h3 className="text-xl font-extrabold md:text-2xl">Your WishList</h3>
        </div>
        <div className="flex items-center justify-between gap-2 md:justify-start">
          <PriorityFilter />
          <Button
            variant="default"
            className="gap-2"
            onClick={() => setOpen(true)}
          >
            <Plus />
            Add to Wishlist
          </Button>
        </div>
      </div>
      {products.length > 0 ? (
        <div className="my-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categories={categories}
              fetchCategories={fetchCategories}
            />
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
      <AddEditProductModal
        open={open}
        setOpen={setOpen}
        categories={categories}
        fetchCategories={fetchCategories}
      />
    </div>
  );
}
