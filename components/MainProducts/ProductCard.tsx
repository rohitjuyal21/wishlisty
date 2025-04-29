"use client";
import { getDomain, getFaviconUrl } from "@/lib/getUrl";
import { ProductItem } from "@/types/product";
import Image from "next/image";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  Edit,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { priorityDisplayMap, priorityDisplayStyle } from "@/lib/product";
import AddEditProductModal from "./AddEditProductModal";
import axios from "axios";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { AlertProductDialog } from "./AlertProductDialog";
import Link from "next/link";

interface ProductCardProps {
  product: ProductItem;
  categories: { id: number; name: string }[];
}

export default function ProductCard({ product, categories }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeletingProductLoading, setIsDeletingProductLoading] =
    useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const iconUrl = getFaviconUrl(product.productLink);
  const { domain } = getDomain(product.productLink);

  const handleCategoryClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", product.category_id.toString());
    router.push(`?${params.toString()}`);
  };

  const handleMarkAsPurchased = async () => {
    try {
      const response = await axios.post("/api/wishlist/mark-as-purchased", {
        id: product.id,
        isPurchased: !product.purchased,
      });

      if (response.data.status === "success") {
        toast.success(
          `${product.purchased ? "Unmarked" : "Marked"} as purchased`,
        );
        router.refresh();
      } else {
        toast.error("Failed to update purchased status");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update purchased status");
    }
  };

  const handleDelete = async () => {
    setIsDeletingProductLoading(true);
    try {
      const response = await axios.delete(`/api/wishlist/${product.id}`);
      if (response.data.status === "success") {
        toast.success("Product deleted successfully");
        setIsAlertOpen(false);
        router.refresh();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    } finally {
      setIsDeletingProductLoading(false);
    }
  };

  return (
    <div className="to-muted/50 relative rounded-xl border bg-gradient-to-br from-transparent transition-all duration-300 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:from-20% before:via-blue-500/70 before:via-50% before:to-transparent before:to-80% after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:from-20% after:via-blue-500/70 after:via-50% after:to-transparent after:to-80%">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex justify-between">
          <Link
            href={product.productLink}
            target="_blank"
            className="flex items-center gap-2"
          >
            <div className="bg-muted/50 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border">
              {iconUrl && !isImageError ? (
                <Image
                  src={iconUrl}
                  alt={product.productName}
                  width={48}
                  height={48}
                  className="rounded-full"
                  onError={() => {
                    setIsImageError(true);
                  }}
                />
              ) : (
                <span className="font-rowdies text-2xl font-bold uppercase">
                  {domain.slice(0, 1)}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h4 className="line-clamp-2 font-bold">
                  {product.productName}
                </h4>
                {product.purchased && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-700 text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right" className="text-xs">
                        Product purchased
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <Badge
                variant="secondary"
                className="rounded-full py-px text-[10px] font-medium underline-offset-2 hover:underline"
              >
                {domain}
              </Badge>
            </div>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setOpen(true)}
                className="cursor-pointer"
              >
                <Edit className="size-4" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsAlertOpen(true)}
                className="cursor-pointer"
              >
                <Trash2 className="size-4" /> Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleMarkAsPurchased}
                className="cursor-pointer"
              >
                {product.purchased ? (
                  <XCircle className="size-4" />
                ) : (
                  <CheckCircle2 className="size-4" />
                )}{" "}
                {product.purchased
                  ? "Unmark as purchased"
                  : "Mark as purchased"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="text-muted-foreground min-h-10 flex-1 text-sm">
          {product.note}
        </p>
        <div className="flex justify-between">
          <Badge
            onClick={handleCategoryClick}
            variant="outline"
            className="hover:bg-muted/50 cursor-pointer rounded-full"
          >
            #{product.category.name}
          </Badge>
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-xs font-medium",
              priorityDisplayStyle[product.priority],
            )}
          >
            {priorityDisplayMap[product.priority]}
          </span>
        </div>
      </div>
      <AddEditProductModal
        open={open}
        setOpen={setOpen}
        defaultValues={product}
        productId={product.id}
        categories={categories}
      />
      <AlertProductDialog
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        handleDelete={handleDelete}
        isLoading={isDeletingProductLoading}
      />
    </div>
  );
}
