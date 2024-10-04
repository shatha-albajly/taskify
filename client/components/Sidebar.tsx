import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Settings, User, Users, Calendar, FolderOpen, ChevronDown, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

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
]

export default function Sidebar() {
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const toggleSubMenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label)
  }

  return (
    <ScrollArea className="h-full py-6 pl-6 pr-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className=" text-lg font-semibold">Menu</h2>
      </div>
      <div className="space-y-2">
        {menuItems.map((item) => (
          <div key={item.href}>
            <Button
              asChild={!item.subMenu}
              variant="ghost"
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
                  <Button key={subItem.href} asChild variant="ghost" className="w-full justify-start">
                    <Link href={subItem.href}>
                      {subItem.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}