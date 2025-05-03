"use client";
import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { ChevronRight, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { User } from "next-auth";

export default function UserInfo({ user }: { user: User | undefined }) {
  return (
    <div className="mt-auto space-y-2 px-2">
      <Popover>
        <PopoverTrigger asChild>
          <div className="hover:bg-muted/60 flex w-full cursor-pointer items-center gap-2 rounded-md p-2">
            <Avatar className="size-10">
              <AvatarImage src={user?.image || ""} />
              <AvatarFallback className="bg-primary text-lg font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex w-full max-w-[150px] flex-1 flex-col">
              <p className="truncate text-sm font-medium">{user?.name}</p>
              <p className="text-muted-foreground truncate text-xs">
                {user?.email}
              </p>
            </div>
            <ChevronRight className="text-muted-foreground size-4" />
          </div>
        </PopoverTrigger>
        <PopoverContent side="right" className="w-40 p-2">
          <Button
            variant="ghost"
            className="text-destructive border-destructive hover:bg-destructive hover:text-destructive w-full justify-start"
            onClick={() => signOut({ redirectTo: "/signin" })}
          >
            <LogOut />
            Log Out
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
