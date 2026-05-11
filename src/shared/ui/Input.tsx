import { cn } from "@/shared/lib/cn";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
};

export function Input({ placeholder, type = "email", className }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={cn(
        "h-12 w-full rounded-full border border-zinc-200 bg-white px-5 text-sm outline-none transition-colors focus:border-[#4A6CF7] focus:ring-2 focus:ring-[#4A6CF7]/20",
        className
      )}
    />
  );
}
