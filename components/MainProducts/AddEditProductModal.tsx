"use client";
import React, { useState } from "react";

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
import { CalendarDaysIcon, Loader2, Plus } from "lucide-react";
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

interface AddEditProductModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultValues?: ProductItem;
}

export default function AddEditProductModal({
  open,
  setOpen,
  defaultValues,
}: AddEditProductModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  type WishlistItemForm = z.infer<typeof WishlistItemSchema>;

  const form = useForm<WishlistItemForm>({
    resolver: zodResolver(WishlistItemSchema),
    defaultValues: {
      productName: defaultValues?.productName || "",
      productLink: defaultValues?.productLink || "",
      note: defaultValues?.note || "",
      priority: defaultValues?.priority || undefined,
      category: defaultValues?.category || "",
      purchased: defaultValues?.purchased || false,
      remindAt: defaultValues?.remindAt || undefined,
    },
  });

  const onSubmit: SubmitHandler<WishlistItemForm> = async (data) => {
    // Have to write edit api route
    setIsLoading(true);
    try {
      const response = await axios.post("/api/wishlist", {
        productName: data.productName,
        productLink: data.productLink,
        note: data.note,
        priority: data.priority,
        category: data.category,
        purchased: data.purchased,
        remindAt: data.remindAt,
      });
      if (response.data.status === "success") {
        toast.success("Product added to wishlist");
        router.refresh();
        setOpen(false);
        form.reset();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
                name="category"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Electronics" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="purchased"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
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
            <FormField
              control={form.control}
              name="remindAt"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Remind At</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <CalendarDaysIcon className="mr-2 h-4 w-4 opacity-50" />
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
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Plus />
                )}
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
