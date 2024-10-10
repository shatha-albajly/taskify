"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Nav } from "./Nav";
import { ResizableHandle, ResizablePanel } from "./ui/resizable";
import { ResizablePanelGroup } from "./ui/resizable";
// import StoreProvider, { useAppSelector } from "@/app/redex";
import Navbar from "./Navbar";

interface MailProps {
  defaultLayout?: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize?: number;
  children: React.ReactNode;
}

function DashboardLayout({
  defaultLayout = [20, 80],
  navCollapsedSize = 5,
  children
}: MailProps) {

  const [isCollapsed, setIsCollapsed] = useState(false);
  // const [layoutSize, setLayoutSizeFront] = useState(defaultLayout);
  // const isDarkMode = useAppSelector(state => state.global.isDarkMode);
  // const sideBarSize = useAppSelector(state => state.global.sideBarSize);

  // useEffect(() => {
  //   if (sideBarSize) {
  //     try {
  //       setLayoutSizeFront(sideBarSize);
  //     } catch (err) {
  //       console.error("Error parsing layout size ", err);
  //     }
  //   }
  // }, [sideBarSize]);

  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [isDarkMode]);

  // Get cookie synchronously when component is created

  // Helper function to read a cookie by its name
function getCookie(name: string) {
  if (typeof document === 'undefined') return undefined;

  const value = `; ${document.cookie}`;
  if (!value) return undefined;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}
const getInitialLayoutSize = (): number[] => {
  const savedLayout = getCookie('react-resizable-panels:layout:mail');
  if (savedLayout) {
    try {
      return JSON.parse(savedLayout); // Use saved layout size from cookies
    } catch (err) {
      console.error("Error parsing layout size from cookies:", err);
    }
  }
  return [20, 80]; // Return default layout size if no cookie
};

  useEffect(() => {
    const savedLayout = getCookie('react-resizable-panels:layout:mail');
    if (savedLayout) {
      try {
        setLayoutSize(JSON.parse(savedLayout)); // Use saved layout size from cookies
      } catch (err) {
        console.error("Error parsing layout size from cookies:", err);
      }
    }
  }, []);
const [layoutSize, setLayoutSize] = useState<number[]>(getInitialLayoutSize);


  return (
    <>
      <Navbar />
      <TooltipProvider delayDuration={0}>
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={(sizes: number[]) => {
            console.log(sizes);
              document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(sizes)};path=/;`;
            }}
        
          className="h-full max-h-[800px] items-stretch"
        >
          <ResizablePanel
            defaultSize={layoutSize[0]}
            collapsedSize={navCollapsedSize}
            collapsible={true}
            minSize={15}
            maxSize={20}
            onCollapse={() => {
              setIsCollapsed(true);
              document.cookie = `react-resizable-panels:collapsed=true`;

            }}
            onResize={() => {
              setIsCollapsed(false);
              document.cookie = `react-resizable-panels:collapsed=false`;

            }}
            className={cn(
              isCollapsed &&
                "min-w-[50px] transition-all duration-300 ease-in-out"
            )}
          >
            <Nav
              isCollapsed={isCollapsed}
            />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={layoutSize[1]}>
            {children}
          </ResizablePanel>
        </ResizablePanelGroup>
      </TooltipProvider>
    </>
  );
}

export const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    // <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    // </StoreProvider>
  );
}