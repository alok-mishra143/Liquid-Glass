import { cn } from "@/lib/utils";

interface BackgroundProps {
  show: boolean;
  color: string;
  className?: string;
}

const Background: React.FC<BackgroundProps> = ({ show, color, className }) => {
  // Generate a subtle gradient pattern
  const backgroundStyle = {
    background: `
      radial-gradient(circle at 25% 25%, ${color}40 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, ${color}60 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, ${color}20 0%, transparent 70%),
      linear-gradient(135deg, ${color}10 0%, ${color}30 50%, ${color}10 100%)
    `,
  };

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-0 transition-opacity duration-500",
        className
      )}
      style={backgroundStyle}
    >
      {/* Add some animated elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-white/3 to-transparent rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-3/4 left-3/4 w-16 h-16 bg-gradient-to-br from-white/4 to-transparent rounded-full blur-md animate-pulse delay-500" />
    </div>
  );
};

export default Background;
