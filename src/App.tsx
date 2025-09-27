import MaxWidthWrapper from "./components/theme/MaxWidthWrapper";
import LoremContent from "./components/TextContent/LoremContent";
import LiquidButton from "./components/liquidGlass/LiquidButton";
import Controls from "./components/Controls/Controls";
import Background from "./components/Background/Background";
import { useState, useEffect, useRef } from "react";

export interface LiquidGlassControls {
  blur: number;
  brightness: number;
  displacementScale: number;
  showLorem: boolean;
  showBackground: boolean;
}

const App = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showControls, setShowControls] = useState(false);
  const [controls, setControls] = useState<LiquidGlassControls>({
    blur: 2,
    brightness: 1.1,
    displacementScale: 10,
    showLorem: true,
    showBackground: false,
  });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);

    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate offset from touch/mouse to element center
      setDragOffset({
        x: clientX - centerX,
        y: clientY - centerY,
      });

      // If this is the first time dragging from initial position,
      // set position to current center coordinates
      if (position.x === 0 && position.y === 0) {
        setPosition({ x: centerX, y: centerY });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleMove = (clientX: number, clientY: number) => {
      if (isDragging) {
        setPosition({
          x: clientX - dragOffset.x,
          y: clientY - dragOffset.y,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleEnd);
      document.addEventListener("touchmove", handleTouchMove, {
        passive: false,
      });
      document.addEventListener("touchend", handleEnd);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleEnd);
      };
    }
  }, [isDragging, dragOffset]);

  // Calculate style based on whether it's been dragged or not
  const getElementStyle = () => {
    if (position.x === 0 && position.y === 0) {
      // Initial centered position - adjust for mobile
      return {
        left: "50%",
        top: "40%", // Moved down a bit for mobile visibility
        transform: "translate(-50%, -50%)",
      };
    } else {
      // Dragged position - use absolute coordinates
      return {
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      };
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen">
        {/* Background */}
        {/* Background */}
        <Background show={controls.showBackground} color="#1a1a1a" />{" "}
        {/* Mobile Controls Toggle Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          className="fixed top-4 left-4 z-50 md:hidden p-3 bg-background/90 backdrop-blur-lg border border-border rounded-lg hover:bg-background/95 transition-colors"
          aria-label="Toggle controls"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </button>
        {/* Mobile Controls Backdrop */}
        {showControls && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setShowControls(false)}
          />
        )}
        {/* Controls Panel */}
        <div
          className={`
          fixed z-40 max-h-[calc(100vh-2rem)] overflow-y-auto transition-all duration-300
          md:left-4 md:top-4 md:translate-x-0
          ${
            showControls
              ? "left-4 top-20 translate-x-0"
              : "left-4 top-20 -translate-x-[120%] md:translate-x-0"
          }
        `}
        >
          <Controls controls={controls} onControlsChange={setControls} />
        </div>
        {/* Main Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {/* Lorem Text Background */}
          {controls.showLorem && (
            <div className="absolute inset-0 z-10 p-4 md:p-8 overflow-auto">
              <LoremContent
                className="text-lg md:text-3xl font-bold"
                words={500}
              />
            </div>
          )}

          {/* Draggable Liquid Glass Button */}
          <div
            ref={elementRef}
            className={`fixed z-50 select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={getElementStyle()}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <LiquidButton
              className="p-6 md:p-10"
              blur={controls.blur}
              brightness={controls.brightness}
              displacementScale={controls.displacementScale}
            >
              <h1 className="font-bold text-sm md:text-base">Zerion</h1>
            </LiquidButton>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default App;
