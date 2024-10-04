import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SearchComponent({className}:{className:string}) {
  return (
    <div className={` w-full max-w-sm relative ${className}`}>
      <Search className="w-4 h-4 absolute left-2.5 top-2.5 text-gray-500 dark:text-gray-400" />
      <Input type="search" placeholder="Search" className="pl-8" />
    </div>
  );
}
