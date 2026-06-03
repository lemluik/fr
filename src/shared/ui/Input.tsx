import { cn } from "@/shared/lib/cn";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
};

export function Input({ placeholder, type = "email", className, value, onChange, name, disabled }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      disabled={disabled}
      className={cn("input-dark w-full disabled:opacity-50 disabled:cursor-not-allowed", className)}
    />
  );
}
