import { cn } from "@/shared/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-20", className)}>
      {children}
    </section>
  );
}
