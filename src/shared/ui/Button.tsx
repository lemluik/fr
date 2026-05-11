import { cn } from "@/shared/lib/cn";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  children,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all active:scale-[0.98]";

  const variants = {
    primary:
      "h-12 rounded-full bg-gradient-to-r from-[#4A6CF7] to-[#6C5CE7] px-8 text-sm text-white hover:shadow-lg hover:shadow-indigo-200",
    secondary:
      "h-12 rounded-full border border-zinc-200 bg-white px-8 text-sm text-[#0F172A] hover:border-zinc-300 hover:bg-zinc-50",
    ghost:
      "h-10 rounded-lg px-4 text-sm text-zinc-600 hover:bg-zinc-100 hover:text-[#0F172A]",
  };

  return (
    <button type={type} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
