"use client";
import { getDomain, getFaviconUrl } from "@/lib/getUrl";
import { ProductItem } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ExternalLink, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { priorityDisplayMap, priorityDisplayStyle } from "@/lib/product";

export default function ProductCard({ product }: { product: ProductItem }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategoryClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", product.category); // or `params.append` if you allow multiple
    router.push(`?${params.toString()}`);
  };

  const iconUrl = getFaviconUrl(product.productLink);
  const { fullUrl, domain } = getDomain(product.productLink);
  return (
    <div className="to-muted/50 relative rounded-xl border bg-gradient-to-br from-transparent transition-all duration-300 before:absolute before:-top-px before:left-0 before:h-px before:w-full before:bg-gradient-to-r before:from-transparent before:from-20% before:via-blue-500/70 before:via-50% before:to-transparent before:to-80% after:absolute after:-bottom-px after:left-0 after:h-px after:w-full after:bg-gradient-to-r after:from-transparent after:from-20% after:via-blue-500/70 after:via-50% after:to-transparent after:to-80%">
      <div className="relative flex h-full flex-col gap-4 p-4">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-muted/50 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border p-2">
              {iconUrl ? (
                <Image
                  src={iconUrl}
                  alt={product.productName}
                  width={36}
                  height={36}
                />
              ) : (
                <span className="font-rowdies text-2xl font-bold">W</span>
              )}
            </div>
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold">{product.productName}</h4>
              <Link href={fullUrl} target="_blank">
                <Badge variant="secondary" className="rounded-full">
                  {domain}
                </Badge>
              </Link>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreVertical />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="tex-sm text-muted-foreground flex-1">{product.note}</p>
        <div className="flex justify-between">
          <Badge
            onClick={handleCategoryClick}
            variant="outline"
            className="hover:bg-muted/50 cursor-pointer rounded-full"
          >
            #{product.category}
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
        <div>
          <Button variant="outline" className="w-full" asChild>
            <Link href={product.productLink} target="_blank">
              Product Link <ExternalLink className="size-4" />
            </Link>
          </Button>
        </div>
        {product.purchased && (
          <div className="absolute top-1 -left-5 w-fit -rotate-45">
            <span className="flex items-center gap-1 rounded-sm bg-green-600 px-2 py-0.5 text-[10px] font-medium">
              Purchased
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
