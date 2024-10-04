"use client";

import { Button } from "@/components/ui/button";

import {  Moon, Settings, Sun} from "lucide-react";
import { useState } from "react";

import SearchComponent from "./Search";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { setIsDarkMode } from "@/state";
import { RootState, useAppSelector } from "@/app/redex";
// import { useDispatch } from "react-redux";

export default function Navbar() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const dispatch = useDispatch();
  // const isDarkMode = useAppSelector((state: RootState) => state.global.isDarkMode);

  return (
    <nav className="flex items-center justify-between py-4 bg-background border-b">
      <MaxWidthWrapper className="flex justify-between items-center">
        <div className="flex items-center ">
          {/* <img src="/assets/svgs/logo.svg" alt="logo" width={40} height={40} /> */}
          <h1 className="text-xl font-bold text-blue-primary">Taskify</h1>
        </div>
        <div className="flex items-center space-x-4">
          <SearchComponent className="hidden md:block" />

          <Button variant='ghost' className="rounded p-2 focus-visible:ring-0 hover:bg-transparent active:bg-none" onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
            {true ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}       
          </Button>

          <Link href="/settings">
            <Settings className="h-5 w-5" />

            <span className="sr-only">settings</span>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
