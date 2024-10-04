"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Home, Settings, User, Users, Calendar, FolderOpen, ChevronDown, ChevronRight, AlertCircle } from "lucide-react"
import { usePathname } from 'next/navigation';
import { hrtime } from "process";

const menuItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/timelines", icon: Calendar, label: "Timelines" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/users", icon: User, label: "Users" },
  { href: "/teams", icon: Users, label: "Teams" },
  {
    href: "/projects",
    icon: FolderOpen,
    label: "Projects",
    subMenu: [
      { href: "/projects/active", label: "Active Projects" },
      { href: "/projects/archived", label: "Archived Projects" },
      { href: "/projects/new", label: "New Project" },
    ],
  },
  {
    href:"/priority",

  icon:AlertCircle,
  label:"priority",
  subMenu: [
    {href: "/priority/urgent", label: "Urgent Priority"},
    { href: "/priority/high", label: "High Priority" },
    { href: "/priority/medium", label: "Medium Priority" },
    { href: "/priority/low", label: "Low Priority" },
    {href:"/priority/backlog",label:"backlog"}
  ]
}
]

export function Nav({ isCollapsed }: { isCollapsed: boolean }) {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)
  const pathname = usePathname();

  const toggleSubMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <ScrollArea>
        <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {menuItems.map((item, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "h-9 w-9 flex items-center justify-center",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      
                    )}
                    aria-label={item.label}
                  >
                    <item.icon className="h-4 w-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="flex items-center gap-4">
                  {!item.subMenu && item.label && (
                    <span className="ml-auto text-muted-foreground">
                      {item.label}
                    </span>
                  )}
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="space-y-2" key={item.href}>
                <Button
                  asChild={!item.subMenu}
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className="w-full justify-start" 
                  onClick={() => item.subMenu && toggleSubMenu(item.label)}
                >
                  {item.subMenu ? (
                    <div className="flex items-center w-full">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                      {expandedMenu === item.label ? (
                        <ChevronDown className="ml-auto h-4 w-4" />
                      ) : (
                        <ChevronRight className="ml-auto h-4 w-4" />
                      )}
                    </div>
                  ) : (
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </Link>
                  )}
                </Button>
                {item.subMenu && expandedMenu === item.label && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subMenu.map((subItem) => (
                      <Button 
                        key={subItem.href} 
                        asChild 
                        variant={isActive(subItem.href) ? "secondary" : "ghost"} 
                        className="w-full justify-start"
                      >
                        <Link href={subItem.href}>
                          {subItem.label}
                        </Link>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            )
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}
