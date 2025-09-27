import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <Loader
      className={cn("h-11 w-11", "absolute m-auto top-0 bottom-0 right-0 left-0", "animate-spin text-[#888888] z-50")}
    />
  );
};

export default LoadingPage;
