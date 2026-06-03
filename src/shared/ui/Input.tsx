import { cn } from "@/shared/lib/cn";

type InputProps = {
  placeholder?: string;
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

export function Input({ placeholder, type = "email", className, value, onChange, name }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      className={cn("input-dark w-full", className)}
    />
  );
}
