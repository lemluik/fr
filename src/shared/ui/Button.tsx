import { cn } from "@/shared/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all active:scale-[0.97] cursor-pointer select-none";

  const variants = {
    primary:   "btn-primary h-12 px-8 text-sm",
    secondary: "btn-secondary h-12 px-8 text-sm",
    ghost:     "h-10 rounded-lg px-4 text-sm text-[var(--text-3)] hover:text-[var(--text-2)] hover:bg-white/5",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(base, variants[variant], disabled && "opacity-50 cursor-not-allowed", className)}
    >
      {children}
    </button>
  );
}
