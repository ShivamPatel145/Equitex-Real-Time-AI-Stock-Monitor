"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { Button } from "./ui/button";

const UserDropdown = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    router.push("/sign-in");
  };

  const user = { name: "John Doe", email: "contact@jondoe.com" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex item-center gap-3 text-gray-4 hover:text-yellow-500">
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="/assets/images/avatar.jpg" alt={user.name} /> */}
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">{user.name[0]}</AvatarFallback>
          </Avatar>
          <span className="hidden sm:block">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
