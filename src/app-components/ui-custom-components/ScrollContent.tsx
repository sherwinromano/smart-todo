import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

interface ScrollProp {
  children: ReactNode;
  className: string;
}

const ScrollContent = ({ children, className }: ScrollProp) => {
  return (
    <ScrollArea className={className} scrollHideDelay={100}>
      {children}
    </ScrollArea>
  );
};

export default ScrollContent;
