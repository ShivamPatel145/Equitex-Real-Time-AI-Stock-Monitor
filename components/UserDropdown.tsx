"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

const UserDropdown = () => {
  const router = useRouter();
  const handleSignOut = async () => {
    router.push("/sign-in");
  };

  const user = { name: "John Doe", email: "contact@jondoe.com" };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 text-gray-300 hover:bg-transparent hover:text-gray-300 focus-visible:ring-0 focus-visible:border-transparent aria-expanded:bg-transparent aria-expanded:text-gray-300"
        >
          <Avatar className="h-8 w-8">
            {/* <AvatarImage src="/assets/images/avatar.jpg" alt={user.name} /> */}
            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
              {user.name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-base font-medium text-gray-400">
              {user.name}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="text-gray-300 bg-[#0a0a0a] border border-gray-700/50 shadow-2xl z-[100] w-64 rounded-xl overflow-hidden mt-2 p-1"
      >
        <DropdownMenuLabel className="pb-3 border-b border-gray-800/50 mb-1">
          <div className="flex relative items-center gap-3 px-2 py-1">
            <Avatar className="h-10 w-10 border border-gray-700/50">
              <AvatarFallback className="bg-yellow-500/10 text-yellow-500 text-sm font-bold">
                {user.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-base font-semibold text-gray-200">
                {user.name}
              </span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="text-gray-300 py-2.5 px-3 rounded-lg text-sm font-medium focus:bg-gray-800/50 focus:text-yellow-500 transition-colors cursor-pointer outline-none flex items-center mt-1"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
        <div className="sm:hidden border-t border-gray-800/50 mt-2 mx-1">
          <NavItems />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
