"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
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
import { CalendarDaysIcon, Plus } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { priorityOptions } from "@/lib/product";
import { WishlistItemSchema } from "@/lib/schemas";

export default function AddProductModal() {
  const [open, setOpen] = useState(false);

  type WishlistItemForm = z.infer<typeof WishlistItemSchema>;

  const form = useForm<WishlistItemForm>({
    resolver: zodResolver(WishlistItemSchema),
    defaultValues: {
      productName: "",
      productLink: "",
      note: "",
      priority: undefined,
      category: "",
      purchased: false,
      remindAt: undefined,
    },
  });

  const onSubmit: SubmitHandler<WishlistItemForm> = (data) => {
    // Here you would submit to your backend or Supabase
    alert("Submitted!\n" + JSON.stringify(data, null, 2));
    setOpen(false);
    form.reset();
  };

  const handleModalChange = () => {
    setOpen(!open);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={handleModalChange}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Plus />
          Add to Wishlist
        </Button>
      </DialogTrigger>
      <DialogContent className="h-fit overflow-auto sm:max-w-[600px]">
        <DialogHeader className="mb-4">
          <DialogTitle>Add Wishlist Item</DialogTitle>
          <DialogDescription>
            Fill the details below to add to your wishlist.
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
                    <Input
                      type="url"
                      placeholder="https://example.com/item"
                      {...field}
                    />
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
            <div className="flex gap-4">
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
              <Button type="submit" className="w-full">
                <Plus />
                Add Item
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
