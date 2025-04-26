"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { priorityOptions } from "@/lib/product";
import { useRouter, useSearchParams } from "next/navigation";

export default function PriorityFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const priority = searchParams.get("priority")?.toUpperCase();

  const handlePriorityChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("priority", value.toLowerCase());
    router.push(`?${params.toString()}`);
  };

  return (
    <Select value={priority || ""} onValueChange={handlePriorityChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ALL">All</SelectItem>
        {priorityOptions.map((priority) => (
          <SelectItem key={priority.value} value={priority.value}>
            {priority.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
