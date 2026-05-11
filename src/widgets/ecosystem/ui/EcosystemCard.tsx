import { Card } from "@/shared/ui";

type EcosystemCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  className?: string;
};

export function EcosystemCard({
  icon,
  title,
  description,
  features,
  className,
}: EcosystemCardProps) {
  return (
    <Card className={className}>
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#4A6CF7]/10 to-[#6C5CE7]/10 text-[#4A6CF7]">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[#0F172A]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{description}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-600">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#4A6CF7]" />
            {feature}
          </li>
        ))}
      </ul>
    </Card>
  );
}
