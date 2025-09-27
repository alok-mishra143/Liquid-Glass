import { glassRGB } from "@/lib/RGBChannel";
import { cn } from "@/lib/utils";
import React from "react";

type LiquidButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string; 
  blur?: number;
  brightness?: number;
  displacementScale?: number;
};

const LiquidButton: React.FC<LiquidButtonProps> = ({
  onClick,
  children,
  className,
  blur = 2,
  brightness = 1.1,
  displacementScale = 10,
}) => {
  const buttonStyle: React.CSSProperties = {
    filter: `drop-shadow(-8px -10px 20px #0000005f)`,
    backdropFilter: `brightness(${brightness}) blur(${blur}px) url(#displacementFilter)`,
    position: "relative",
  };

  const beforeElementStyle: React.CSSProperties = {
    content: '""',
    position: "absolute",
    inset: "0",
    zIndex: 0,
    overflow: "hidden",
    borderRadius: "0.125rem", 
    boxShadow:
      "inset 6px 6px 0px -6px rgba(255, 255, 255, 0.7), inset 0 0 8px 1px rgba(255, 255, 255, 0.7)",
    pointerEvents: "none",
  };

  return (
    <>
      <button
        onClick={onClick}
        className={cn(
          "relative flex flex-wrap items-center justify-center p-1 overflow-hidden rounded-sm transition-all duration-300 ease-in",
          className
        )}
        style={buttonStyle}
      >
        <div style={beforeElementStyle} />
        <div className="relative z-10">{children}</div>
      </button>

      <svg className="hidden">
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          />
          <feImage href={glassRGB} preserveAspectRatio="none" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale={displacementScale}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
};

export default LiquidButton;
