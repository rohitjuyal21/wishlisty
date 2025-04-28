"use client";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { CalendarDaysIcon, InfoIcon, Loader2, Plus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { priorityOptions } from "@/lib/product";
import { WishlistItemSchema } from "@/lib/schemas";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProductItem } from "@/types/product";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip, TooltipProvider } from "../ui/tooltip";

interface AddEditProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: ProductItem;
  productId?: number;
}

export default function AddEditProductModal({
  open,
  setOpen,
  defaultValues,
  productId,
}: AddEditProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const router = useRouter();

  type WishlistItemForm = z.infer<typeof WishlistItemSchema>;

  const form = useForm<WishlistItemForm>({
    resolver: zodResolver(WishlistItemSchema),
    defaultValues: {
      productName: defaultValues?.productName || "",
      productLink: defaultValues?.productLink || "",
      note: defaultValues?.note || "",
      priority: defaultValues?.priority || undefined,
      category_id: defaultValues?.category_id?.toString() || undefined,
      purchased: defaultValues?.purchased || false,
      remindAt: defaultValues?.remindAt || undefined,
    },
  });

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

  const addProduct = async (data: WishlistItemForm) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/wishlist", {
        productName: data.productName,
        productLink: data.productLink,
        note: data.note,
        priority: data.priority,
        category_id: data.category_id,
        purchased: data.purchased,
        remindAt: data.remindAt,
      });
      if (response.data.status === "success") {
        toast.success("Product added to wishlist");
        router.refresh();
        setOpen(false);
        form.reset();
      } else {
        toast.error("Failed to add product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add product");
    } finally {
      setIsLoading(false);
    }
  };

  const editProduct = async (data: WishlistItemForm) => {
    setIsLoading(true);
    try {
      const response = await axios.put(`/api/wishlist/${productId}`, {
        productName: data.productName,
        productLink: data.productLink,
        note: data.note,
        priority: data.priority,
        category_id: data.category_id,
        purchased: data.purchased,
        remindAt: data.remindAt,
      });
      if (response.data.status === "success") {
        toast.success("Product updated successfully");
        router.refresh();
        setOpen(false);
        form.reset();
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<WishlistItemForm> = async (data) => {
    if (defaultValues) {
      await editProduct(data);
    } else {
      await addProduct(data);
    }
  };

  const handleModalChange = () => {
    setOpen(!open);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[600px]">
        <DialogHeader className="mb-4">
          <DialogTitle>
            {defaultValues ? "Update Wishlist Item" : "Add Wishlist Item"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues
              ? "Edit the details below to update your wishlist item."
              : "Fill the details below to add to your wishlist."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/item" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes or details (optional)"
                      rows={3}
                      className="h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-start gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Priority</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem
                            key={priority.value}
                            value={priority.value}
                          >
                            {priority.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <Select
                      value={field.value?.toString()}
                      onValueChange={field.onChange}
                      defaultValue={field.value?.toString()}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Choose category">
                            {categories.find(
                              (c) =>
                                c.id.toString() === field.value?.toString(),
                            )?.name || "Choose category"}
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="remindAt"
              render={({ field }) => (
                <FormItem className="mr-4 flex w-1/2 flex-col">
                  <FormLabel>
                    <span>Remind At</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <InfoIcon className="h-4 w-4" />
                        </TooltipTrigger>
                        <TooltipContent side="top" className="w-48 text-xs">
                          We&apos;ll send you an email reminder about this item.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarDaysIcon className="h-4 w-4 opacity-50" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        className={cn("pointer-events-auto p-3")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="purchased"
              render={({ field }) => (
                <FormItem className="flex flex-1 items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="purchased"
                    />
                  </FormControl>
                  <FormLabel htmlFor="purchased" className="mb-0">
                    Purchased
                  </FormLabel>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus />
                )}
                {defaultValues ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
