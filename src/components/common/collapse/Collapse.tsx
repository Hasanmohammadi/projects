import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "react-feather";

export default function Collapse({
  children,
  title,
  className,
  additionalHeight = 0,
  loading,
}: {
  children: React.ReactElement;
  title?: string;
  className?: string;
  additionalHeight?: number;
  loading?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isCollapsed]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <div className={className}>
      <div
        className="flex justify-between cursor-pointer"
        onClick={toggleCollapse}
      >
        <p>{title}</p>
        <div className="h-full flex items-center">
          {isCollapsed && <ChevronDown className="cursor-pointer" />}
          {!isCollapsed && <ChevronUp className="cursor-pointer" />}
        </div>
      </div>
      <Box
        sx={{
          height: loading
            ? "5px"
            : isCollapsed
            ? "0px"
            : `${contentHeight + additionalHeight}px`,
          overflow: "hidden",
          transition: "height 0.4s",
        }}
      >
        <div ref={contentRef}>{children}</div>
      </Box>
    </div>
  );
}
