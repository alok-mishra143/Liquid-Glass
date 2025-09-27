import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/ThemeToggle";
import type { LiquidGlassControls } from "../../App";

interface ControlsProps {
  controls: LiquidGlassControls;
  onControlsChange: (controls: LiquidGlassControls) => void;
  className?: string;
}

const Controls: React.FC<ControlsProps> = ({
  controls,
  onControlsChange,
  className,
}) => {
  const updateControl = <K extends keyof LiquidGlassControls>(
    key: K,
    value: LiquidGlassControls[K]
  ) => {
    onControlsChange({ ...controls, [key]: value });
  };

  return (
    <div
      className={cn(
        "p-4 md:p-6 bg-background/90 backdrop-blur-lg border border-border rounded-lg space-y-4 md:space-y-6 w-72 md:min-w-80",
        className
      )}
    >
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <h2 className="text-lg md:text-xl font-semibold">Controls</h2>
        <ThemeToggle />
      </div>

      {/* Blur */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Backdrop Blur</label>
          <span className="text-sm text-muted-foreground">
            {controls.blur}px
          </span>
        </div>
        <Slider
          value={[controls.blur]}
          onValueChange={(value) => updateControl("blur", value[0])}
          max={20}
          min={0}
          step={0.5}
          className="w-full"
        />
      </div>

      {/* Brightness */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Brightness</label>
          <span className="text-sm text-muted-foreground">
            {controls.brightness.toFixed(1)}
          </span>
        </div>
        <Slider
          value={[controls.brightness]}
          onValueChange={(value) => updateControl("brightness", value[0])}
          max={2}
          min={0.5}
          step={0.1}
          className="w-full"
        />
      </div>

      {/* Displacement Scale */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-medium">Displacement Scale</label>
          <span className="text-sm text-muted-foreground">
            {controls.displacementScale}
          </span>
        </div>
        <Slider
          value={[controls.displacementScale]}
          onValueChange={(value) =>
            updateControl("displacementScale", value[0])
          }
          max={50}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      {/* Toggle Controls */}
      <div className="space-y-3 pt-2 border-t border-border">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">Show Lorem Text</label>
          <Button
            variant={controls.showLorem ? "default" : "outline"}
            size="sm"
            onClick={() => updateControl("showLorem", !controls.showLorem)}
          >
            {controls.showLorem ? "ON" : "OFF"}
          </Button>
        </div>
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        onClick={() =>
          onControlsChange({
            blur: 2,
            brightness: 1.1,
            displacementScale: 10,
            showLorem: true,
            showBackground: false,
          })
        }
        className="w-full"
      >
        Reset to Defaults
      </Button>
    </div>
  );
};

export default Controls;
